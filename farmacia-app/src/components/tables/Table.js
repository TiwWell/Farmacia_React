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
    function handleDelete(clientId) {
        axios.get(`http://localhost:8080/api/desativar-cliente/${clientId}`).then((response) => {
            alert("Desativado com sucesso")

            window.location.reload();
        })
    }

    return (
        <table className="table table-light w-75 mx-auto">
            <thead>
                <tr className="text-center">
                    <th>Nome</th>
                    <th>CPF CNPJ</th>
                    <th>Telefone</th>
                    <th>Endereco</th>
                    <th>Ações</th>
                </tr>
                {listaClientes.map((client) => {
                    return (
                        <tr key={client.id}>
                            <td widht={350}>
                                <h4>{client.nome}</h4>
                            </td>
                            <td width={300}>
                                <h4>{client.cpf_cnpj}</h4>
                            </td>
                            <td width={250}>
                                <h4>{client.telefone}</h4>
                            </td>
                            <td width={350}>
                                <h4>{client.endereco}</h4>
                            </td>
                            <td width={200}>
                                <button type="button" className="btn btn-primary me-1">Alterar</button>
                                {client.desativado == 0?
                                    <button type="submit" className="btn btn-danger" onClick={() => handleDelete(client.id)}>Desativar</button> :
                                    <button type="submit" className="btn btn-secondary">Desativado</button>
                                }
                            </td>
                        </tr>
                    );
                })}
            </thead>
        </table>
    );
}

export default Table;
