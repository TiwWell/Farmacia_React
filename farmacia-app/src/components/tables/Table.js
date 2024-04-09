import axios from "axios";
import React from "react";

function Table() {
  const [listaClientes, setListaClientes] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://localhost:8080/api/lista-cliente").then((response) => {
      setListaClientes(response.data);

      console.log(response);
    });
  }, []);

  if (!listaClientes) return null;

  return (
    <table className="table table-light w-50 mx-auto">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF CNPJ</th>
        </tr>
        {listaClientes.map((cliente) => {
          return (
            <tr>
              <td>
                <h3>{cliente.nome}</h3>
              </td>
              <td>
                <h3>{cliente.cpf_cnpj}</h3>
              </td>
            </tr>
          );
        })}
      </thead>
    </table>
  );
}

export default Table;
