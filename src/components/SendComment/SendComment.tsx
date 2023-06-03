import styles from "./SendComment.module.css";
import TextArea from "../UI/TextArea/TextArea";
import ButtonCard from "../UI/ButtonCard/ButtonCard";
import Card from "../UI/Card/Card";

import { useRef } from "react";
import { commentActions } from "../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { CommentType, CurrentUserType } from "../../types/types";

function SendComment(props: { className?: string }) {
  const txtareaRef = useRef<HTMLTextAreaElement>(null);

  const comments = useSelector(
    (state: { comments: CommentType[] }) => state.comments
  );

  const currentUser = useSelector(
    (state: { current_user: CurrentUserType }) => state.current_user
  );

  const dispatch = useDispatch();

  function sendCommentHandler() {
    if (txtareaRef.current) {
      const id = comments.length + 1;
      const content = txtareaRef.current.value;
      const commentData = {
        id: id,
        content: content,
        createdAt: "now",
        score: 0,
        user: {
          image: {
            png: currentUser.image.png,
            webp: currentUser.image.webp,
          },
          username: currentUser.username,
        },
        replies: [],
      };

      content.trim().length > 0 &&
        dispatch(commentActions.comment(commentData));
      txtareaRef.current.value = "";

      // fetch(
      //   "https://interactive-comments-53ec5-default-rtdb.firebaseio.com/comments.json",
      //   {
      //     method: "POST",
      //     body: JSON.stringify(commentData),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
    }
  }

  return (
    <Card className={`${styles["add-comment"]} ${props.className || ""}`}>
      <img src={currentUser.image.png} alt="" />
      <TextArea ref={txtareaRef} />
      <ButtonCard clickEvent={sendCommentHandler}>Send</ButtonCard>
    </Card>
  );
}

export default SendComment;
