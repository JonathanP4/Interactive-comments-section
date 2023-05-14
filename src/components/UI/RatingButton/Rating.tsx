import styles from "./Rating.module.css";
import minusIcon from "/assets/icon-minus.svg";
import plusIcon from "/assets/icon-plus.svg";

function Rating(props: { score: number; className?: string }) {
  return (
    <div className={`${styles.rating} ${props.className || ""}`}>
      <div>
        <img src={plusIcon} alt="" />
      </div>
      <span>{props.score}</span>
      <div>
        <img src={minusIcon} alt="" />
      </div>
    </div>
  );
}

export default Rating;
