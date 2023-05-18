import { Ref, forwardRef, useEffect } from "react";
import styles from "./TextArea.module.css";

const TextArea = forwardRef(function TextArea(
  props: { content?: string; id?: string },
  ref: Ref<HTMLTextAreaElement>
) {
  useEffect(() => {
    const textarea = document.getElementById(
      styles.txt_area
    ) as HTMLTextAreaElement;
    const txtLength = textarea.value.length;

    props.content && textarea.focus();

    textarea.setSelectionRange(txtLength, txtLength);
  }, [props.content]);
  async function firebaseTest() {
    const data = {
      test: "Lorem ipsum dolor",
    };
    fetch(
      "https://interactive-comments-53ec5-default-rtdb.firebaseio.com/test",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
  }

  return (
    <div id={props.id || ""} className={styles["textarea-container"]}>
      <textarea
        onClick={firebaseTest}
        aria-label="text area"
        id={styles.txt_area}
        cols={30}
        rows={3}
        ref={ref}
        defaultValue={props.content || ""}
      />
    </div>
  );
});

export default TextArea;
