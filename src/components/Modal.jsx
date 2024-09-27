import { useNavigate, useParams } from "react-router-dom";

import { useContacts } from "../context/ContactContext";

import styles from "./Modal.module.css";

const Modal = ({ message, contactId, setDeleteAll }) => {
  const { state, dispatch } = useContacts();
  const navigate = useNavigate();
  const { id } = useParams();

  //delete contact confirmation
  const confirmDelete = () => {
    console.log(state.contacts);
    dispatch({ type: "DELETE_CONTACT", payload: contactId });
    dispatch({ type: "CLOSE_MODAL" });
  };

  //edit contact Confirmation
  const confirmEdit = () => {
    dispatch({ type: "EDIT_CONTACT", payload: { data: state.formData, id } });
    dispatch({ type: "RESET_IS_EDIT" });
    navigate("/contactslist");
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "RESET_FORM_DATA" });
  };

  //Delete Multiple Contacts
  const confirmDeleteAll = () => {
    dispatch({ type: "DELETE_ALL" });
    setDeleteAll(false);
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "RESET_SHOW_BUTTON" });
  };

  //Modal confirm(Yes) Button Handler
  const handleConfirm = () => {
    if (state.isEdit === true) {
      confirmEdit();
    } else if (state.showButton === true) {
      confirmDeleteAll();
    } else {
      confirmDelete();
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <button className={styles.confirmButton} onClick={handleConfirm}>
            Yes
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => dispatch({ type: "CLOSE_MODAL" })}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
