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
        handleSelect();
    }, []);

    const handleSelect = () => {
        try {
            axios.get("http://localhost:8080/api/lista-cliente")
                .then((response) => {
                    console.log(response);
                    setListaClientes(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao obter clientes:", error);
                    toast.error("Erro no carregamento da lista de clientes. Verificar se a API está disponível.", { position: 'botton-right' });
                });

        } catch (error) {
            // Trate erros durante a configuração da solicitação
            console.error("Erro ao configurar a solicitação:", error);
            toast.error("Erro no carregamento da lista de clientes. Verificar se a API está disponível.", { position: 'botton-right' });
        }
    };


    function handleDelete(clientId) {
        axios.get(`http://localhost:8080/api/desativar-cliente/${clientId}`).then((response) => {
            toast.success("Desativado com sucesso")
            window.location.reload();
        })
    }

    const openModal = (client) => {
        setIsModalOpen(true);
        console.log('Abriu modal');
        setClient(client);
    }

    function handleUpdate(client) {
        console.log("Modal aberta");
        try {
            // Montar o objeto cliente com os dados atualizados do estado do componente
            const clienteAtualizado = {
                id: client.id,
                nome: client.nome,
                cpf_cnpj: client.cpf_cnpj,
                telefone: client.telefone,
                endereco: client.endereco,
                desativado: client.desativado
            };
            // Enviar uma requisição POST para a API com os dados do cliente atualizados
            axios.put(`http://localhost:8080/api/atualizar-cliente`, clienteAtualizado).then((response) => {
                toast.success("Cliente atualizado com sucesso!");
                console.log("Cliente atualizado", client);
            })
            .catch((error) => {
                toast.error("Erro ao atualizar cliente:", error);
            })
        } catch (error) {
            // Tratar erros de requisição
            toast.error("Erro ao atualizar cliente:", error);
            // Exibir uma mensagem de erro ao usuário
            toast.error("Erro ao atualizar cliente. Por favor, tente novamente.");
        }
        closeModal();

    };

    const closeModal = () => {
        setClient(null);
        setIsModalOpen(false);
        console.log('Fechou modal');
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
                                    <div className="col-md-6 mb-3">
                                        <label>Nome</label>
                                        <input type="text" className="form-control" defaultValue={client.nome} placeholder="Nome completo" />
                                    </div>
                                    <div className="form-group col-md-4 mb-3">
                                        <label>CPF ou CNPJ</label>
                                        <input type="text" className="form-control" defaultValue={client.cpf_cnpj} />
                                    </div>
                                    <div className="form-group col-md-4 mb-3">
                                        <label>Telefone</label>
                                        <input type="text" className="form-control" defaultValue={client.telefone} />
                                    </div>
                                    <div className="form-group col-md-6 mb-3">
                                        <label>Endereço</label>
                                        <input type="text" className="form-control" defaultValue={client.endereco} />
                                    </div>
                                    <div className='text-center'>
                                        <button type="submit" className="btn btn-primary" onClick={handleUpdate(client)}>Salvar Alterações</button>
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
