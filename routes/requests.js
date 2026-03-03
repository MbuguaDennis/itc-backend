const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const authMiddleware = require('../middleware/authMiddleware');

// Create accommodation request
router.post('/', authMiddleware, async (req,res) => {
  try {
    const request = await Request.create({ user: req.user.id });
    res.status(201).json({ message: 'Request submitted successfully.', request });
  } catch(err){
    res.status(500).json({ message: err.message });
  }
});

// Get user requests
router.get('/', authMiddleware, async (req,res) => {
  try {
    const requests = await Request.find({ user: req.user.id });
    res.json(requests);
  } catch(err){
    res.status(500).json({ message: err.message });
  }
});

// Admin update request status
router.patch('/:id', authMiddleware, async (req,res) => {
  try {
    const request = await Request.findById(req.params.id);
    if(!request) return res.status(404).json({ message: 'Request not found.' });
    request.accommodationStatus = req.body.accommodationStatus || request.accommodationStatus;
    await request.save();
    res.json({ message: 'Status updated successfully.', request });
  } catch(err){
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;