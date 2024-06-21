import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./sections/Main";
import Orders from "./sections/Orders";
import Purchases from "./sections/Purchases";
import Recipes from "./sections/Recipes";
import { Toaster } from "sonner";

function App() {
  const [Refresh, setRefresh] = useState(false);

  return (
    <>
      {import.meta.env.RECIPES_INGREDIENTS_URL}
      <Toaster />
      <Navbar />
      <Main setRefresh={setRefresh} />
      <Recipes />
      <Orders refresh={Refresh} />
      <Purchases refresh={Refresh} />
    </>
  );
}

export default App;
