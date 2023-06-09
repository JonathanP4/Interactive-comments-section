import styles from "./TextArea.module.css";

import { Ref, forwardRef, useEffect } from "react";

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

  return (
    <div id={props.id || ""} className={styles["textarea-container"]}>
      <textarea
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
