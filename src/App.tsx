import "./App.css";
import Comments from "./components/Comments/Comments";
import DataProvider from "./store/DataProvider";

function App() {
  return (
    <main>
      <DataProvider>
        <Comments />
      </DataProvider>
    </main>
  );
}

export default App;
