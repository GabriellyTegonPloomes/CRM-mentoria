import { Menu } from "../menu";
import "./style.css";
import { useState, useEffect } from "react";
import { useAxios } from "../../http/axiosConfig";

export const Contacts = () => {
  const [data, setData] = useState([]);
  const axios = useAxios();

  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 15;
  const [totalContacts, setTotalContacts] = useState(0);
  const disableNextPage = clientsPerPage * currentPage > totalContacts;
  const disabledPrevPage = currentPage <= 1;

  useEffect(() => {
    axios
      .get("Contacts", {
        params: {
          $top: clientsPerPage,
          $skip: (currentPage - 1) * clientsPerPage,
          $count: true,
        },
      })
      .then((response) => {
        setData(response.data.value);
        setTotalContacts(response.data["@odata.count"]);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      });
  }, [currentPage]);

  const nextPage = () => {
    if (disableNextPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (disabledPrevPage) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="containerContacts">
      <Menu />
      <div className="contentContacts">
        <div className="titlesTablesContacts">
          <p>Nome</p>
          <p>Data de criação</p>
          <p>Tipo</p>
        </div>

        {data.map((contact) => {
          return (
            <div className="contact">
              <p>{contact.Name}</p>
              <p>{new Date(contact.CreateDate).toLocaleDateString("pt-BR")}</p>
              <p className={contact.TypeId === 1 ? "company" : "person"}>
                {contact.TypeId === 1 ? "Empresa" : "Pessoa"}
              </p>
            </div>
          );
        })}
        <div className="pagination">
          <button onClick={prevPage} disabled={disabledPrevPage}>
            {"<"} Anterior
          </button>
          <p>{currentPage}</p>
          <button onClick={nextPage} disabled={disableNextPage}>
            Próxima {">"}
          </button>
        </div>
      </div>
    </div>
  );
};
