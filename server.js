require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
// const workoutSeed = require('./seeders/seed');
// const Workout = require("./models/Workout");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

// Workout.deleteMany({})
// .then(() => Workout.collection.insertMany(workoutSeed))
// .then(data => {
//   console.log(data.result.n + " records inserted!");
//   process.exit(0);
// })
// .catch(err => {
//   console.error(err);
//   process.exit(1);
// });

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/html'))
app.use('/api', require('./routes/api'))

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`connected to port ${port}`))