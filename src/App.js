import "./App.css";
import { UserContext } from "./Context/userContext";
import { useContext, useState } from "react";
import { Login } from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contacts } from "./components/contacts";
import { Products } from "./components/products";

function App() {
  const [uk, setUk] = useState("");

  return (
    <div className="App">
      <UserContext.Provider value={{ uk: uk, setUk: setUk }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/clientes" element={<Contacts />} />
            <Route path="/produtos" element={<Products />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
