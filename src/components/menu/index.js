import { NavLink } from "react-router-dom";
import "./style.css";

export const Menu = () => {
  return (
    <div className="containerMenu">
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
  );
};
