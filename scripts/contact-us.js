import { setErrorFor, setSuccessFor, reset, API_BASE_URL } from "./config.js";

const contactUsForm = document.getElementById("contactUsForm");
const email = contactUsForm.email;
const query = contactUsForm.query;
const submitBtn = document.getElementById("submitQuery");

const modalHeader = document.getElementById("alertModalHeader");
const modalTitle = document.getElementById("alertModalTitle");
const modalBody = document.getElementById("alertModalBody");
const modalFooter = document.getElementById("alertModalFooterText");

window.addEventListener("pageshow", () => {
  contactUsForm.reset();
});

email.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

email.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

query.addEventListener('focus', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "visible";
});

query.addEventListener('blur', (event) => {
  const legend = event.target.parentElement.querySelector("legend");
  legend.style.visibility = "hidden";
});

async function submitQuery() {
  const queryNameValue = queryName.value.trim();
  const queryEmailValue = queryEmail.value.trim();
  const queryValue = query.value.trim();
  const validEmailValue = "^(?=.{8,64}@)[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z]{2,})$";
  const url = API_BASE_URL + "/api/query/email";
  let status = true;

  if (queryNameValue === "") {
    setErrorFor(queryName, "Name cannot be blank");
    status = false;
  }
  else {
    reset(queryName);
  }

  if (queryEmailValue === "") {
    setErrorFor(queryEmail, "Email cannot be blank");
    status = false;
  }
  else if (!queryEmailValue.match(validEmailValue)) {
    setErrorFor(queryEmail, "Email is not valid");
    status = false;
  }
  else {
    reset(queryEmail);
  }

  if (queryValue === "") {
    setErrorFor(query, "Query description cannot be blank");
    status = false;
  }
  else {
    reset(query);
  }

  if (status) {
    setSuccessFor(queryName);
    setSuccessFor(queryEmail);
    setSuccessFor(query);

    let body = JSON.stringify({
      name: queryNameValue,
      email: queryEmailValue,
      query: query
    });

    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    const json = await response.json();

    if (response.status != 200) {
      console.log(json.error);
      modalTitle.innerText = "Query Submission Unsuccessful";
      modalHeader.style.backgroundColor = "#e74c3c";
      modalBody.innerText = `${json.message} as ${json.error}.`;
      modalFooter.innerText = "Click Close to try again";
    }
    else {
      modalTitle.innerText = "Query Submission Successful";
      modalHeader.style.backgroundColor = "#2ecc71";
      modalBody.innerText = `${json.message} \nYour Query number is ${json.queryNumber}.`;
      modalFooter.innerText = "Click Close";
    }

    $("#alertModal").modal({
      backdrop: 'static',
      keyboard: false
    });

    $(document).on('hidden.bs.modal', '#alertModal', () => {
      window.location.assign("./");
    });
  }

  submitBtn.style.display = 'block';
  spinner.style.display = 'none';
}

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  submitBtn.style.display = 'none';
  spinner.style.display = 'block';

  await submitQuery();
});