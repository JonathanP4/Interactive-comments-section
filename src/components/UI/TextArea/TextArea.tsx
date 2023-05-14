import { Ref, forwardRef, useEffect } from "react";
import styles from "./TextArea.module.css";

const TextArea = forwardRef(function TextArea(
  props: { content: string; id?: string },
  ref: Ref<HTMLTextAreaElement>
) {
  useEffect(() => {
    const textarea = document.getElementById(
      styles.txt_area
    ) as HTMLTextAreaElement;
    const txtLength = textarea.value.length;

    textarea.focus();
    textarea.setSelectionRange(txtLength, txtLength);
  }, []);

  return (
    <div id={props.id || ""} className={styles["textarea-container"]}>
      <textarea
        id={styles.txt_area}
        cols={30}
        rows={4}
        ref={ref}
        defaultValue={props.content}
      />
    </div>
  );
});

export default TextArea;
