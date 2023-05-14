import deleteIcon from "/assets/icon-delete.svg";
import styles from "./Delete.module.css";
import Modal from "../Modal/Modal";

function Delete(props: { clickEvent: () => void }) {
  function deleteReply() {
    props.clickEvent();
  }

  function showModal() {
    const dialog = document.querySelector("dialog");
    dialog?.showModal();
  }

  return (
    <>
      <Modal onClickEvent={deleteReply} />
      <div onClick={showModal} className={styles.delete}>
        <img src={deleteIcon} alt="" />
        <span>Delete</span>
      </div>
    </>
  );
}

export default Delete;
