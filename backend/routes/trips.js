const express = require('express');
const { query } = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's trips
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.query; // 'planned', 'completed', 'all'
    
    let whereClause = 'WHERE user_id = $1';
    let params = [userId];
    
    if (status && status !== 'all') {
      whereClause += ' AND status = $2';
      params.push(status);
    }

    const result = await query(
      `SELECT id, title, description, destination, start_date, end_date, 
              budget, status, created_at, updated_at
       FROM trips ${whereClause}
       ORDER BY created_at DESC`,
      params
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new trip
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, destination, startDate, endDate, budget } = req.body;
    const userId = req.user.userId;

    const result = await query(
      `INSERT INTO trips (user_id, title, description, destination, start_date, end_date, budget, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'planned', NOW())
       RETURNING *`,
      [userId, title, description, destination, startDate, endDate, budget]
    );

    // Update user's trip count
    await query('UPDATE users SET trips_count = trips_count + 1 WHERE id = $1', [userId]);

    res.status(201).json({
      message: 'Trip created successfully',
      trip: result.rows[0],
    });
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get trip details
router.get('/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;

    const result = await query(
      `SELECT t.*, u.username, u.full_name, u.avatar_url
       FROM trips t
       JOIN users u ON t.user_id = u.id
       WHERE t.id = $1`,
      [tripId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update trip
router.put('/:tripId', auth, async (req, res) => {
  try {
    const { tripId } = req.params;
    const { title, description, destination, startDate, endDate, budget, status } = req.body;
    const userId = req.user.userId;

    // Check if user owns the trip
    const tripCheck = await query('SELECT user_id FROM trips WHERE id = $1', [tripId]);
    if (tripCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (tripCheck.rows[0].user_id !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this trip' });
    }

    const result = await query(
      `UPDATE trips 
       SET title = $1, description = $2, destination = $3, start_date = $4, 
           end_date = $5, budget = $6, status = $7, updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [title, description, destination, startDate, endDate, budget, status, tripId]
    );

    res.json({
      message: 'Trip updated successfully',
      trip: result.rows[0],
    });
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete trip
router.delete('/:tripId', auth, async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.userId;

    // Check if user owns the trip
    const tripCheck = await query('SELECT user_id FROM trips WHERE id = $1', [tripId]);
    if (tripCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (tripCheck.rows[0].user_id !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this trip' });
    }

    await query('DELETE FROM trips WHERE id = $1', [tripId]);
    
    // Update user's trip count
    await query('UPDATE users SET trips_count = trips_count - 1 WHERE id = $1', [userId]);

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get trip activities
router.get('/:tripId/activities', async (req, res) => {
  try {
    const { tripId } = req.params;

    const result = await query(
      `SELECT * FROM trip_activities 
       WHERE trip_id = $1 
       ORDER BY planned_date ASC, created_at ASC`,
      [tripId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get trip activities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add activity to trip
router.post('/:tripId/activities', auth, async (req, res) => {
  try {
    const { tripId } = req.params;
    const { title, description, location, plannedDate, estimatedCost } = req.body;
    const userId = req.user.userId;

    // Check if user owns the trip
    const tripCheck = await query('SELECT user_id FROM trips WHERE id = $1', [tripId]);
    if (tripCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (tripCheck.rows[0].user_id !== userId) {
      return res.status(403).json({ message: 'Not authorized to add activities to this trip' });
    }

    const result = await query(
      `INSERT INTO trip_activities (trip_id, title, description, location, planned_date, estimated_cost, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [tripId, title, description, location, plannedDate, estimatedCost]
    );

    res.status(201).json({
      message: 'Activity added successfully',
      activity: result.rows[0],
    });
  } catch (error) {
    console.error('Add activity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
