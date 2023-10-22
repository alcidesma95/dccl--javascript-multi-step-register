const firstStep = document.getElementById("end_first_step");
const secondStep = document.getElementById("end_second_step");
const firstStepper = document.getElementById("first_stepper");
const secondStepper = document.getElementById("second_stepper");
const thirdStepper = document.getElementById("third_stepper");
const registerArea = document.getElementById("register");
const interestArea = document.getElementById("interest");
const summaryArea = document.getElementById("summary");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const form = document.getElementById("user_form");
const counter = document.getElementById("counter");
const listOpt = document.getElementsByClassName("list_opt");
let username;
let email;
let interests = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  alert(`✅ Success: User ${username} with email ${email} created`)
});

firstStep.addEventListener("click", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  if (nameInput.value.trim().length > 0) username = nameInput.value;
  else {
    if (
      !nameInput.nextElementSibling ||
      !nameInput.nextElementSibling.classList.contains("error")
    )
      nameInput.parentNode.insertBefore(
        createError("* Username is required"),
        nameInput.nextSibling
      );
  }
  const emailInput = document.getElementById("email");
  if (emailInput.value.trim().length > 0) {
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.parentNode.insertBefore(
        createError("* email format is not correct"),
        emailInput.nextSibling
      );
    } else email = emailInput.value;
  } else {
    if (
      !emailInput.nextElementSibling ||
      !emailInput.nextElementSibling.classList.contains("error")
    )
      emailInput.parentNode.insertBefore(
        createError("* email is required"),
        emailInput.nextSibling
      );
  }
  if (!nameInput.value.trim()) console.log(username, email);
  if (username && email) {
    setEventToList();
    registerArea.classList.add("hidden");
    firstStepper.classList.remove("active");
    secondStepper.classList.add("complete", "active");
    interestArea.classList.remove("hidden");
    counter.textContent = "2";
  }
});

secondStep.addEventListener("click", (event) => {
  event.preventDefault();
  if(interests.length > 0){
    secondStepper.classList.remove("active");
    thirdStepper.classList.add("complete", "active");
    interestArea.classList.add("hidden");
    summaryArea.classList.remove("hidden");
    counter.textContent = "3";
    setDataToSummary();
  }
  else {
    secondStep.parentNode.insertBefore(
    createError('* Select at least one topic '),
    secondStep.nextSibling
    
    )
  }
});

function setEventToList() {
  for (let i = 0; i < listOpt.length; i++) {
    const opt = listOpt[i];
    opt.addEventListener("click", (event) => {
      const interest = event.target.innerText;
      const index = interests.findIndex((item) => item === interest);
      if (index >= 0) interests.splice(index, 1);
      else interests.push(interest);
      opt.classList.toggle("select");
    });
  }
}

function setDataToSummary() {
  setTextToSpanId("value_name", username);
  setTextToSpanId("value_email", email);
  setElementToList();
}

function setTextToSpanId(idSpan, text) {
  const item = document.getElementById(idSpan);
  item.innerHTML = text;
}

function setElementToList() {
  const interestList = document.getElementById("interest_list");
  if (interests.length > 0) interests.map(
    
    
      (interest) => {
        const listItem = document.createElement("li");
        listItem.classList.add('value_name')
        listItem.innerHTML = interest;
        interestList.append(listItem);
      }
    
  );
}
function createError(text) {
  const error = document.createElement("span");
  error.innerHTML = text;
  error.classList.add("error");
  return error;
}
