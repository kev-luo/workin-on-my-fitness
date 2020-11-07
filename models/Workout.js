const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
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

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;