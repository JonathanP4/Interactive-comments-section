import { useContext, useState } from "react";
import "./App.css";
import AddComment from "./components/AddComment/AddComment";
import Comments from "./components/Comments/Comments";
import DataProvider, { Data } from "./store/DataProvider";

function App() {
  const ctx = useContext(Data);
  const [, setState] = useState(false);
  function clickHandler(content: string) {
    const el = document.querySelector(
      ".send-comment-card textarea"
    ) as HTMLTextAreaElement;
    const newId = ctx.comments.length + 1;
    ctx.comments.push({
      id: newId,
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
    });
    ctx.update({
      comments: ctx.comments,
      currentUser: ctx.current_user,
    });
    el.value = "";
    setState((state) => !state);
  }
  return (
    <main>
      <DataProvider>
        <h1 className="hidden-heading">Interactive Comments Section</h1>
        <Comments />
        <AddComment
          clickEvent={clickHandler}
          text={{ btnText: "send" }}
          className="send-comment-card"
        />
      </DataProvider>
    </main>
  );
}

export default App;
