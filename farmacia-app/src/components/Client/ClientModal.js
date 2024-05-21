import Modal from "react-modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import InputMask from "react-input-mask";

const ClientModal = (props) => {
  const [client, setClient] = useState({ ...props.client });
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
  const [isAddMode, setIsAddMode] = useState(props.isAddMode);
  const [maskcpfCnpj, setmaskcpfCnpj] = useState("99999999999999");
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  const handleCpfCnpjChange = (event) => {
    // console.log(event.target.value.replace(/[^0-9]/g, "").length);
    // if(event.target.value.replace(/[^0-9]/g, "").length == 11){
    //   setmaskcpfCnpj("999.999.999-99")
    //   console.log(maskcpfCnpj);
    // }
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });

  };


  const handleAction = () => {
    if (isAddMode) {
      handleCreate();
    } else {
      handleUpdate(client);
    }
  };

  const closeModal = () => {
    setClient(null);
    setIsModalOpen(false);
    props.parentCallback(false);
  };

  const handleUpdate = (client) => {
    console.log("Modal aberta");
    try {
      // Montar o objeto cliente com os dados atualizados do estado do componente
      const clienteAtualizado = { ...client };
      // Enviar uma requisição POST para a API com os dados do cliente atualizados
      axios
        .put(`http://localhost:8080/api/atualizar-cliente`, clienteAtualizado)
        .then((response) => {
          toast.success("Cliente atualizado com sucesso!");
          console.log("Cliente atualizado", client);
        })
        .catch((error) => {
          toast.error("Erro ao atualizar cliente:", error);
        });
    } catch (error) {
      // Tratar erros de requisição
      toast.error("Erro ao atualizar cliente:", error);
      // Exibir uma mensagem de erro ao usuário
      toast.error("Erro ao atualizar cliente. Por favor, tente novamente.");
    }
  };

  const handleCreate = () => {
    console.log("Modal aberta");
    try {
      // Montar o objeto cliente com os dados atualizados do estado do componente
      const novoCliente = { ...client };

      console.log(client);
      // Enviar uma requisição POST para a API com os dados do cliente atualizados
      axios
        .post(`http://localhost:8080/api/adicionar-cliente`, novoCliente)
        .then((response) => {
          toast.success("Cliente adicionado com sucesso!");
          console.log("Cliente adicionado", client);
        })
        .catch((error) => {
          toast.error("Erro ao adicionar cliente:", error);
        });
    } catch (error) {
      // Tratar erros de requisição
      toast.error("Erro ao adicionar cliente:", error);
      // Exibir uma mensagem de erro ao usuário
      toast.error("Erro ao adicionar cliente. Por favor, tente novamente.");
    }
  };

  return (
    <Modal
      appElement={document.getElementById("app")}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel={isAddMode ? "Adicionar Cliente" : "Alterar Cliente"}
      className="custom-modal"
    >
      <div>
        <button
          type="button"
          className="btn-close"
          aria-label="Fechar"
          onClick={closeModal}
        />
        <h2 className="text-center">
          {isAddMode ? "Novo Cliente" : "Alterar Cliente"}
        </h2>
        <form>
          <div className="form-group">
            <div className="col-md-6 mb-3">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                maxLength={100}
                value={client.nome}
                onChange={handleInputChange}
                placeholder="Nome completo"
              />
            </div>
            <div className="form-group col-md-4 mb-3">
              <label>CPF ou CNPJ</label>
              <InputMask
                mask={maskcpfCnpj}
                value={client.cpf_cnpj}
                onChange={handleCpfCnpjChange}                
                type="text"
                className="form-control"
                name="cpf_cnpj"
              />
            </div>
            <div className="form-group col-md-4 mb-3">
              <label>Telefone</label>
              <InputMask
                mask="(99) 99999-9999"
                value={client.telefone}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                name="telefone"
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Endereço</label>
              <input
                type="text"
                className="form-control"
                name="endereco"
                maxLength={200}
                value={client.endereco}
                onChange={handleInputChange}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleAction}
              >
                {isAddMode ? "Salvar Novo" : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ClientModal;
