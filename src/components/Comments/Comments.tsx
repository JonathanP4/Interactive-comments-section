import { useContext } from "react";
import Comment from "../Comment/Comment";
import styles from "./Comments.module.css";
import { Data } from "../../store/DataProvider";

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
