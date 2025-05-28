import "./App.css";
import Navbar from "./components/Navbar";
import TodoList from "./components/Todo";

function App() {
  return (
    <>
      <Navbar />
      {/* <section className="todo-container"> */}
      <TodoList />
      {/* </section> */}
    </>
  );
}

export default App;
