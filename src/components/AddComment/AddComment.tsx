import styles from "./AddComment.module.css";

import TextArea from "../UI/TextArea/TextArea";
import ButtonCard from "../UI/ButtonCard/ButtonCard";
import Card from "../UI/Card/Card";

import { useRef } from "react";
import { CurrentUserType } from "../../types/types";
import { useSelector } from "react-redux";

function AddComment(props: {
  className?: string;
  text: { mention?: string; btnText: string };
  clickEvent: (content: string) => void;
}) {
  const txtareaRef = useRef<HTMLTextAreaElement>(null);
  const currentUser = useSelector(
    (state: { current_user: CurrentUserType }) => state.current_user
  );

  function clickEvent() {
    if (txtareaRef.current) {
      props.clickEvent(txtareaRef.current.value);
    }
  }

  return (
    <Card className={`${styles["add-comment"]} ${props.className || ""}`}>
      <img src={currentUser.image.png} alt="" />
      <TextArea ref={txtareaRef} />
      <ButtonCard clickEvent={clickEvent}>{props.text.btnText}</ButtonCard>
    </Card>
  );
}

export default AddComment;
