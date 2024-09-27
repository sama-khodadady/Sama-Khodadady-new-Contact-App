import api from "./config";

//add new contact request
const addContact = async (formData) => {
  try {
    await api.post("/contacts", {
      id: formData.id,
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      checked: formData.checked,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//edit contact request
const editContact = async (formData,id) => {
  console.log(formData);
  try {
    await api.put(`/contacts/${id}`, formData);
  } catch (error) {
    console.log(error.message);
  }
};

//delete a contact request
const deleteContact = async (contactId) => {
  try {
    await api.delete(`/contacts/${contactId}`);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteAllContacts = async (contacts) => {
  const checkedContacts = contacts
    .filter((contact) => contact.checked === true)
    .map((contact) => contact.id);

  console.log(checkedContacts);

  try {
    await Promise.all(
      checkedContacts.map((id) => api.delete(`/contacts/${id}`))
    );
  } catch (error) {
    console.log(error.message);
  }
};

export { addContact, editContact, deleteContact, deleteAllContacts };
