import { RotatingLines } from "react-loader-spinner";

import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <RotatingLines
        width="100px"
        height="100px"
        strokeColor="#6552f4"
        strokeWidth="3"
      />
    </div>
  );
};

export default Loader;
