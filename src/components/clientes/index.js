import { Menu } from "../menu";
import "./style.css";
import { UserContext } from "../../Context/userContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

export const Clientes = () => {
  const userInfo = useContext(UserContext);
  const { uk, setUk } = userInfo;
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 15;

  useEffect(() => {
    axios
      .get("https://api2-s05-app.ploomes.com/Contacts", {
        headers: { "user-key": uk },
        params: {
          $top: clientsPerPage,
          $skip: (currentPage - 1) * clientsPerPage,
        },
      })
      .then((response) => {
        setData(response.data.value);
        console.log(response);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      });
  }, [currentPage]);

  const nextPage = () => {
    //verificar qual o total de clientes, se não ele vai dar um skip maior
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="containerClientes">
      <Menu />
      <div className="contentClientes">
        <div className="titulos">
          <p>Nome</p>
          <p>Data de criação</p>
          <p>Tipo</p>
        </div>

        {data.map((cliente) => {
          return (
            <div className="clienteItem">
              <p>{cliente.Name}</p>
              <p>{new Date(cliente.CreateDate).toLocaleDateString("pt-BR")}</p>
              <p className={cliente.TypeId === 1 ? "empresa" : "pessoa"}>
                {cliente.TypeId === 1 ? "Empresa" : "Pessoa"}
              </p>
            </div>
          );
        })}
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            {"<"} Anterior
          </button>
          <p>{currentPage}</p>
          <button onClick={nextPage}>Próxima {">"}</button>
        </div>
      </div>
    </div>
  );
};
