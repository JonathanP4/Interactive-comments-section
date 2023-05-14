import { useRef } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

function Modal(props: { onClickEvent: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function hideModal() {
    dialogRef.current?.close();
  }
  function deleteReply() {
    hideModal();
    props.onClickEvent();
  }

  return createPortal(
    <dialog ref={dialogRef} className={styles.dialog}>
      <h1>Delete comment</h1>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone
      </p>
      <div className={styles.buttons}>
        <button onClick={hideModal}>No, cancel</button>
        <button onClick={deleteReply}>Yes, delete</button>
      </div>
    </dialog>,
    document.getElementById("modal") as HTMLDivElement
  );
}

export default Modal;
