import { useState } from "react";
import styles from "./Rating.module.css";
import minusIcon from "/assets/icon-minus.svg";
import plusIcon from "/assets/icon-plus.svg";

function Rating(props: { score: number; className?: string }) {
  const [rating, setRating] = useState(props.score);
  return (
    <div className={`${styles.rating} ${props.className || ""}`}>
      <div onClick={() => setRating((rating) => rating + 1)}>
        <img src={plusIcon} alt="" />
      </div>
      <span>{rating}</span>
      <div onClick={() => setRating((rating) => rating - 1)}>
        <img src={minusIcon} alt="" />
      </div>
    </div>
  );
}

export default Rating;
