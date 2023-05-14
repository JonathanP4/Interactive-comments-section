import React, { useRef } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

function Modal(props: {
  onClickEvent: () => void;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  function hideModal() {
    props.setState((state) => !state);
  }
  function deleteReply() {
    props.onClickEvent();
  }

  return createPortal(
    <>
      <div className={styles.backdrop}></div>
      <div ref={modalRef} className={styles.modal}>
        <h1>Delete comment</h1>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone
        </p>
        <div className={styles.buttons}>
          <button onClick={hideModal}>No, cancel</button>
          <button onClick={deleteReply}>Yes, delete</button>
        </div>
      </div>
    </>,
    document.getElementById("modal") as HTMLDivElement
  );
}

export default Modal;
