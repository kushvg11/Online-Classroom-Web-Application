const API_BASE_URL = "http://localhost:9001/api";

function setErrorFor(input, message) {
  const divElement = input.parentElement;
  const messageElement = divElement.querySelector('p.message');

  // add error message
  messageElement.innerHTML = message;

  // add error class
  let slicedclass = divElement.className.slice(-5);
  if (slicedclass === "error") {
    divElement.className = divElement.className.slice(0, -6);
  }
  divElement.className += ' error';
}

function setSuccessFor(input) {
  const divElement = input.parentElement;

  // add success class
  let slicedclass = divElement.className.slice(-5);
  if (slicedclass === "error") {
    divElement.className = divElement.className.slice(0, -6);
  }

  if (slicedclass === "ccess") {
    divElement.className = divElement.className.slice(0, -8);
  }
  divElement.className += ' success';
}

function reset(input) {
  const divElement = input.parentElement;
  const messageElement = divElement.querySelector('p.message');

  // reset
  let slicedclass = divElement.className.slice(-5);
  if (slicedclass === "error") {
    divElement.className = divElement.className.slice(0, -6);
  }
  messageElement.innerHTML = "";
}

export { setErrorFor, setSuccessFor, reset, API_BASE_URL };