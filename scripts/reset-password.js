import { setErrorFor, setSuccessFor, reset, API_BASE_URL } from "./config.js";

const resetPasswordForm = document.getElementById("resetPasswordForm");
const studentOption = document.getElementById("student");
const teacherOption = document.getElementById("teacher");
const userId = resetPasswordForm.userId;
const otp = resetPasswordForm.otp;
const password = resetPasswordForm.password;
const password2 = resetPasswordForm.password2;
const sendOTPBtn = document.getElementById("sendOTP");
const confirmOTPBtn = document.getElementById("confirmOTP");
const submitBtn = document.getElementById("resetPassword");
const spinner = document.getElementById("spinner");

const modalHeader = document.getElementById("alertModalHeader");
const modalTitle = document.getElementById("alertModalTitle");
const modalBody = document.getElementById("alertModalBodyText");
const modalFooter = document.getElementById("alertModalFooterText");

let sentOtpValue, user;

window.addEventListener("pageshow", () => {
  resetPasswordForm.reset();
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

userId.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

userId.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

otp.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

otp.addEventListener('blur', (event) => {
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

function sendEmail(OTP, user) {
  emailjs.init("user_Vr1Y5QeLoak93uH1s4hXI");

  let templateParams = {
    OTP: OTP,
    name: user.firstName + user.lastName,
    email: user.email
  };

  return emailjs.send('service_9r8xwc8', 'template_5ivhdyv', templateParams);
}

async function sendOTP() {
  const userIdValue = userId.value.trim();
  let url;

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

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    user = await response.json();

    if (response.status != 200) {
      // show error and add error class for customer not found
      setErrorFor(userId, "User could not be found");
    }
    else {
      // show success for userId
      setSuccessFor(userId);
      sentOtpValue = Math.floor(Math.random() * 1000000);
      const emailResponse = await sendEmail(sentOtpValue, user);

      if (emailResponse.status !== 200) {
        modalTitle.innerText = "Send OTP Unsuccessful";
        modalHeader.style.backgroundColor = "#e74c3c";
        modalBody.innerText = emailResponse.error;
        modalFooter.innerText = "Click Close to register again";
      }
      else {
        modalTitle.innerText = "Send OTP Successful";
        modalHeader.style.backgroundColor = "#2ecc71";
        modalBody.innerText = "OTP has been sent to your email";
        modalFooter.innerText = "Click Close to login";

        userId.parentElement.className = "col-sm-12 p-0 hide-input";
        studentOption.parentElement.parentElement.className = "col-sm-12 m-0 mb-4 options row hide-input";
        otp.parentElement.className = "col-sm-12 p-0";
        sendOTPBtn.parentElement.className = "col-sm-12 p-0 hide-input";
        confirmOTPBtn.parentElement.className = "col-sm-12 p-0";
      }
    }
  }
  sendOTPBtn.style.display = 'block';
  spinner.style.display = 'none';
}

sendOTPBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  sendOTPBtn.style.display = 'none';
  spinner.style.display = 'block';

  await sendOTP();
});

function confirmOTP() {
  const otpValue = otp.value.trim();

  if (otpValue === "") {
    // show error and add error class for blank password
    setErrorFor(otp, "OTP cannot be blank");
  }
  else if (!otpValue.match(sentOtpValue)) {
    // show error and add error class for incorrect otp
    setErrorFor(otp, "Incorrect OTP");
  }
  else {
    setSuccessFor(otp);

    otp.parentElement.className = "col-sm-12 p-0 hide-input";
    confirmOTPBtn.parentElement.className = "col-sm-12 p-0 hide-input";
    password.parentElement.className = "col-sm-12 p-0";
    password2.parentElement.className = "col-sm-12 p-0";
    submitBtn.parentElement.className = "col-sm-12 p-0";
  }
  confirmOTPBtn.style.display = 'block';
  spinner.style.display = 'none';
}

confirmOTPBtn.addEventListener('click', (event) => {
  event.preventDefault();
  confirmOTPBtn.style.display = 'none';
  spinner.style.display = 'block';

  confirmOTP();
});

async function resetPassword() {
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  let validPassword = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*~`?/]).{8,}";
  let status = true;

  if (passwordValue === "") {
    // show error and add error class for blank password
    setErrorFor(password, "Password cannot be blank");
    status = false;
  }
  else if (!passwordValue.match(validPassword)) {
    // show error and add error class for weak password
    setErrorFor(password, "Password cannot be weak<br>Tip: atleast 1 upper case, 1 lower case, 1 digit and 1 special character (without commas and brackets) and 8 characters long");
    status = false;
  }
  else if (passwordValue.match(user.password)) {
    // show error and add error class for matching old password
    setErrorFor(password, "New password cannot be same as old password");
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
  else if (!password2Value.match(passwordValue)) {
    // show error and add error class for unmatching password
    setErrorFor(password2, "Password does not match");
    status = false;
  }
  else {
    reset(password2);
  }

  if (status) {
    setSuccessFor(password);
    setSuccessFor(password2);

    let url, body = {};

    if (studentOption.checked) {
      url = API_BASE_URL + "/students/" + user.id;

      body = JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        grade: user.grade,
        email: user.email,
        password: passwordValue,
        phoneNumber: user.phoneNumber
      });
    }
    else {
      url = API_BASE_URL + "/teachers/" + user.id;

      body = JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        doj: user.doj,
        email: user.email,
        password: passwordValue,
        phoneNumber: user.phoneNumber,
        subjectId: user.subjectId
      });
    }

    const response = await fetch(url, {
      method: "PUT",
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    if (response.status != 200) {
      console.log(json.error);
      modalTitle.innerText = "Reset Password Unsuccessful";
      modalHeader.style.backgroundColor = "#e74c3c";
      modalBody.innerText = "Password could not be updated";
      modalFooter.innerText = "Click Close to reset password again.";
    }
    else {
      modalTitle.innerText = "Reset Password Successful";
      modalHeader.style.backgroundColor = "#2ecc71";
      modalBody.innerText = "Updated password successfully";
      modalFooter.innerText = "Click Close to login";
    }

    $("#alertModal").modal({
      backdrop: 'static',
      keyboard: false
    });

    $(document).on('hidden.bs.modal', '#alertModal', () => {
      if (response.status != 200) {
        window.location.assign("./reset-password.html");
      }
      else {
        window.location.assign("./");
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

  await resetPassword();
});