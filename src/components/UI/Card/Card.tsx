import styles from "./Card.module.css";

import { ReactNode } from "react";

function Card(props: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.card} ${props.className || ""}`}>
      {props.children}
    </div>
  );
}

export default Card;
