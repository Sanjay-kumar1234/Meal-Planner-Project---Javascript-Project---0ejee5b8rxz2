// mealcard elements
const mealName = document.getElementById("mealName");
const mealCalory = document.getElementById("mealCalory");
const mealImage = document.getElementById("mealImage");

const weight = document.getElementById("weight");
const height = document.getElementById("height");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const activityLevel = document.getElementById("activityLevel");
const generateMeal = document.getElementById("generateMeal");

const mealCard = document.getElementsByClassName("mealCards");

const breakFast = document.getElementById("breakFast");
const lunch = document.getElementById("lunch");
const dinner = document.getElementById("dinner");

const ingredients = document.getElementById("ingredients");
const steps = document.getElementById("steps");

let bmr = 1;
function bmrCalculate() {
  const selectedGender = gender.options[gender.selectedIndex];
  const gendervalue = selectedGender.value;
  const selectedActivity = activityLevel.options[activityLevel.selectedIndex];
  const activityLevelvalue = selectedActivity.value;

  if (gendervalue === "female") {
    console.log("female");
    bmr =
      655.1 +
      9.563 * parseInt(weight.value) +
      1.85 * parseInt(height.value) -
      4.676 * parseInt(age.value);
  } else if (gendervalue === "male") {
    console.log("male");
    bmr =
      66.47 +
      13.75 * parseInt(weight.value) +
      5.003 * parseInt(height.value) -
      6.755 * parseInt(age.value);
  } else {
    bmr = 700;
  }

  if (activityLevelvalue === "light") {
    bmr *= 1.375;
  } else if (activityLevelvalue === "moderate") {
    bmr *= 1.55;
  } else if (activityLevelvalue === "active") {
    bmr *= 1.725;
  } else {
    bmr = 700;
  }
  console.log("Your bmr is -->  " + bmr);
}

const generateMealFn = (event) => {
  event.preventDefault();

  bmrCalculate();

  if (breakFast.classList.contains("hidden")) {
    breakFast.classList.remove("hidden");
  }

  if (lunch.classList.contains("hidden")) {
    lunch.classList.remove("hidden");
  }

  if (dinner.classList.contains("hidden")) {
    dinner.classList.remove("hidden");
  }
  let id = 0;
  fetch(
    "https://content.newtonschool.co/v1/pr/64995a40e889f331d43f70ae/categories"
  )
    .then((res) => res.json())
    .then((data) => {
      const categories = data;
      categories.map((e) => {
        if (e.min <= bmr && e.max >= bmr) {
          breakFast.innerHTML = `
          <img id="mealImage" src="${e.breakfast.image}" alt="" height="180px" width="100%">
          <div>
              <p class="mealName">${e.breakfast.title}</p>
              <p class="mealCalory">Ready in minutes ${e.breakfast.readyInMinutes}</p>
              <button class="getMeal btn"  mealId="${e.breakfast.id}" >Get Recipe</button>
          </div>`;

          lunch.innerHTML = `
          <img id="mealImage" src="${e.lunch.image}" alt="" height="180px" width="100%">
          <div>
              <p class="mealName">${e.lunch.title}</p>
              <p class="mealCalory">Ready in minutes ${e.lunch.readyInMinutes}</p>
              <button class="getMeal btn" mealId="${e.lunch.id}" >Get Recipe</button>
          </div>`;

          dinner.innerHTML = `
          <img id="mealImage" src="${e.dinner.image}" alt="" height="180px" width="100%">
          <div>
              <p class="mealName">${e.dinner.title}</p>
              <p class="mealCalory">Ready in minutes ${e.dinner.readyInMinutes}</p>
              <button class="getMeal btn" mealId="${e.dinner.id}"   >Get Recipe ${e.dinner.id} </button>
          </div>`;

          const getRecipe = document.querySelectorAll(".getMeal");
          console.log(getRecipe);
          getRecipe.forEach((e) => {
            e.onclick = (evt) => {
              let mealid = evt.target.getAttribute("mealId");
              console.log(mealid);

              fetch(
                "https://content.newtonschool.co/v1/pr/64996337e889f331d43f70ba/recipes"
              )
                .then((res) => res.json())
                .then((data) => {
                  data.forEach((e) => {
                    if (e.id == mealid) {
                      ingredients.innerHTML = `${e.ingredients}`;
                      steps.innerHTML = `${e.steps}`;
                    }
                  });
                });
            };
          });
        }
      });
    });
};

// BMR = 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years)

// **For men**, BMR = 66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)

// - **Lightly active (exercise 1–3 days/week)**: BMR x 1.375
// - **Moderately active (exercise 3–5 days/week)**: BMR x 1.55
// - **Active (exercise 6–7 days/week)**: BMR x 1.725
generateMeal.addEventListener("click", generateMealFn);

const ingredientsBtn = document.getElementById("ingredientsBtn");
const stepsBtn = document.getElementById("stepsBtn");

const ingredientsTab = document.getElementById("ingredientsTab");
const stepsTab = document.getElementById("stepsTab");

ingredientsBtn.addEventListener("click", () => {
  console.log("ingredientsBtn click");

  if (stepsTab.classList.contains("active")) {
    stepsTab.classList.remove("active");
  }
  if (!ingredientsTab.classList.contains("active")) {
    ingredientsTab.classList.add("active");
  }
});

stepsBtn.addEventListener("click", () => {
  console.log("stepsBtn click");
  if (ingredientsTab.classList.contains("active")) {
    ingredientsTab.classList.remove("active");
  }
  if (!stepsTab.classList.contains("active")) {
    stepsTab.classList.add("active");
  }
});
