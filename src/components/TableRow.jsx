import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";

import Modal from "./Modal";

import styles from "./TableRow.module.css";

const TableRow = ({ data }) => {
  const { id, name, lastName, email, phone } = data;
  const { state, dispatch } = useContacts();
  const navigate = useNavigate();

  //delete button handler
  const deleteHandler = () => {
    if (state.showButton === true) return;
    dispatch({ type: "OPEN_MODAL" });
    dispatch({ type: "CONTACT_ID", payload: id });
  };

  //edit button handler
  const editHandler = () => {
    if (state.showButton === true) return;
    dispatch({ type: "SET_IS_EDIT" });
    navigate(`/editcontact/${id}`);
    dispatch({ type: "CONTACT_TO_EDIT", payload: id });
  };

  return (
    <tr className={styles.row}>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td className={styles.actions}>
        <div>
          <input
            className={state.showButton ? styles.show : styles.checkBox}
            type="checkbox"
            value={state.formData.checked}
            id={`select-${id}`}
            onChange={() => dispatch({ type: "TOGGLE_CHECKED", payload: id })}
          />
          <div className={styles.buttons}>
            <button onClick={editHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </div>
      </td>

      {state.isModalOpen && state.contactId === id && (
        <Modal
          message="Are you sure you want to delete this contact?"
          contactId={id}
        />
      )}
    </tr>
  );
};

export default TableRow;
