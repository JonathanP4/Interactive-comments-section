import { useContext, useRef } from "react";
import styles from "./SendComment.module.css";
import TextArea from "../UI/TextArea/TextArea";
import ButtonCard from "../UI/ButtonCard/ButtonCard";
import Card from "../UI/Card/Card";
import { DataContext } from "../../context/data-context";

function SendComment(props: { className?: string }) {
  const ctx = useContext(DataContext);
  const txtareaRef = useRef<HTMLTextAreaElement>(null);

  function clickEvent() {
    if (txtareaRef.current) {
      const id = ctx.comments.length + 1;
      const content = txtareaRef.current.value;
      const data = {
        id: id,
        content: content,
        createdAt: "now",
        score: 0,
        user: {
          image: {
            png: ctx.current_user.image.png,
            webp: ctx.current_user.image.webp,
          },
          username: ctx.current_user.username,
        },
        replies: [],
      };
      content.trim().length > 0 && ctx.send(content);
      txtareaRef.current.value = "";
      fetch(
        "https://interactive-comments-53ec5-default-rtdb.firebaseio.com/comments",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  return (
    <Card className={`${styles["add-comment"]} ${props.className || ""}`}>
      <img src={ctx.current_user.image.png} alt="" />
      <TextArea ref={txtareaRef} />
      <ButtonCard clickEvent={clickEvent}>Send</ButtonCard>
    </Card>
  );
}

export default SendComment;
