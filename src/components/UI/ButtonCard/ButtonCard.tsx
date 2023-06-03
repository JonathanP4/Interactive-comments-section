import styles from "./ButtonCard.module.css";

import { ReactNode } from "react";

function ButtonCard(props: {
  className?: string;
  children: ReactNode;
  clickEvent: () => void;
}) {
  function clickEvent() {
    props.clickEvent();
  }
  return (
    <button
      onClick={clickEvent}
      className={`${styles.button} ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}

export default ButtonCard;
