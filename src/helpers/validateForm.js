const namePattern = /^[A-Za-z]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(\+98|0)?9\d{9}$/;

let newAlert = {};

const validateForm = (name, value, type) => {
  if (name === "name" && !value) {
    newAlert.name = "This field is required";
  } else if (
    name === "name" &&
    !namePattern.test(value.trim().toLocaleLowerCase())
  ) {
    newAlert.name = "Name must contain only letters";
  } else if (name === "name" && value) {
    newAlert.name = "";
  }

  if (name === "lastName" && !value) {
    newAlert.lastName = "This field is required";
  } else if (
    name === "lastName" &&
    !namePattern.test(value.trim().toLocaleLowerCase())
  ) {
    newAlert.lastName = "Last name must contain only letters";
  } else if (name === "lastName" && value) {
    newAlert.lastName = "";
  }

  if (type === "email" && !value) {
    newAlert.email = "This field is required";
  } else if (
    type === "email" &&
    !emailPattern.test(value.trim().toLocaleLowerCase())
  ) {
    newAlert.email = "Please Enter Valid Email Address";
  } else if (type === "email" && value) {
    newAlert.email = "";
  }

  if (type === "number" && !value) {
    newAlert.phone = "This field is required";
  } else if (type === "number" && !phonePattern.test(value)) {
    newAlert.phone = "Phone number must be between 10-15 digits";
  } else if (type === "number" && value) {
    newAlert.phone = "";
  }
};

export { validateForm, newAlert };
