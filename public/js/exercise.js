const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;

// reload page with id query parameter of new workout if one was created. do nothing if no workout was just created
async function initExercise() {
  let workout;
  // if there is no query parameter in the url then we're going to check if a new workout was inserted into our db. if it was then we're going to reload the page with the id query parameter set equal to the new workout's ID
  if (location.search.split("=")[1] === undefined) {
    workout = await API.createWorkout()
    console.log(workout)
  }
  if (workout) {
    location.search = "?id=" + workout._id;
  }
}

// call initExercise() upon loading the exercise page
initExercise();

// toggles 'display:hide' for the two forms depending on what workout type the user selects
function handleWorkoutTypeChange(event) {
  // set workout type global variable equal to selected workout type
  workoutType = event.target.value;

  // we hide the form that matches the workout type selected by the user. if neither cardio nor resistance was chosen then we hide both forms
  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }

  // once workout type is chosen the 'add exercise' and 'complete' buttons are immediately disabled since none of the forms will have been filled
  validateInputs();
}

// set 'add exercise' and 'complete' buttons to disabled if any of the fields are blank. remove the 'disabled' class from the buttons if all fields are filled.
function validateInputs() {
  let isValid = true;

  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (workoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }

  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

// send put request with all form inputs, clears input fields, and adds animation to toast div
async function handleFormSubmit(event) {
  event.preventDefault();

  let workoutData = {};

  // fill in workoutData object with form inputs
  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }
  // put request to add an exercise within a workout. remember one workout is an instance in our db. one workout can have multiple exercises.
  await API.addExercise(workoutData);
  // adds animation once exercise is successfully added and resets all input fields to empty strings
  clearInputs();
  toast.classList.add("success");
}

function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}


if (workoutTypeSelect) {
  // calls handleWorkoutTypeChange whenever we change the exercise type
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
if (completeButton) {
  // calls handleFormSubmit whenever the complete button is clicked
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
if (addButton) {
  // calls handleFormSubmit whenever the add exercise button is clicked
  addButton.addEventListener("click", handleFormSubmit);
}
// once new excercise is added to a workout and the follow-up animation completes, handleToastAnimationEnd is invoked which removes the 'class' attribute and redirects us to root path
toast.addEventListener("animationend", handleToastAnimationEnd);

// validateInputs is run anytime the user adds text to an input field, making sure the buttons become undisabled when necessary.
document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));
