// gets last workout from db, displays it to page. if none exist display no workout text
async function initWorkout() {
  // returns last workout in our db
  const lastWorkout = await API.getLastWorkout();
  // console.log("Last workout:", lastWorkout);
  if (lastWorkout) {
    // if there is at least one workout in our db then first set the 'continue workout' href to '/exercise?id=' plus the workout id
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    // workoutSummary contains an object representing the last workout in our db
    const workoutSummary = {
      // uses toLocaleDateString() to format date
      date: formatDate(lastWorkout.day),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.exercises.length,
      // uses reduce() to sum up all exercise stats for the last workout. returns an object
      ...tallyExercises(lastWorkout.exercises)
    };
    console.log(workoutSummary);

    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText()
  }
}
// sum all exercise stats for one workout
function tallyExercises(exercises) {
  const tallied = exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}
// displays last workout statistics
function renderWorkoutSummary(summary) {
  const container = document.querySelector(".workout-stats");

  // maps the argument's keys to formatted statistic descriptions
  const workoutKeyMap = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    // statistic description
    strong.textContent = workoutKeyMap[key];
    // displays actual statistic 
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    // display statistics on page
    container.appendChild(p);
  });
}

// displays text if no workouts in db
function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

// gets last workout upon loading index page
initWorkout();
