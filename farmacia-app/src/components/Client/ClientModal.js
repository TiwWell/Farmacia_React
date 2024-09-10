import Modal from "react-modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import InputMask from "react-input-mask";

const ClientModal = (props) => {
  const [client, setClient] = useState({ ...props.client });
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
  const [isAddMode, setIsAddMode] = useState(props.isAddMode);
  const [errors, setErrors] = useState({});
  const AWS_URL = process.env.REACT_APP_AWS_BACKEND_URL;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  const handleCpfCnpjChange = (event) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  const validateFields = () => {
    let validationErrors = {};
    if (!client.nome) validationErrors.nome = "Nome é obrigatório";
    if (!client.cpf_cnpj)
      validationErrors.cpf_cnpj = "CPF ou CNPJ é obrigatório";
    if (!client.telefone) validationErrors.telefone = "Telefone é obrigatório";
    if (!client.endereco) validationErrors.endereco = "Endereço é obrigatório";
    return validationErrors;
  };

  const handleAction = async (event) => { //Metodo que determina se vai adicionar ou alterar.
    event.preventDefault(); // Prevent the default form submission
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Exibir mensagens de erro
      return; // Não prosseguir se houver erros
    }

    try {
      if (isAddMode) {
        await adicionarCliente();
      } else {
        await atualizarCliente(client);
      }
    } catch (error) {
      toast.error("Erro ao salvar dados. Por favor, tente novamente.");
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
        `${AWS_URL}/api/atualizar-cliente`,
        clienteAtualizado
      );

      if (response.data.codRetorno === 201) {
        toast.success("Cliente atualizado com sucesso!");
        // Recarregar a página após 1 segundo
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Erro ao atualizar cliente:", { position: "bottom-right" });
      }
    } catch (error) {
      toast.error("Erro ao atualizar cliente. Por favor, tente novamente.", {
        position: "bottom-right",
      });
    }
  };

  const adicionarCliente = async () => {
    try {
      const response = await axios.post(
        `${AWS_URL}/api/adicionar-cliente`,
        client
      );
      toast.success("Cliente adicionado com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Erro ao adicionar cliente. Por favor, tente novamente.");
    }
  };

  const cpfCnpjMask = (value) => {
    if (value != null) {
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
        <form onSubmit={handleAction} autoComplete="off">
          <div className="form-group">
            <div className="col-md-6 mb-3">
              <label>Nome</label>
              <input
                type="text"
                className={`form-control ${errors.nome ? "is-invalid" : ""}`}
                name="nome"
                maxLength={100}
                value={client.nome || ""}
                onChange={handleInputChange}
                placeholder="Nome completo"
                autoComplete="off"
              />
              {errors.nome && (
                <div className="invalid-feedback">{errors.nome}</div>
              )}
            </div>
            <div className="form-group col-md-4 mb-3">
              <label>CPF ou CNPJ</label>
              <InputMask
                type="text"
                className={`form-control ${
                  errors.cpf_cnpj ? "is-invalid" : ""
                }`}
                value={cpfCnpjMask(client.cpf_cnpj)}
                onChange={handleCpfCnpjChange}
                name="cpf_cnpj"
                placeholder="222.333.444-05"
                autoComplete="off"
              />
              {errors.cpf_cnpj && (
                <div className="invalid-feedback">{errors.cpf_cnpj}</div>
              )}
            </div>
            <div className="form-group col-md-4 mb-3">
              <label>Telefone</label>
              <InputMask
                type="text"
                className={`form-control ${
                  errors.telefone ? "is-invalid" : ""
                }`}
                value={client.telefone || ""}
                mask="(99) 99999-9999"
                onChange={handleInputChange}
                name="telefone"
                placeholder="(11)96576-7416"
                autoComplete="off"
              />
              {errors.telefone && (
                <div className="invalid-feedback">{errors.telefone}</div>
              )}
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Endereço</label>
              <input
                type="text"
                className={`form-control ${
                  errors.endereco ? "is-invalid" : ""
                }`}
                value={client.endereco || ""}
                name="endereco"
                maxLength={200}
                onChange={handleInputChange}
                placeholder="Rua dos Imigrantes, 15"
                autoComplete="off"
              />
              {errors.endereco && (
                <div className="invalid-feedback">{errors.endereco}</div>
              )}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
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
