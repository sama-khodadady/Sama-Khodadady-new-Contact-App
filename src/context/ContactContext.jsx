import { createContext, useContext, useEffect, useReducer } from "react";
import { v4 } from "uuid";

import api from "../services/config";

const initialState = {
  contacts: [],
  formData: {
    id: null,
    name: "",
    lastName: "",
    email: "",
    phone: "",
    checked: undefined,
  },
  isModalOpen: false,
  contactId: null,
  contactToEdit: null,
  isEdit: false,
  showButton: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: payload,
      };

    case "SET_NEW_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, payload],
      };

    case "SET_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          [payload.name]: payload.value,
          id: state.formData.id || v4(),
          checked: false,
        },
      };

    case "RESET_FORM_DATA":
      return {
        ...state,
        formData: {
          id: null,
          name: "",
          lastName: "",
          email: "",
          phone: "",
          checked: undefined,
        },
      };

    case "OPEN_MODAL":
      return { ...state, isModalOpen: true };

    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false };

    case "CONTACT_ID":
      const contact = state.contacts.find((contact) => contact.id === payload);
      return {
        ...state,
        contactId: contact.id,
      };

    case "DELETE_CONTACT":
      const newContacts = state.contacts.filter(
        (contact) => contact.id !== payload
      );
      return { ...state, contacts: newContacts };

    case "CONTACT_TO_EDIT":
      const editContact = state.contacts.find(
        (contact) => contact.id === payload
      );
      return { ...state, formData: editContact };

    case "SET_IS_EDIT":
      return { ...state, isEdit: true };

    case "RESET_IS_EDIT":
      return { ...state, isEdit: false };

    case "EDIT_CONTACT":
      const contactIndex = state.contacts.findIndex(
        (contact) => contact.id === payload.id
      );
      state.contacts[contactIndex] = payload.data;

      return {
        ...state,
        contacts: [...state.contacts],
      };

    case "SET_SHOW_BUTTON":
      return {
        ...state,
        showButton: true,
      };

    case "RESET_SHOW_BUTTON":
      return {
        ...state,
        showButton: false,
      };

    case "TOGGLE_CHECKED":
      const checkedContacts = state.contacts.map((contact) =>
        contact.id === payload
          ? { ...contact, checked: !contact.checked }
          : contact
      );
      return {
        ...state,
        contacts: checkedContacts,
      };

    case "DELETE_ALL":
      const undeletedContacts = state.contacts.filter(
        (contact) => contact.checked === false
      );
      return {
        ...state,
        contacts: undeletedContacts,
      };
    default:
      throw new Error("invalid action");
  }
};

const ContactContext = createContext();

const ContactsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get("/contacts");
        dispatch({ type: "SET_CONTACTS", payload: response });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.message);
        }
      }
    };
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

//custom Hook
const useContacts = () => {
  const contacts = useContext(ContactContext);
  return contacts;
};

export default ContactsProvider;
export { useContacts };
