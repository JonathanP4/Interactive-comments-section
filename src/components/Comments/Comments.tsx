import { useContext } from "react";
import Comment from "../Comment/Comment";
import styles from "./Comments.module.css";
import { DataContext } from "../../context/data-context";

function Comments() {
  const ctx = useContext(DataContext);
  return (
    <div className={styles.comments}>
      {ctx.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;
