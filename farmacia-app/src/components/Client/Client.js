import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from 'react-hot-toast';
import './Client.css';

const Client = () => {
    const [client, setClient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listaClientes, setListaClientes] = useState(null);

    useEffect(() => {
        fetchData();
    });

    const fetchData = () => {
        try {
            axios.get("http://localhost:8080/api/lista-cliente")
                .then((response) => {
                    console.log(response);
                    setListaClientes(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao obter clientes:", error);
                    toast.error("Erro no carregamento da lista de clientes. Verificar se a API está disponível.");
                });

        } catch (error) {
            // Trate erros durante a configuração da solicitação
            console.error("Erro ao configurar a solicitação:", error);
            toast.error("Erro no carregamento da lista de clientes.");
        }
    };


    function handleDelete(clientId) {
        axios.get(`http://localhost:8080/api/desativar-cliente/${clientId}`).then((response) => {
            alert("Desativado com sucesso")
            window.location.reload();
        })
    }

    const openModal = (client) => {
        setClient(client);
        setIsModalOpen(true);
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
                            <tr key={client.id}>
                                <td className="nome">
                                    <h4>{client.nome}</h4>
                                </td>
                                <td className="nome" width={300}>
                                    <h4>{client.cpf_cnpj}</h4>
                                </td>
                                <td className="nome" width={250}>
                                    <h4>{client.telefone}</h4>
                                </td>
                                <td className="nome" width={350}>
                                    <h4>{client.endereco}</h4>
                                </td>
                                <td className="nome" width={200}>
                                    <button type="button" className="btn btn-primary me-1" onClick={() => openModal(client)}>Alterar</button>
                                    {client.desativado === 0 ?
                                        <button type="submit" className="btn btn-danger" onClick={() => handleDelete(client.id)}>Desativar</button> :
                                        <button type="submit" className="btn btn-secondary">Desativado</button>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </thead>
            </table>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Alterar Cliente"
                    className="custom-modal"
                >
                    <div>
                        <button type="button" className="btn-close" aria-label="Fechar" onClick={closeModal} />
                        <h2 className='text-center'>Alterar Cliente</h2>
                        {client && (
                            <form>
                                <div className="form-group">
                                    <div class="col-md-6 mb-3">
                                        <label>Nome</label>
                                        <input type="text" class="form-control" defaultValue={client.nome} placeholder="Nome completo" />
                                    </div>
                                    <div class="form-group col-md-4 mb-3">
                                        <label>CPF ou CNPJ</label>
                                        <input type="text" class="form-control" defaultValue={client.cpf_cnpj} />
                                    </div>
                                    <div class="form-group col-md-4 mb-3">
                                        <label>Telefone</label>
                                        <input type="text" class="form-control" defaultValue={client.telefone} />
                                    </div>
                                    <div class="form-group col-md-6 mb-3">
                                        <label>Endereço</label>
                                        <input type="text" class="form-control" defaultValue={client.endereco} />
                                    </div>
                                    <div className='text-center'>
                                        <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
};

export default Client;
