import { NavLink } from "react-router-dom";
import "./style.css";

export const Menu = () => {
  const clearUkLocalStorage = () => {
    localStorage.removeItem("UK");
  };

  return (
    <div className="containerMenu">
      <div className="contentMenu">
        <NavLink
          to={"/clientes"}
          className="linkMenu"
          activeClassName="activeMenu"
        >
          Clientes
        </NavLink>
        <NavLink
          to={"/produtos"}
          className="linkMenu"
          activeClassName="activeMenu"
        >
          Produtos
        </NavLink>
      </div>
      <NavLink
        to={"/"}
        className="linkMenuLogout"
        onClick={clearUkLocalStorage}
      >
        Sair
      </NavLink>
    </div>
  );
};
