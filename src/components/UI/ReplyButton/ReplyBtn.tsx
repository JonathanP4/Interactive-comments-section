import styles from "./ReplyBtn.module.css";

import replyIcon from "/assets/icon-reply.svg";

function ReplyBtn(props: { clickEvent: () => void }) {
  return (
    <div onClick={props.clickEvent} className={styles["reply-btn"]}>
      <img src={replyIcon} alt="reply icon" />
      <span>Reply</span>
    </div>
  );
}

export default ReplyBtn;
