import { useContext, useRef } from "react";
import styles from "./AddComment.module.css";
import TextArea from "../UI/TextArea/TextArea";
import ButtonCard from "../UI/ButtonCard/ButtonCard";
import Card from "../UI/Card/Card";
import { Data } from "../../store/DataProvider";

function AddComment(props: {
  className?: string;
  text: { mention?: string; btnText: string };
  clickEvent: (content: string) => void;
}) {
  const ctx = useContext(Data);
  const txtareaRef = useRef<HTMLTextAreaElement>(null);

  function replyHandler() {
    const value = txtareaRef.current?.value;
    if (props.text.mention && value && value?.includes(props.text.mention)) {
      const matchMention = value.match(`@${props.text.mention}`)!;
      const updatedValue = value.replaceAll(matchMention[0], "").trim();

      updatedValue.length > 0 && props.clickEvent(updatedValue);
    } else if (value && value?.trim().length > 0) {
      value && props.clickEvent(value);
    }
  }

  return (
    <Card className={`${styles["add-comment"]} ${props.className || ""}`}>
      <img src={ctx.current_user.image.png} alt="" />
      <TextArea ref={txtareaRef} content={props.text.mention} />
      <ButtonCard clickEvent={replyHandler}>{props.text.btnText}</ButtonCard>
    </Card>
  );
}

export default AddComment;
