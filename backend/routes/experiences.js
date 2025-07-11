const express = require('express');
const { query } = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get local experiences (for Map page)
router.get('/local', async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    // Using Haversine formula to find nearby experiences
    const result = await query(
      `SELECT id, title, description, category, latitude, longitude, 
              address, rating, price_range, created_at,
              (6371 * acos(cos(radians($1)) * cos(radians(latitude)) * 
               cos(radians(longitude) - radians($2)) + 
               sin(radians($1)) * sin(radians(latitude)))) AS distance
       FROM local_experiences
       WHERE is_active = true
       HAVING distance <= $3
       ORDER BY distance ASC
       LIMIT 50`,
      [latitude, longitude, radius]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get local experiences error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get experience details
router.get('/:experienceId', async (req, res) => {
  try {
    const { experienceId } = req.params;

    const result = await query(
      `SELECT le.*, u.username, u.full_name, u.avatar_url,
              COUNT(er.id) as reviews_count,
              AVG(er.rating) as average_rating
       FROM local_experiences le
       LEFT JOIN users u ON le.created_by = u.id
       LEFT JOIN experience_reviews er ON le.id = er.experience_id
       WHERE le.id = $1 AND le.is_active = true
       GROUP BY le.id, u.id`,
      [experienceId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get experience error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new local experience
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      latitude,
      longitude,
      address,
      priceRange,
      contactInfo,
      openingHours,
      website
    } = req.body;
    const userId = req.user.userId;

    const result = await query(
      `INSERT INTO local_experiences 
       (title, description, category, latitude, longitude, address, 
        price_range, contact_info, opening_hours, website, created_by, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
       RETURNING *`,
      [title, description, category, latitude, longitude, address, 
       priceRange, JSON.stringify(contactInfo), JSON.stringify(openingHours), website, userId]
    );

    res.status(201).json({
      message: 'Experience created successfully',
      experience: result.rows[0],
    });
  } catch (error) {
    console.error('Create experience error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get experience reviews
router.get('/:experienceId/reviews', async (req, res) => {
  try {
    const { experienceId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT er.*, u.username, u.full_name, u.avatar_url
       FROM experience_reviews er
       JOIN users u ON er.user_id = u.id
       WHERE er.experience_id = $1
       ORDER BY er.created_at DESC
       LIMIT $2 OFFSET $3`,
      [experienceId, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review for experience
router.post('/:experienceId/reviews', auth, async (req, res) => {
  try {
    const { experienceId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if user already reviewed this experience
    const existingReview = await query(
      'SELECT id FROM experience_reviews WHERE experience_id = $1 AND user_id = $2',
      [experienceId, userId]
    );

    if (existingReview.rows.length > 0) {
      return res.status(400).json({ message: 'You have already reviewed this experience' });
    }

    const result = await query(
      `INSERT INTO experience_reviews (experience_id, user_id, rating, comment, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [experienceId, userId, rating, comment]
    );

    // Update experience rating
    await query(
      `UPDATE local_experiences 
       SET rating = (
         SELECT AVG(rating) FROM experience_reviews WHERE experience_id = $1
       )
       WHERE id = $1`,
      [experienceId]
    );

    res.status(201).json({
      message: 'Review added successfully',
      review: result.rows[0],
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search experiences
router.get('/search', async (req, res) => {
  try {
    const { query: searchQuery, category, latitude, longitude, radius = 25 } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    let whereConditions = ['is_active = true'];
    let params = [];
    let paramCount = 0;

    if (searchQuery) {
      paramCount++;
      whereConditions.push(`(title ILIKE $${paramCount} OR description ILIKE $${paramCount})`);
      params.push(`%${searchQuery}%`);
    }

    if (category) {
      paramCount++;
      whereConditions.push(`category = $${paramCount}`);
      params.push(category);
    }

    let distanceClause = '';
    if (latitude && longitude) {
      paramCount += 2;
      distanceClause = `, (6371 * acos(cos(radians($${paramCount - 1})) * cos(radians(latitude)) * 
                         cos(radians(longitude) - radians($${paramCount})) + 
                         sin(radians($${paramCount - 1})) * sin(radians(latitude)))) AS distance`;
      params.push(latitude, longitude);
      
      paramCount++;
      whereConditions.push(`(6371 * acos(cos(radians($${paramCount - 2})) * cos(radians(latitude)) * 
                           cos(radians(longitude) - radians($${paramCount - 1})) + 
                           sin(radians($${paramCount - 2})) * sin(radians(latitude)))) <= $${paramCount}`);
      params.push(radius);
    }

    // Add pagination params
    params.push(limit, offset);
    const limitParam = paramCount + 1;
    const offsetParam = paramCount + 2;

    const result = await query(
      `SELECT id, title, description, category, latitude, longitude, 
              address, rating, price_range, created_at${distanceClause}
       FROM local_experiences
       WHERE ${whereConditions.join(' AND ')}
       ORDER BY ${latitude && longitude ? 'distance ASC' : 'created_at DESC'}
       LIMIT $${limitParam} OFFSET $${offsetParam}`,
      params
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Search experiences error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
