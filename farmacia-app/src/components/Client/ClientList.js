import axios from "axios";
import React, { useState } from "react";
import ClientForm from './ClientForm.js';

const Table = ({clients }) => {

    const [client, setClient] = useState(null);
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [listaClientes, setListaClientes] = React.useState(null);

    React.useEffect(() => {
        axios.get("http://localhost:8080/api/lista-cliente").then((response) => {
            setListaClientes(response.data);

            console.log(response);
        });
    }, []);


    function handleDelete(clientId) {
        axios.get(`http://localhost:8080/api/desativar-cliente/${clientId}`).then((response) => {
            alert("Desativado com sucesso")

            window.location.reload();
        })
    }
    function handleForm() {
        setOpen(true);
    }


    const openModal = (client) => {
        setClient(client);
        setIsModalOpen(true);
        console.log(client);
        console.log(isModalOpen);
    };

    const closeModal = () => {
        setClient(null);
        setIsModalOpen(false);
    };


    if (!listaClientes) return null;
    return (
        <>
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
                            <>
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
                                        <button type="button" className="btn btn-primary me-1" onClick={() => openModal(client)}>Alterar</button>
                                        {client.desativado == 0 ?
                                            <button type="submit" className="btn btn-danger" onClick={() => handleDelete(client.id)}>Desativar</button> :
                                            <button type="submit" className="btn btn-secondary">Desativado</button>
                                        }
                                    </td>
                                </tr>
                                {/* <ClientForm open={open} /> */}
                            </>
                        );
                    })}
                </thead>
            </table>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Alterar Cliente</h2>
                        {/* Aqui você renderiza os campos de edição com base no cliente selecionado */}
                        {client && (
                            <form>
                                <label>
                                    Nome:
                                    <input type="text" defaultValue={client.name} />
                                </label>
                                <button type="submit">Salvar Alterações</button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Table;
