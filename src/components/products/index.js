import { Menu } from "../menu";
import "./style.css";
import { useAxios } from "../../http/axiosConfig";
import { useEffect, useState } from "react";

export const Products = () => {
  const [data, setData] = useState([]);
  const axios = useAxios();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 15;
  const disableNextPage = productsPerPage * currentPage > totalProducts;
  const disabledPrevPage = currentPage <= 1;

  useEffect(() => {
    axios
      .get("Products", {
        params: {
          $top: productsPerPage,
          $skip: (currentPage - 1) * productsPerPage,
          $expand: "Group($select=Id,Name),Family($select=Id,Name)",
          $count: true,
        },
      })
      .then((response) => {
        setData(response.data.value);
        setTotalProducts(response.data["@odata.count"]);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
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
    <div className="containerProducts">
      <Menu />
      <div className="contentProducts">
        <div className="titlesTablesProducts">
          <p>Nome</p>
          <p>Familia</p>
          <p>Grupo</p>
        </div>

        {data.map((produto) => {
          return (
            <div className="product">
              <p>{produto.Name}</p>
              <p>{produto.Family ? produto.Family.Name : "-"}</p>
              <p>{produto.Group ? produto.Group.Name : "*"}</p>
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
