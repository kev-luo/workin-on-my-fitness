const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout')

router.get('/workouts', async (req, res) => {
  let workouts = await Workout.find({});
  workouts.forEach(workout => {
    workout.totalDuration = workout.exercises.reduce(function(accum,val) {
      return accum + val.duration;
    }, 0);
  })
  console.log(workouts);
  res.json(workouts);
})

router.put('/workouts', (req, res) => {
  
})

router.post('/workouts', (req, res) => {
  
})

router.get('/workouts/range', (req, res) => {
  
})

module.exports = router;