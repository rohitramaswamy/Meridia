const express = require('express');
const { query } = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await query(
      `SELECT id, username, full_name, bio, avatar_url, 
              followers_count, following_count, trips_count, created_at
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { fullName, bio, username } = req.body;
    const userId = req.user.userId;

    const result = await query(
      `UPDATE users 
       SET full_name = $1, bio = $2, username = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING id, username, full_name, bio, avatar_url`,
      [fullName, bio, username, userId]
    );

    res.json({
      message: 'Profile updated successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Follow/Unfollow user
router.post('/follow/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.userId;

    if (userId === followerId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    // Check if already following
    const existingFollow = await query(
      'SELECT id FROM follows WHERE follower_id = $1 AND following_id = $2',
      [followerId, userId]
    );

    if (existingFollow.rows.length > 0) {
      // Unfollow
      await query(
        'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
        [followerId, userId]
      );
      
      // Update counts
      await query('UPDATE users SET followers_count = followers_count - 1 WHERE id = $1', [userId]);
      await query('UPDATE users SET following_count = following_count - 1 WHERE id = $1', [followerId]);
      
      res.json({ message: 'Unfollowed successfully', following: false });
    } else {
      // Follow
      await query(
        'INSERT INTO follows (follower_id, following_id, created_at) VALUES ($1, $2, NOW())',
        [followerId, userId]
      );
      
      // Update counts
      await query('UPDATE users SET followers_count = followers_count + 1 WHERE id = $1', [userId]);
      await query('UPDATE users SET following_count = following_count + 1 WHERE id = $1', [followerId]);
      
      res.json({ message: 'Followed successfully', following: true });
    }
  } catch (error) {
    console.error('Follow/Unfollow error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's followers
router.get('/:userId/followers', async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT u.id, u.username, u.full_name, u.avatar_url
       FROM users u
       JOIN follows f ON u.id = f.follower_id
       WHERE f.following_id = $1
       ORDER BY f.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's following
router.get('/:userId/following', async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT u.id, u.username, u.full_name, u.avatar_url
       FROM users u
       JOIN follows f ON u.id = f.following_id
       WHERE f.follower_id = $1
       ORDER BY f.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
