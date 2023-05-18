import { useContext, useRef } from "react";
import styles from "./AddComment.module.css";
import TextArea from "../UI/TextArea/TextArea";
import ButtonCard from "../UI/ButtonCard/ButtonCard";
import Card from "../UI/Card/Card";
import { DataContext } from "../../context/data-context";

function AddComment(props: {
  className?: string;
  text: { mention?: string; btnText: string };
  clickEvent: (content: string) => void;
}) {
  const ctx = useContext(DataContext);
  const txtareaRef = useRef<HTMLTextAreaElement>(null);

  function clickEvent() {
    if (txtareaRef.current) {
      props.clickEvent(txtareaRef.current.value);
    }
  }

  return (
    <Card className={`${styles["add-comment"]} ${props.className || ""}`}>
      <img src={ctx.current_user.image.png} alt="" />
      <TextArea ref={txtareaRef} />
      <ButtonCard clickEvent={clickEvent}>{props.text.btnText}</ButtonCard>
    </Card>
  );
}

export default AddComment;
