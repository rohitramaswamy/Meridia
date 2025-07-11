const express = require('express');
const { query } = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get feed posts (For You page)
router.get('/feed', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT p.*, u.username, u.full_name, u.avatar_url,
              COUNT(pl.id) as likes_count,
              COUNT(pc.id) as comments_count
       FROM posts p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN post_likes pl ON p.id = pl.post_id
       LEFT JOIN post_comments pc ON p.id = pc.post_id
       WHERE p.is_active = true
       GROUP BY p.id, u.id
       ORDER BY p.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get following feed
router.get('/following', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT p.*, u.username, u.full_name, u.avatar_url,
              COUNT(pl.id) as likes_count,
              COUNT(pc.id) as comments_count
       FROM posts p
       JOIN users u ON p.user_id = u.id
       JOIN follows f ON u.id = f.following_id
       LEFT JOIN post_likes pl ON p.id = pl.post_id
       LEFT JOIN post_comments pc ON p.id = pc.post_id
       WHERE f.follower_id = $1 AND p.is_active = true
       GROUP BY p.id, u.id
       ORDER BY p.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get following feed error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get curated posts (personalized)
router.get('/curated', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { budget, distance, category } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let whereConditions = ['p.is_active = true'];
    let params = [];
    let paramCount = 0;

    if (budget) {
      paramCount++;
      whereConditions.push(`p.estimated_budget <= $${paramCount}`);
      params.push(budget);
    }

    if (category) {
      paramCount++;
      whereConditions.push(`p.category = $${paramCount}`);
      params.push(category);
    }

    // Add pagination params
    params.push(limit, offset);
    const limitParam = paramCount + 1;
    const offsetParam = paramCount + 2;

    const result = await query(
      `SELECT p.*, u.username, u.full_name, u.avatar_url,
              COUNT(pl.id) as likes_count,
              COUNT(pc.id) as comments_count
       FROM posts p
       JOIN users u ON p.user_id = u.id
       LEFT JOIN post_likes pl ON p.id = pl.post_id
       LEFT JOIN post_comments pc ON p.id = pc.post_id
       WHERE ${whereConditions.join(' AND ')}
       GROUP BY p.id, u.id
       ORDER BY p.created_at DESC
       LIMIT $${limitParam} OFFSET $${offsetParam}`,
      params
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get curated posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new post
router.post('/', auth, async (req, res) => {
  try {
    const { content, location, category, estimatedBudget, mediaUrls, tripId } = req.body;
    const userId = req.user.userId;

    const result = await query(
      `INSERT INTO posts (user_id, content, location, category, estimated_budget, media_urls, trip_id, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING *`,
      [userId, content, location, category, estimatedBudget, JSON.stringify(mediaUrls), tripId]
    );

    res.status(201).json({
      message: 'Post created successfully',
      post: result.rows[0],
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/Unlike post
router.post('/:postId/like', auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    // Check if already liked
    const existingLike = await query(
      'SELECT id FROM post_likes WHERE post_id = $1 AND user_id = $2',
      [postId, userId]
    );

    if (existingLike.rows.length > 0) {
      // Unlike
      await query(
        'DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2',
        [postId, userId]
      );
      res.json({ message: 'Post unliked', liked: false });
    } else {
      // Like
      await query(
        'INSERT INTO post_likes (post_id, user_id, created_at) VALUES ($1, $2, NOW())',
        [postId, userId]
      );
      res.json({ message: 'Post liked', liked: true });
    }
  } catch (error) {
    console.error('Like/Unlike error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get post comments
router.get('/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT pc.*, u.username, u.full_name, u.avatar_url
       FROM post_comments pc
       JOIN users u ON pc.user_id = u.id
       WHERE pc.post_id = $1
       ORDER BY pc.created_at DESC
       LIMIT $2 OFFSET $3`,
      [postId, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment to post
router.post('/:postId/comments', auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    const result = await query(
      `INSERT INTO post_comments (post_id, user_id, content, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [postId, userId, content]
    );

    // Get user info for response
    const userResult = await query(
      'SELECT username, full_name, avatar_url FROM users WHERE id = $1',
      [userId]
    );

    res.status(201).json({
      message: 'Comment added successfully',
      comment: {
        ...result.rows[0],
        ...userResult.rows[0],
      },
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
