import "./App.css";
import Comments from "./components/Comments/Comments";
import DataProvider from "./context/DataProvider";
import SendComment from "./components/SendComment/SendComment";

function App() {
  return (
    <main>
      <DataProvider>
        <h1 className="hidden-heading">Interactive Comments Section</h1>
        <Comments />
        <SendComment className="send-comment-card" />
      </DataProvider>
    </main>
  );
}

export default App;
