import styles from "./Delete.module.css";

import deleteIcon from "/assets/icon-delete.svg";
import Modal from "../Modal/Modal";

import { useState } from "react";

function Delete(props: { clickEvent: () => void }) {
  const [deleteState, setDeleteState] = useState(false);
  function deleteReply() {
    props.clickEvent();
  }

  function showModal() {
    setDeleteState((state) => !state);
  }

  return (
    <>
      {deleteState && (
        <Modal setState={setDeleteState} onClickEvent={deleteReply} />
      )}
      <div onClick={showModal} className={styles.delete}>
        <img src={deleteIcon} alt="" />
        <span>Delete</span>
      </div>
    </>
  );
}

export default Delete;
