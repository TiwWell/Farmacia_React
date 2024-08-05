import Modal from "react-modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import InputMask from "react-input-mask";

const ClientModal = (props) => {
  const [client, setClient] = useState({ ...props.client });
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
  const [isAddMode, setIsAddMode] = useState(props.isAddMode);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  const handleCpfCnpjChange = (event) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  const handleAction = (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (isAddMode) {
      adicionarCliente();
    } else {
      atualizarCliente(client);
    }
  };

  const fecharModal = () => {
    setClient(null);
    setIsModalOpen(false);
    props.parentCallback(false);
  };

  const atualizarCliente = async (clienteAtualizado) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/atualizar-cliente", clienteAtualizado
      );

      if (response.data.codRetorno === 201) {
        toast.success("Cliente atualizado com sucesso!");
        // Recarregar a página após 1 segundo
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(
          "Erro ao atualizar cliente:",
          { position: "bottom-right" }
        );
      }
    } catch (error) {
      toast.error(
        "Erro ao atualizar cliente. Por favor, tente novamente.",
        { position: "bottom-right" }
      );
    }
  };

  const adicionarCliente = () => {
    try {
      // Montar o objeto cliente com os dados atualizados do estado do componente
      const novoCliente = { ...client };

      // Enviar uma requisição POST para a API com os dados do cliente atualizados
      axios
        .post(`http://localhost:8080/api/adicionar-cliente`, novoCliente)
        .then((response) => {
          toast.success("Cliente adicionado com sucesso!");
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

  const cpfCnpjMask = (value) => {
    const cleanedValue = value.toString().replace(/\D/g, "");
    if (cleanedValue.length <= 11) {
      return value
        .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    } else {
      return value
        .replace(/\D+/g, "") // não deixa ser digitado nenhuma letra
        .replace(/(\d{2})(\d)/, "$1.$2") // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2") // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1"); // captura os dois últimos 2 números, com um - antes dos dois números
    }
  };

  return (
    <Modal
      appElement={document.getElementById("app")}
      isOpen={isModalOpen}
      onRequestClose={fecharModal}
      contentLabel={isAddMode ? "Adicionar Cliente" : "Alterar Cliente"}
      className="custom-modal"
    >
      <div>
        <button
          type="button"
          className="btn-close"
          aria-label="Fechar"
          onClick={fecharModal}
        />
        <h2 className="text-center">
          {isAddMode ? "Novo Cliente" : "Alterar Cliente"}
        </h2>
        <form onSubmit={handleAction}>
          <div className="form-group">
            <div className="col-md-6 mb-3">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                maxLength={100}
                value={client.nome || ""}
                onChange={handleInputChange}
                placeholder="Nome completo"
              />
            </div>
            <div className="form-group col-md-4 mb-3">
              <label>CPF ou CNPJ</label>
              <InputMask
                type="text"
                className="form-control"
                value={cpfCnpjMask(client.cpf_cnpj)}
                onChange={handleCpfCnpjChange}
                name="cpf_cnpj"
              />
            </div>
            <div className="form-group col-md-4 mb-3">
              <label>Telefone</label>
              <InputMask
                type="text"
                className="form-control"
                value={client.telefone || ""}
                mask="(99) 99999-9999"
                onChange={handleInputChange}
                name="telefone"
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Endereço</label>
              <input
                type="text"
                className="form-control"
                value={client.endereco || ""}
                name="endereco"
                maxLength={200}
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
