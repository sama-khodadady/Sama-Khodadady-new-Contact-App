import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useContacts } from "../context/ContactContext";
import { addContact } from "../services/crud.js";
import { newAlert, validateForm } from "../helpers/validateForm.js";
import Modal from "../components/Modal.jsx";

import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContacts();
  const [alert, setAlert] = useState({});

  //form input change handler && form validation
  const changeHandler = (event) => {
    const { name, value, type } = event.target;
    dispatch({ type: "SET_FORM_DATA", payload: { name, value } });
    validateForm(name, value, type);
    if (Object.keys(newAlert).length > 0) setAlert(newAlert);
  };

  //add new contact handler
  const addHandler = () => {
    if (
      !state.formData.name ||
      !state.formData.lastName ||
      !state.formData.email ||
      !state.formData.phone
    )
      return;
    addContact(state.formData);
    dispatch({ type: "SET_NEW_CONTACT", payload: state.formData });
    navigate("/contactslist");
    dispatch({ type: "RESET_FORM_DATA" });
  };

  //form edit button handler
  const editHandler = () => {
    dispatch({
      type: "SET_FORM_DATA",
      payload: { ...state.formData, id: state.formData.id },
    });
    dispatch({ type: "OPEN_MODAL" });
  };

  return (
    <div className={styles.container}>
      <form>
        <h1>{state.isEdit ? "Edit Contact" : "New Contact"}</h1>

        <div className={styles.name}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="First Name"
              value={state.formData.name}
              onChange={changeHandler}
            />
            {alert.name && <span>*{alert.name}</span>}
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastname"
              placeholder="Last Name"
              value={state.formData.lastName}
              onChange={changeHandler}
            />
            {alert.lastName && <span>*{alert.lastName}</span>}
          </div>
        </div>

        <div className={styles.email}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={state.formData.email}
            onChange={changeHandler}
          />
          {alert.email && <span>*{alert.email}</span>}
        </div>

        <div className={styles.phone}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            value={state.formData.phone}
            onChange={changeHandler}
          />
          {alert.phone && <span>*{alert.phone}</span>}
        </div>
      </form>

      <button
        type="submit"
        className={styles.formButton}
        onClick={state.isEdit ? editHandler : addHandler}
      >
        {state.isEdit ? "Edit Contact" : "Add Contact"}
      </button>

      {state.isModalOpen && (
        <Modal message="Are you sure you want to Edit this contact?" />
      )}
    </div>
  );
};

export default ContactForm;
