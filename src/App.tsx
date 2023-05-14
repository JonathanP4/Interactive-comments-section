import "./App.css";
import AddComment from "./components/AddComment/AddComment";
import Comments from "./components/Comments/Comments";
import DataProvider from "./store/DataProvider";

function App() {
  function clickHandler() {
    console.log("click");
  }
  return (
    <main>
      <DataProvider>
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
