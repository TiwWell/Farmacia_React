import Modal from "react-modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";

const PharmaceuticalModal = (props) => {
  const [pharmaceutical, setPharmaceutical] = useState({...props.pharmaceutical});
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
  const [isAddMode, setIsAddMode] = useState(props.isAddMode);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPharmaceutical({ ...pharmaceutical, [name]: value });
  };

  const handleAction = () => {
    if (isAddMode) {
      handleCreate();
    } else {
      handleUpdate(pharmaceutical);
    }
  };

  const closeModal = () => {
    setPharmaceutical(null);
    setIsModalOpen(false);
    props.parentCallback(false);
  };

  const handleUpdate = (pharmaceutical) => {
    console.log("Modal aberta");
    try {
      // Montar o objeto farmaceutico com os dados atualizados do estado do componente
      const pharmaceuticalAtualizado = {...pharmaceutical};
      // Enviar uma requisição POST para a API com os dados do farmaceutico atualizados
      axios
        .put(`http://localhost:8080/api/atualizar-farmaceutico`, pharmaceuticalAtualizado)
        .then((response) => {
          toast.success("Farmaceutico atualizado com sucesso!");
          console.log("Farmaceutico atualizado", pharmaceutical);
        })
        .catch((error) => {
          toast.error("Erro ao atualizar farmaceutico:", error);
        });
    } catch (error) {
      // Tratar erros de requisição
      toast.error("Erro ao atualizar farmaceutico:", error);
      // Exibir uma mensagem de erro ao usuário
      toast.error("Erro ao atualizar farmaceutico. Por favor, tente novamente.");
    }
  };

  const handleCreate = () => {
    console.log("Modal aberta");
    try {
      // Montar o objeto farmaceutico com os dados atualizados do estado do componente
      const novoPharmaceutical = { ...pharmaceutical};

      console.log(pharmaceutical);
      // Enviar uma requisição POST para a API com os dados do farmaceutico atualizados
      axios
        .post(`http://localhost:8080/api/adicionar-farmaceutico`, novoPharmaceutical)
        .then((response) => {
          toast.success("Farmaceutico adicionado com sucesso!");
          console.log("Farmaceutico adicionado", pharmaceutical);
        })
        .catch((error) => {
          toast.error("Erro ao adicionar farmaceutico:", error);
        });
    } catch (error) {
      // Tratar erros de requisição
      toast.error("Erro ao adicionar farmaceutico:", error);
      // Exibir uma mensagem de erro ao usuário
      toast.error("Erro ao adicionar farmaceutico. Por favor, tente novamente.");
    }
  };


  return (
    <Modal
      appElement={document.getElementById("app")}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel={isAddMode ? "Adicionar Farmaceutico" : "Alterar Farmaceutico"}
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
          {isAddMode ? "Novo Farmaceutico" : "Alterar Farmaceutico"}
        </h2>
        <form>
          <div className="form-group">
            <div className="col-md-6 mb-3">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={pharmaceutical.nome}
                onChange={handleInputChange}
                placeholder="Nome completo"
              />
            </div>
            <div className="form-group col-md-4 mb-3">
              <label>CPF ou CNPJ</label>
              <input
                type="text"
                className="form-control"
                name="cpf_cnpj"
                value={pharmaceutical.cpf_cnpj}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-4 mb-3">
              <label>CRF</label>
              <input
                type="text"
                className="form-control"
                name="crf"
                value={pharmaceutical.crf}
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

export default PharmaceuticalModal;
