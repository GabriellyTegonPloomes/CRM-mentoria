import { UserContext } from "../../Context/userContext";
import { useContext, useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const navigate = useNavigate();

  const userInfo = useContext(UserContext);
  const { setUk } = userInfo;

  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const handleNavigate = () => {
    navigate("/clientes");
  };

  function signIn() {
    axios
      .post("https://gateway-api2.ploomes.com/Self/Login", user)
      .then((response) => {
        setUk(response.data.value[0].UserKey);
        localStorage.setItem("UK", response.data.value[0].UserKey);
        handleNavigate();
      })
      .catch(() => {
        notify();
      });
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      signIn();
    }
  };

  const notify = () => toast.error("E-mail ou senha incorretos!");

  return (
    <div className="containerLogin">
      <ToastContainer />
      <h1>Login</h1>
      <div className="contentLogin">
        <label>E-mail</label>
        <input
          onKeyDown={handleKeyPress}
          placeholder="Digite o seu e-mail"
          type="email"
          onChange={(e) => {
            setUser((prev) => ({ ...prev, Email: e.target.value }));
          }}
        ></input>
        <label>Senha</label>
        <input
          onKeyDown={handleKeyPress}
          placeholder="Digite a sua senha"
          type="password"
          onChange={(e) => {
            setUser({ ...user, Password: e.target.value });
          }}
        ></input>
        <button onKeyDown={handleKeyPress} className="login" onClick={signIn}>
          Logar
        </button>
      </div>
    </div>
  );
};
