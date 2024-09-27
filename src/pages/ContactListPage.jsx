import { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { BsCheckAll } from "react-icons/bs";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useContacts } from "../context/ContactContext";
import TableRow from "../components/TableRow";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

import styles from "./ContactListPage.module.css";

const ContactListPage = () => {
  const { state, dispatch } = useContacts();
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteAll, setDeleteAll] = useState(false);

  useEffect(() => {
    setDisplayed(state.contacts);
  }, [state.contacts]);

  //search Input change Handler
  const changeHandler = (e) => {
    const { value } = e.target;
    if (!value) setDisplayed(state.contacts);
    setSearch(value.toLowerCase().trim());
  };

  //search Button Handler
  const searchHandler = () => {
    const searchedContacts = state.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search) ||
        contact.lastName.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search) ||
        contact.phone.includes(search)
    );
    setDisplayed(searchedContacts);
  };

  //delete All Handler
  const deleteAllHandler = () => {
    if (!state.showButton) return;
    setDeleteAll(true);
    dispatch({ type: "OPEN_MODAL" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div className={styles.inputDiv}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={changeHandler}
          />
          <button onClick={searchHandler}>
            <ImSearch />
          </button>
        </div>
        <div className={styles.buttonDiv}>
          <button onClick={deleteAllHandler} title="Delete All">
            <AiOutlineUsergroupDelete />
          </button>

          <button
            onClick={() => dispatch({ type: "SET_SHOW_BUTTON" })}
            title="Select All"
          >
            <BsCheckAll />
          </button>

          {state.showButton && (
            <button
              onClick={() => dispatch({ type: "RESET_SHOW_BUTTON" })}
              title="undo"
            >
              <IoMdArrowRoundBack />
            </button>
          )}
        </div>
      </div>
      <div className={styles.contactTable}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {displayed.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  {!state.contacts.length ? (
                    <p className={styles.empty}>No contacts</p>
                  ) : (
                    <Loader />
                  )}
                </td>
              </tr>
            ) : (
              displayed.map((contact) => (
                <TableRow key={contact.id} data={contact} />
              ))
            )}
          </tbody>
        </table>

        {state.isModalOpen && deleteAll && (
          <Modal
            message="Are you sure you want to delete this contacts?"
            setDeleteAll={setDeleteAll}
          />
        )}
      </div>
    </div>
  );
};

export default ContactListPage;
