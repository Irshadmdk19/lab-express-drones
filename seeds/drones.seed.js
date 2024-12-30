// Iteration #1
const mongoose = require('mongoose');
const Drone = require('../models/Drone.model');

const drones = [
  { name: 'Creeper XL 500', propellers: 3, maxSpeed: 12 },
  { name: 'Racer 57', propellers: 4, maxSpeed: 20 },
  { name: 'Courier 3000i', propellers: 6, maxSpeed: 18 }
];

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/drone-management';

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    await Drone.deleteMany(); // Clear existing data
    const createdDrones = await Drone.create(drones);
    console.log(`Seeded ${createdDrones.length} drones.`);
    mongoose.disconnect();
  })
  .catch(err => console.error('Error seeding drones:', err));
