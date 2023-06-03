import styles from "./Replies.module.css";

import Reply from "../Reply/Reply";

import { ReplyType } from "../../types/types";

function Replies(props: { replies: ReplyType[]; commentId: number }) {
  return (
    <div className={styles.replies}>
      {props.replies.map((reply) => (
        <Reply
          replies={props.replies}
          commentId={props.commentId}
          key={reply.id}
          reply={reply}
        />
      ))}
    </div>
  );
}

export default Replies;
