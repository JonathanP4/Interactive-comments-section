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

  // function clickEvent() {
  //   if (txtareaRef.current) {
  //     props.clickEvent(txtareaRef.current.value);
  //   }
  // }

  async function firebaseTest() {
    const data = {
      test: txtareaRef.current!.value,
    };
    fetch(
      "https://interactive-comments-53ec5-default-rtdb.firebaseio.com/any.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  return (
    <Card className={`${styles["add-comment"]} ${props.className || ""}`}>
      <img src={ctx.current_user.image.png} alt="" />
      <TextArea
        ref={txtareaRef}
        content={props.text.mention && `@${props.text.mention} `}
      />
      <ButtonCard clickEvent={firebaseTest}>{props.text.btnText}</ButtonCard>
    </Card>
  );
}

export default AddComment;
