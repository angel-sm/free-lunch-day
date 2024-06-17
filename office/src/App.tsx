import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./sections/Main";
import Orders from "./sections/Orders";
import Purchases from "./sections/Purchases";
import Recipes from "./sections/Recipes";

function App() {
  return (
    <>
      <Navbar />
      <Main />
      <Recipes />
      <Orders />
      <Purchases />
    </>
  );
}

export default App;
