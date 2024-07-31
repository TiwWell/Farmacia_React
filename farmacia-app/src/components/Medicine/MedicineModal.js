import Modal from "react-modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";

const MedicineModal = (props) => {
  const [medicine, setMedicine] = useState({...props.medicine});
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
  const [isAddMode, setIsAddMode] = useState(props.isAddMode);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleAction = () => {
    if (isAddMode) {
      handleCreate();
    } else {
      handleUpdate(medicine);
    }
  };

  const closeModal = () => {
    setMedicine(null);
    setIsModalOpen(false);
    props.parentCallback(false);
  };

  const handleUpdate = (medicine) => {
    try {
      // Montar o objeto remedio com os dados atualizados do estado do componente
      const remedioAtualizado = {...medicine};
      // Enviar uma requisição POST para a API com os dados do remedio atualizados
      axios
        .put(`http://localhost:8080/api/atualizar-remedio`, remedioAtualizado)
        .then((response) => {
          toast.success("Remedio atualizado com sucesso!");
        })
        .catch((error) => {
          toast.error("Erro ao atualizar remedio:", error);
        });
    } catch (error) {
      // Tratar erros de requisição
      toast.error("Erro ao atualizar remedio:", error);
      // Exibir uma mensagem de erro ao usuário
      toast.error("Erro ao atualizar remedio. Por favor, tente novamente.");
    }
  };

  const handleCreate = () => {
    try {
      // Montar o objeto remedio com os dados atualizados do estado do componente
      const novoRemedio = { ...medicine};

      // Enviar uma requisição POST para a API com os dados do remedio atualizados
      axios
        .post(`http://localhost:8080/api/adicionar-remedio`, novoRemedio)
        .then((response) => {
          toast.success("Remedio adicionado com sucesso!");
        })
        .catch((error) => {
          toast.error("Erro ao adicionar remedio:", error);
        });
    } catch (error) {
      // Tratar erros de requisição
      toast.error("Erro ao adicionar remedio:", error);
      // Exibir uma mensagem de erro ao usuário
      toast.error("Erro ao adicionar remedio. Por favor, tente novamente.");
    }
  };


  return (
    <Modal
      appElement={document.getElementById("app")}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel={isAddMode ? "Adicionar Remedio" : "Alterar Remedio"}
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
          {isAddMode ? "Novo Remedio" : "Alterar Remedio"}
        </h2>
        <form>
          <div className="form-group">
          {/* <div className="form-group col-md-6 mb-3">
              <label>Imagem</label>
              <input
                type="text"
                className="form-control"
                name="imagem"
                value={medicine.imagem}
                onChange={handleInputChange}
              />
            </div>   */}
            <div className="col-md-6 mb-3">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={medicine.nome}
                onChange={handleInputChange}
                placeholder="Nome completo"
              />
            </div>
            <div className="form-group col-md-4 mb-3">
              <label>Valor</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="valor"
                name="valor"
                value={medicine.valor}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-4 mb-3">
              <label>Quantidade</label>
              <input
                type="text"
                className="form-control"
                name="quantidade"
                value={medicine.quantidade}
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

export default MedicineModal;
