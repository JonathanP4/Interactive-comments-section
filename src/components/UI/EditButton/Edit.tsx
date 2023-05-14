import editIcon from "/assets/icon-edit.svg";
import styles from "./Edit.module.css";

function Edit(props: { clickEvent: () => void }) {
  return (
    <div onClick={props.clickEvent} className={styles.edit}>
      <img src={editIcon} alt="" />
      <span>Edit</span>
    </div>
  );
}

export default Edit;
