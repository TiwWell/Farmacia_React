import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "./Medicine.css";
import MedicineModal from "./MedicineModal";
import defaultImagem from "./default.jpeg";

const Medicine = () => {
  const [medicine, setMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaMedicines, setListaMedicines] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleSelect();
  }, []);

  const handleSelect = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/listar-remedio"
      );
      if (response.data.codRetorno === 200) {
        setListaMedicines(response.data.listaRemedios);
      } else {
        toast.error(
          "Erro no carregamento da lista de remédios. Verificar se a API está disponível.",
          { position: "bottom-right" }
        );
      }
    } catch (error) {
      console.error("Erro ao configurar a solicitação:", error);
      toast.error(
        "Erro no carregamento da lista de remedios. Verificar se a API está disponível.",
        { position: "botton-right" }
      );
    }
  };

  const handleRevert = async (medicineId) => {
    try {
      await axios.get(
        `http://localhost:8080/api/inverter-status-remedio/${medicineId}`
      );
      toast.success("Status do remedio invertido com sucesso");
      handleSelect(); // Recarrega a lista de remédios após a inversão de status
    } catch (error) {
      console.error("Erro ao inverter status do remedio:", error);
      toast.error(
        "Erro ao inverter o status do remedio. Verificar se a API está disponível.",
        { position: "bottom-right" }
      );
    }
  };

  const openModal = (medicine, isAddMode) => {
    setIsModalOpen(true);
    setMedicine(medicine);
    setIsAddMode(isAddMode);
  };

  const handleCallback = (childData) => {
    setIsModalOpen(childData);
  };

  const filteredMedicine = listaMedicines
    .sort((a, b) => a.id - b.id)
    .filter((medicine) =>
      medicine.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  if (!listaMedicines.length) return null;
  const sortedMedicines = [...listaMedicines].sort((a, b) => a.id - b.id);

  return (
    <>
      <div className="title container w-75 mx-auto mb-3">
        <h1>Lista de Remédios</h1>
      </div>
      <div>
        <button
          type="submit"
          className="Btn custom-button"
          onClick={() => openModal()}
        >
          <div class="sign">+</div>

          <div class="text">Adicionar</div>
        </button>
      </div>
      <div className="search-container w-75 mx-auto mb-3 wrapper">
        <div class="icon"></div>
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
              {/* <th>Imagem</th> Voltará na 2.0 com conversão de imagens em bytes para o banco e conversão da imagem para o front*/}
              <th>Id</th>
              <th>Nome</th>
              <th>Valor</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicine.map((medicine) => (
              <tr key={medicine.id}>
                <td>
                  <h4>{medicine.id}</h4>
                </td>
                <td>
                  <h4>{medicine.nome}</h4>
                </td>
                {/* <td width={200}>
                  <img
                  width={200}
                  height={200}
                  src={medicine.img && medicine.img.trim() ? medicine.img : defaultImagem}
                  alt={medicine.nome}
                  />
                  </td> Voltará na 2.0 com conversão de imagens em bytes para o banco e conversão da imagem para o front */}
                <td width={200}>
                  <h4>{medicine.valor}</h4>
                </td>
                <td width={200}>
                  <h4>{medicine.quantidade}</h4>
                </td>
                {/* Descomentar os botões quando necessário */}
                <td width={200}>
                  <div className="edit-button button-size">
                    <button
                      type="button"
                      className="btn btn-secondary me-1"
                      onClick={() => openModal(medicine, false)}
                    >
                      Alterar
                    </button>
                  </div>
                  <div className="invert-button button-size">
                    {medicine.status === 0 ? (
                      <button
                        type="submit"
                        className="btn btn-danger"
                        onClick={() => handleRevert(medicine.id)}
                      >
                        Desativado
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={() => handleRevert(medicine.id)}
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
        <MedicineModal
          medicine={medicine}
          isModalOpen={isModalOpen}
          parentCallback={handleCallback}
          isAddMode={!medicine}
        />
      )}
    </>
  );
};

export default Medicine;
