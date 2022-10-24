import { setErrorFor, setSuccessFor, reset, API_BASE_URL } from "./config.js";

const loginForm = document.getElementById("loginForm");
const studentOption = document.getElementById("student");
const teacherOption = document.getElementById("teacher");
const userId = loginForm.userId;
const password = loginForm.password;
const submitBtn = document.getElementById("login");
const spinner = document.getElementById("spinner");

window.addEventListener("pageshow", () => {
  loginForm.reset();
});

studentOption.addEventListener("click", () => {
  userId.placeholder = "Enter Student ID";
  userId.parentElement.querySelector("legend").innerText = "Enter Student ID";

  userId.addEventListener('blur', () => {
    userId.placeholder = "Enter Student ID";
  });
});

teacherOption.addEventListener("click", () => {
  userId.placeholder = "Enter Teacher ID";
  userId.parentElement.querySelector("legend").innerText = "Enter Teacher ID";

  userId.addEventListener('blur', () => {
    userId.placeholder = "Enter Teacher ID";
  });
});

userId.addEventListener("focus", (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

userId.addEventListener("blur", (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

password.addEventListener("focus", (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

password.addEventListener("blur", (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

async function login() {
  const userIdValue = userId.value.trim();
  const passwordValue = password.value.trim();
  let url, status = false;

  if (studentOption.checked) {
    url = API_BASE_URL + "/students/" + userIdValue;
  }
  else {
    url = API_BASE_URL + "/teachers/" + userIdValue;
  }

  // validate inputs
  if (userIdValue === "") {
    // show error for blank userId
    setErrorFor(userId, "ID cannot be blank");
  }
  else {
    reset(userId);
  }

  if (passwordValue === "") {
    // show error for blank password
    setErrorFor(password, "Password cannot be blank");
  }
  else {
    reset(password);
  }

  if (userIdValue !== "" && passwordValue !== "") {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const user = await response.json();

    if (response.status !== 200) {
      // show error for user not found
      setErrorFor(userId, errorMessage);
      setErrorFor(password, "User could not be found");
    }
    else {
      // show success for userId
      setSuccessFor(userId);
      let checkPasswordValue = user.password;

      if (passwordValue !== checkPasswordValue) {
        // show error for incorrect password
        setErrorFor(password, "Incorrect Password");
      }
      else {
        // show success for password
        setSuccessFor(password);
        status = true;
      }
      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem("name", user.firstName + " " + user.lastName)
    }
  }
  submitBtn.style.display = "block";
  spinner.style.display = "none";
  return status;
}

submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  submitBtn.style.display = "none";
  spinner.style.display = "block";

  let status = await login();
  setTimeout(() => {
    if (status) {
      // creating session
      sessionStorage.setItem("session", Math.random().toString(36).substring(2, 16));
      window.location.assign("/dashboard.html");
    }
  }, 2000);
});