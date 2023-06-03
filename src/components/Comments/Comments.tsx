import styles from "./Comments.module.css";

import Comment from "../Comment/Comment";

import { useSelector } from "react-redux";
import { CommentType } from "../../types/types";

function Comments() {
  const comments = useSelector(
    (state: { comments: CommentType[] }) => state.comments
  );
  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;
