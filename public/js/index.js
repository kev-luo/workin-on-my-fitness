// calls init upon loading index html
init();

async function init() {
  // if there is no query parameter in the url then get the last workout in our db
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    // if there is at least one workout in our db then reload the page with the id query parameter set equal to the last workout's ID
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      // if there are no workouts in our db, hide the 'continue workout' button
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

