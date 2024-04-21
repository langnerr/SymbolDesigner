import Editor from "./Editor";
import Status from "./Status";
import Toolbar from "./Toolbar";

function App() {
  return (
    <div className="App">
      <Toolbar></Toolbar>
      <Status></Status>
      <Editor></Editor>
    </div>
  );
}

export default App;
