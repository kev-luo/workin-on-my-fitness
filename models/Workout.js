const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
  },
  totalDuration: {
    type: Number
  },
  exercises: [
    {
      type: {
        type: String,
        required: "Choose an exercise type."
      },
      name: {
        type: String,
        required: "Choose an exercise."
      },
      duration: {
        type: Number,
        required: "Choose an exercise duration."
      },
      distance: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
    }
  ]
})

workoutSchema.methods.getTotalDuration = function() {
  this.totalDuration = this.exercises.reduce(function(accum, val) {
    return accum + val.duration
  }, 0)
}

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;