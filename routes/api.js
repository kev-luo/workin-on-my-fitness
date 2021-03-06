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
  res.json(workouts);
})

router.post('/workouts', async (req, res) => {
  let workout = await Workout.create({});
  res.json(workout);
})

router.put('/workouts/:id', async (req, res) => {
  let id = req.params.id;
  let workout = await Workout.findById(id);
  workout.exercises = [...workout.exercises, req.body];
  let updatedWorkout = await workout.save();
  res.json(updatedWorkout);
})

router.get('/workouts/range', async (req, res) => {
  let oldestDate = new Date().setDate(new Date().getDate()-7);
  let workouts = await Workout.find({day: { $gt: oldestDate }}).sort([['date', -1]]);
  res.json(workouts);
})


module.exports = router;