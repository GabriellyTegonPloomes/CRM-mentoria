import { UserContext } from "../../Context/userContext";
import { useContext, useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const userInfo = useContext(UserContext);
  const { uk, setUk } = userInfo;

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
        console.log(uk);
        handleNavigate();
      });
  }

  return (
    <div className="containerLogin">
      <h1>Login</h1>
      <div className="contentLogin">
        <label>E-mail</label>
        <input
          placeholder="Digite o seu e-mail"
          type="email"
          onChange={(e) => {
            setUser((prev) => ({ ...prev, Email: e.target.value }));
          }}
        ></input>
        <label>Senha</label>
        <input
          placeholder="Digite a sua senha"
          type="password"
          onChange={(e) => {
            setUser({ ...user, Password: e.target.value });
          }}
        ></input>
        <button className="login" onClick={signIn}>
          Logar
        </button>
      </div>
    </div>
  );
};
