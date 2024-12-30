const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');

// List all drones
router.get('/', async (req, res, next) => {
  try {
    const drones = await Drone.find();
    res.render('drones/list', { drones });
  } catch (error) {
    console.error('Error retrieving drones:', error);
    next(error);
  }
});

// Create a new drone
router.get('/create', (req, res) => res.render('drones/create-form'));
router.post('/create', async (req, res, next) => {
  try {
    await Drone.create(req.body);
    res.redirect('/drones');
  } catch (error) {
    console.error('Error creating drone:', error);
    res.render('drones/create-form');
  }
});

// Update a drone
router.get('/:id/edit', async (req, res, next) => {
  try {
    const drone = await Drone.findById(req.params.id);
    res.render('drones/update-form', { drone });
  } catch (error) {
    console.error('Error fetching drone:', error);
    next(error);
  }
});
router.post('/:id/edit', async (req, res, next) => {
  try {
    await Drone.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/drones');
  } catch (error) {
    console.error('Error updating drone:', error);
    res.render('drones/update-form', { drone: req.body });
  }
});

// Delete a drone
router.post('/:id/delete', async (req, res, next) => {
  try {
    await Drone.findByIdAndDelete(req.params.id);
    res.redirect('/drones');
  } catch (error) {
    console.error('Error deleting drone:', error);
    next(error);
  }
});

module.exports = router;
