import "./App.css";

import Comments from "./components/Comments/Comments";
import SendComment from "./components/SendComment/SendComment";

import { Provider } from "react-redux";

import store from "./store/comments";

function App() {
  return (
    <main>
      <Provider store={store}>
        <h1 className="hidden-heading">Interactive Comments Section</h1>
        <Comments />
        <SendComment className="send-comment-card" />
      </Provider>
    </main>
  );
}

export default App;
