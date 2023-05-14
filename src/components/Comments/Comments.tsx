import { useContext } from "react";
import Comment from "../Comment/Comment";
import Data from "../../store/data-context";
import styles from "./Comments.module.css";

function Comments() {
  const ctx = useContext(Data);
  return (
    <div className={styles.comments}>
      {ctx.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;
