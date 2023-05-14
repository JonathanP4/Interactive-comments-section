import { useContext, useRef } from "react";
import styles from "./AddComment.module.css";
import Data from "../../store/data-context";
import TextArea from "../UI/TextArea/TextArea";
import ButtonCard from "../UI/ButtonCard/ButtonCard";
import Card from "../UI/Card/Card";
import { Actions } from "../Comment/Comment";

function AddComment(props: {
  className?: string;
  mention: string;
  clickEvent: (action: Actions, content: string) => void;
}) {
  const ctx = useContext(Data);
  const txtareaRef = useRef<HTMLTextAreaElement>(null);

  function replyHandler() {
    const value = txtareaRef.current?.value;
    if (value?.includes(props.mention)) {
      const matchMention = value.match(`@${props.mention}`)!;
      const updatedValue = value.replaceAll(matchMention[0], "").trim();

      updatedValue.length > 0 && props.clickEvent("REPLY", updatedValue);
    } else {
      value && props.clickEvent("REPLY", value);
    }
  }

  return (
    <Card className={`${styles["add-comment"]} ${props.className || ""}`}>
      <img src={ctx.current_user.image.png} alt="" />
      <TextArea ref={txtareaRef} content={`@${props.mention} `} />
      <ButtonCard clickEvent={replyHandler}>Reply</ButtonCard>
    </Card>
  );
}

export default AddComment;
