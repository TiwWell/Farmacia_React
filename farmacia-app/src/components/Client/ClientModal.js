import Modal from "react-modal";
import { toast } from 'react-hot-toast';
import axios from "axios";
import React, { useState } from "react";


const ClientModal = (props) => {
    const [client, setClient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log("props: " + props)

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setClient({ ...client, [name]: value }); 
    // };

    // const closeModal = () => {
    //     setClient(null);
    //     setIsModalOpen(false);
    // };

    // const handleUpdate = (client) => {
    //     console.log("Modal aberta");
    //     try {
    //         // Montar o objeto cliente com os dados atualizados do estado do componente
    //         const clienteAtualizado = {
    //             id: client.id,
    //             nome: client.nome,
    //             cpf_cnpj: client.cpf_cnpj,
    //             telefone: client.telefone,
    //             endereco: client.endereco,
    //             desativado: client.desativado
    //         };
    //         // Enviar uma requisição POST para a API com os dados do cliente atualizados
    //         axios.put(`http://localhost:8080/api/atualizar-cliente`, clienteAtualizado).then((response) => {
    //             toast.success("Cliente atualizado com sucesso!");
    //             console.log("Cliente atualizado", client);
    //         })
    //             .catch((error) => {
    //                 toast.error("Erro ao atualizar cliente:", error);
    //             })
    //     } catch (error) {
    //         // Tratar erros de requisição
    //         toast.error("Erro ao atualizar cliente:", error);
    //         // Exibir uma mensagem de erro ao usuário
    //         toast.error("Erro ao atualizar cliente. Por favor, tente novamente.");
    //     }
    // };


    return (
        <>
        </>
    // <Modal
    //     isOpen={isModalOpen}
    //     onRequestClose={closeModal}
    //     contentLabel="Alterar Cliente"
    //     className="custom-modal"
    // >
    //     <div>
    //         <button type="button" className="btn-close" aria-label="Fechar" onClick={closeModal} />
    //         <h2 className='text-center'>Alterar Cliente</h2>
    //         {client && (
    //             <form>
    //                 <div className="form-group">
    //                     <div className="col-md-6 mb-3">
    //                         <label>Nome</label>
    //                         <input type="text" className="form-control" name="nome" value={client.nome} onChange={handleInputChange} placeholder="Nome completo" />
    //                     </div>
    //                     <div className="form-group col-md-4 mb-3">
    //                         <label>CPF ou CNPJ</label>
    //                         <input
    //                             type="text" className="form-control" name="cpf_cnpj" value={client.cpf_cnpj} onChange={handleInputChange} />
    //                     </div>
    //                     <div className="form-group col-md-4 mb-3">
    //                         <label>Telefone</label>
    //                         <input type="text" className="form-control" name="telefone" value={client.telefone} onChange={handleInputChange} />
    //                     </div>
    //                     <div className="form-group col-md-6 mb-3">
    //                         <label>Endereço</label>
    //                         <input type="text" className="form-control" name="endereco" value={client.endereco} onChange={handleInputChange} />
    //                     </div>
    //                     <div className="form-group col-md-6 mb-3">
    //                         <label>Desativado</label>
    //                         <input type="text" className="form-control" name="desativado" value={client.desativado} onChange={handleInputChange} />
    //                     </div>
    //                     <div className='text-center'>
    //                         <button type="submit" className="btn btn-primary" onClick={() => handleUpdate(client)}>Salvar Alterações</button>
    //                     </div>
    //                 </div>
    //             </form>
    //         )}
    //     </div>
    // </Modal>
    );

};

export default ClientModal;