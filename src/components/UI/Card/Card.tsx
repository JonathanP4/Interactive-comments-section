import { ReactNode } from "react";
import styles from "./Card.module.css";

function Card(props: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.card} ${props.className || ""}`}>
      {props.children}
    </div>
  );
}

export default Card;
