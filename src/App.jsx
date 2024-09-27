import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import ContactListPage from "./pages/ContactListPage";
import ContactForm from "./pages/ContactForm";
import ContactsProvider from "./context/ContactContext";

function App() {
  return (
    <Layout>
      <ContactsProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/contactsList" replace />} />
          <Route path="/contactslist" element={<ContactListPage />} />
          <Route path="/addcontact" element={<ContactForm />} />
          <Route path="/editcontact/:id" element={<ContactForm />} />
        </Routes>
      </ContactsProvider>
    </Layout>
  );
}

export default App;
