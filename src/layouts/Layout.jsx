import { Link } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { MdPermContactCalendar } from "react-icons/md";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Contacts List</h1>
          <MdPermContactCalendar className={styles.contactIcon} />
        </div>
        <div className={styles.addButton}>
          <Link to="/addcontact" title="Add New Contact">
            <IoPersonAdd />
          </Link>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>
          Challenge By <a href="https://botostart.ir/">BotoStart</a> | Developed
          By <a href="https://github.com/sama-khodadady">Sama-Khodadady</a>
          &#128150;
        </p>
      </footer>
    </div>
  );
};

export default Layout;
