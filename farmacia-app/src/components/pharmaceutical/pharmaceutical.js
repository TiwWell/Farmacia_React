import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "./pharmaceutical.css";
import PharmaceuticalModal from "./pharmaceuticoModal";

const Pharmaceutical = () => {
  const [pharmaceutical, setPharmaceutical] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaPharmaceuticals, setListaPharmaceuticals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    listarFarmaceuticos();
  }, []);

  const listarFarmaceuticos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/listar-farmaceutico"
      );
      if (response.data.codRetorno === 200) {
        console.log(response.data);
        setListaPharmaceuticals(response.data.listaFarmaceuticos);
      } else {
        toast.error(
          "Erro no carregamento da lista de farmaceuticos. Verificar se a API está disponível.",
          { position: "bottom-right" }
        );
      }
    } catch (error) {
      console.error("Erro ao configurar a solicitação:", error);
      toast.error(
        "Erro no carregamento da lista de farmaceuticos. Verificar se a API está disponível.",
        { position: "botton-right" }
      );
    }
  };

  const inverterFarmaceutico = async (idFarmaceutico) => {
    try {
      await axios.get(
        `http://localhost:8080/api/inverter-status-farmaceutico/${idFarmaceutico}`
      );
      toast.success("Status do farmaceuticos invertido com sucesso");
      listarFarmaceuticos(); // Recarrega a lista de farmaceuticos após a inversão de status
    } catch (error) {
      console.error("Erro ao inverter status do farmaceutico:", error);
      toast.error(
        "Erro ao inverter o status do farmaceuticos. Verificar se a API está disponível.",
        { position: "bottom-right" }
      );
    }
  };

  const abrirModal = (pharmaceutical, isAddMode) => {
    setIsModalOpen(true);
    setPharmaceutical(pharmaceutical);
    setIsAddMode(isAddMode);
  };

  const handleCallback = (childData) => {
    setIsModalOpen(childData);
  };

  function formatarCPF(cpf) {
    return cpf
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona ponto
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona ponto
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona hífen
  }

  function formatarCNPJ(cnpj) {
    return cnpj
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/(\d{2})(\d)/, "$1.$2") // Adiciona ponto
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona ponto
      .replace(/(\d{3})(\d)/, "$1/$2") // Adiciona barra
      .replace(/(\d{4})(\d{2})$/, "$1-$2"); // Adiciona hífen
  }

  const filteredPharmaceuticals = listaPharmaceuticals
    .sort((a, b) => a.id - b.id)
    .filter((client) =>
      client.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  if (!listaPharmaceuticals.length) return null;

  return (
    <>
      <div className="title container w-75 mx-auto mb-3">
        <h1>Lista de Farmaceuticos</h1>
      </div>
      <div>
        <button
          type="submit"
          className="Btn custom-button"
          onClick={() => abrirModal()}
        >
          <div className="sign">+</div>

          <div className="text">Adicionar</div>
        </button>
      </div>
      <div className="search-container w-75 mx-auto mb-3 wrapper">
        <div className="icon"></div>
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-container w-75 mx-auto">
        <table className="table table-light table-bordered table-hover w-75 mx-auto">
          <thead>
            <tr className="text-center">
              <th>Id</th>
              <th>Nome</th>
              <th>CPF CNPJ</th>
              <th>CRF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPharmaceuticals.map((pharmaceutical) => (
              <tr key={pharmaceutical.id}>
                <td width={100}>
                  <h4>{pharmaceutical.id}</h4>
                </td>
                <td width={300}>
                  <h4>{pharmaceutical.nome}</h4>
                </td>
                <td width={220}>
                  <h4>
                    {pharmaceutical.cpf_cnpj.length <= 11
                      ? formatarCPF(pharmaceutical.cpf_cnpj)
                      : formatarCNPJ(pharmaceutical.cpf_cnpj)}
                  </h4>
                </td>
                <td width={200}>
                  <h4>{pharmaceutical.crf}</h4>
                </td>
                <td className="action-td" width={200}>
                  <div className="edit-button">
                    <button
                      type="button"
                      className="btn btn-secondary button-size"
                      onClick={() => abrirModal(pharmaceutical, false)}
                    >
                      Alterar
                    </button>
                  </div>
                  <div className="invert-button">
                    {pharmaceutical.status === 0 ? (
                      <button
                        type="submit"
                        className="btn btn-danger button-size"
                        onClick={() => inverterFarmaceutico(pharmaceutical.id)}
                      >
                        Desativado
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={() => inverterFarmaceutico(pharmaceutical.id)}
                      >
                        Ativado
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <PharmaceuticalModal
          pharmaceutical={pharmaceutical}
          isModalOpen={isModalOpen}
          parentCallback={handleCallback}
          isAddMode={!pharmaceutical}
        />
      )}
    </>
  );
};

export default Pharmaceutical;
