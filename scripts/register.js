import { setErrorFor, setSuccessFor, reset, API_BASE_URL, sendEmail } from "./config.js";

const registerForm = document.getElementById("registerForm")
const studentOption = document.getElementById("student");
const teacherOption = document.getElementById("teacher");
const firstName = registerForm.firstName;
const lastName = registerForm.lastName;
const email = registerForm.email;
const phoneNumber = registerForm.phoneNumber;
const password = registerForm.password;
const password2 = registerForm.password2;
const dob = registerForm.dob;
const grade = registerForm.grade;
const doj = registerForm.doj;
const subject = registerForm.subject;
const submitBtn = document.getElementById("register");
const spinner = document.getElementById("spinner");

const modalHeader = document.getElementById("alertModalHeader");
const modalTitle = document.getElementById("alertModalTitle");
const modalBody = document.getElementById("alertModalBodyText");
const modalFooter = document.getElementById("alertModalFooterText");

window.addEventListener("pageshow", async () => {
  registerForm.reset();

  const response = await fetch(API_BASE_URL + "/subjects", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });

  const data = await response.json();
  data.forEach(obj => {
    const option = document.createElement("option");
    option.innerHTML = obj.name;
    option.value = obj.id;
    subject.appendChild(option);
  });
});

studentOption.addEventListener('click', () => {
  dob.parentElement.parentElement.className = "row register";
  doj.parentElement.parentElement.className = "row register hide-input";
});

teacherOption.addEventListener('click', () => {
  doj.parentElement.parentElement.className = "row register";
  dob.parentElement.parentElement.className = "row register hide-input";
});

firstName.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

firstName.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

lastName.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

lastName.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

grade.addEventListener('focus', (event) => {
  const selectElement = event.target;
  const legend = selectElement.parentElement.querySelector("legend");
  legend.style.visibility = "visible";

  selectElement[0].innerHTML = "";
});

grade.addEventListener('blur', (event) => {
  const selectElement = event.target;
  const legend = selectElement.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";

  selectElement[0].innerHTML = "Select Grade";
});

subject.addEventListener('focus', (event) => {
  const selectElement = event.target;
  const legend = selectElement.parentElement.querySelector("legend");
  legend.style.visibility = "visible";

  selectElement[0].innerHTML = "";
});

subject.addEventListener('blur', (event) => {
  const selectElement = event.target;
  const legend = selectElement.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";

  selectElement[0].innerHTML = "Select Subject";
});

email.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

email.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

phoneNumber.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

phoneNumber.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

password.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

password.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

password2.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

password2.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

function sendEmail(user) {
  emailjs.init("user_Vr1Y5QeLoak93uH1s4hXI");

  let templateParams = {
    id: user.id,
    name: user.firstName + user.lastName,
    email: user.email
  };

  return emailjs.send('service_9r8xwc8', 'template_ed71wqv', templateParams);;
}

async function register() {
  let firstNameValue = firstName.value.trim();
  let lastNameValue = lastName.value.trim();
  let emailValue = email.value.trim();
  let phoneNumberValue = phoneNumber.value.trim();
  let passwordValue = password.value.trim();
  let password2Value = password2.value.trim();
  let dobValue, gradeValue, dojValue, subjectValue;

  let validEmail = "^(?=.{8,64}@)[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z]{2,})$";
  let validPassword = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*~`?/]).{8,}";
  let validPhoneNumber = "^[6-9]{1}[0-9]{9}$";
  let status = true;

  // validate inputs
  if (firstNameValue === "") {
    // show error and add error class for blank firstName
    setErrorFor(firstName, "First name cannot be blank");
    status = false;
  }
  else {
    reset(firstName);
  }

  if (lastNameValue === "") {
    // show error and add error class for blank firstName
    setErrorFor(lastName, "Last name cannot be blank");
    status = false;
  }
  else {
    reset(lastName);
  }

  if (emailValue === "") {
    // show error and add error class for blank email
    setErrorFor(email, "Email cannot be blank");
    status = false;
  }
  else if (!emailValue.match(validEmail)) {
    // show error and add error class for invalid email
    setErrorFor(email, "Email is not valid<br>Tip: firstname(.)lastname@domainname and atleast 8 characters before @");
    status = false;
  }
  else {
    reset(email);
  }

  if (phoneNumberValue === "") {
    // show error and add error class for blank phone number
    setErrorFor(phoneNumber, "Phone number cannot be blank");
    status = false;
  }
  else if (!phoneNumberValue.match(validPhoneNumber)) {
    // show error and add error class for invalid phone number
    setErrorFor(phoneNumber, "Phone Number is not valid");
    status = false;
  }
  else {
    reset(phoneNumber);
  }

  if (passwordValue === "") {
    // show error and add error class for blank passowrd
    setErrorFor(password, "Password cannot be blank");
    status = false;
  }
  else if (!passwordValue.match(validPassword)) {
    // show error and add error class for weak password
    setErrorFor(password, "Password cannot be weak<br>Tip: atleast 1 upper case, 1 lower case, 1 digit and 1 special character (without commas and brackets) and 8 characters long");
    status = false;
  }
  else {
    reset(password);
  }

  if (password2Value === "") {
    // show error and add error class for blank passowrd
    setErrorFor(password2, "Password cannot be blank");
    status = false;
  }
  else if (passwordValue === "" || !password2Value.match(passwordValue)) {
    // show error and add error class for un-matching passwrod
    setErrorFor(password2, "Password does not match");
    status = false;
  }
  else {
    reset(password2);
  }

  if (studentOption.checked) {
    dobValue = dob.value;
    gradeValue = grade.value;

    if (dobValue === "") {
      // show error and add error class for blank dob
      setErrorFor(dob, "DOB cannot be blank");
      status = false;
    }
    else {
      reset(dob);
    }

    if (gradeValue === "") {
      // show error and add error class for blank address
      setErrorFor(grade, "Grade cannot be blank");
      status = false;
    }
    else {
      reset(grade);
    }
  }
  else {
    dojValue = doj.value;
    subjectValue = subject.value;

    if (dojValue === "") {
      // show error and add error class for blank dob
      setErrorFor(doj, "DOJ cannot be blank");
      status = false;
    }
    else {
      reset(doj);
    }

    if (subjectValue === "") {
      // show error and add error class for blank address
      setErrorFor(subject, "Subject cannot be blank");
      status = false;
    }
    else {
      reset(subject);
    }
  }

  if (status) {
    setSuccessFor(firstName);
    setSuccessFor(lastName);
    setSuccessFor(email);
    setSuccessFor(phoneNumber);
    setSuccessFor(password);
    setSuccessFor(password2);

    let url, body = {};

    if (studentOption.checked) {
      setSuccessFor(dob);
      setSuccessFor(grade);

      url = API_BASE_URL + "/students";

      body = JSON.stringify({
        firstName: firstNameValue,
        lastName: lastNameValue,
        dob: dobValue,
        grade: gradeValue,
        email: emailValue,
        password: passwordValue,
        phoneNumber: phoneNumberValue
      });
    }
    else {
      setSuccessFor(doj);
      setSuccessFor(subject);

      url = API_BASE_URL + "/teachers";

      body = JSON.stringify({
        firstName: firstNameValue,
        lastName: lastNameValue,
        doj: dojValue,
        email: emailValue,
        password: passwordValue,
        phoneNumber: phoneNumberValue,
        subjectId: subjectValue
      });
    }

    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const user = await response.json();
    
    if (response.status != 200) {
      modalTitle.innerText = "Registration Unsuccessful";
      modalHeader.style.backgroundColor = "#e74c3c";
      modalBody.innerText = "User could not be registered";
      modalFooter.innerText = "Click Close to register again";
    }
    else {
      modalTitle.innerText = "Registration Successful";
      modalHeader.style.backgroundColor = "#2ecc71";
      modalBody.innerText = `User ID: ${user.id}\nName: ${user.firstName + user.lastName}\nEmail: ${user.email}`;
      modalFooter.innerText = "Click Close to login";
      sendEmail(user);
    }

    $("#alertModal").modal({
      backdrop: 'static',
      keyboard: false
    });

    $(document).on('hidden.bs.modal', '#alertModal', () => {
      if (response.status != 200) {
        window.location.assign("/register.html");
      }
      else {
        window.location.assign("/");
      }
    });
  }
  submitBtn.style.display = 'block';
  spinner.style.display = 'none';
}

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  submitBtn.style.display = 'none';
  spinner.style.display = 'block';

  await register();
});