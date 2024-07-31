import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "./Client.css";
import ClientModal from "./ClientModal";

const Client = () => {
  const [client, setClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaClientes, setListaClientes] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    handleSelect();
  }, []);

  const handleSelect = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/lista-cliente"
      );
      if (response.data.codRetorno === 200) {
          setListaClientes(response.data.listaClientes);
      } else {
        toast.error(
          "Erro no carregamento da lista de clientes. Verificar se a API está disponível.",
          { position: "bottom-right" }
        );
      }
    } catch (error) {
      console.error("Erro ao configurar a solicitação:", error);
      toast.error(
        "Erro no carregamento da lista de clientes. Verificar se a API está disponível.",
        { position: "bottom-right" }
      );
    }
  };

  const handleRevert = async (clientId) => {
    try {
      await axios.get(
        `http://localhost:8080/api/inverter-status-clientes/${clientId}`
      );
      toast.success("Status do clientes invertido com sucesso");
      handleSelect(); // Recarrega a lista de clientes após a inversão de status
    } catch (error) {
      console.error("Erro ao inverter status do clientes:", error);
      toast.error(
        "Erro ao inverter o status do clientes. Verificar se a API está disponível.",
        { position: "bottom-right" }
      );
    }
  };

  const openModal = (client, isAddMode) => {
    setIsModalOpen(true);
    setClient(client);
    setIsAddMode(isAddMode);
  };

  const handleCallback = (childData) => {
    setIsModalOpen(childData);
  };
  const formatPhoneNumber = (phoneNumber) => {
    // Remove todos os caracteres não numéricos
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  
    // Verifica se o número tem 10 ou 11 dígitos
    if (cleaned.length === 11) {
      // Formata o número no formato (11) 91234-56789
      return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
    } else if (cleaned.length === 10) {
      // Formata o número no formato (11) 1234-5678
      return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
    }
  
    // Retorna o número original se não tiver o comprimento esperado
    return phoneNumber;
  };
  
  if (!listaClientes.length) return null;

  return (
    <>
      <div>
        <button 
          type="button" 
          className="btn btn-primary float-end custom-button" 
          onClick={() => openModal()}
        >
          Adicionar
        </button>
      </div>
      <div>
        <table className="table table-light w-75 mx-auto">
          <thead>
            <tr className="text-center">
              <th>Nome</th>
              <th>CPF CNPJ</th>
              <th>Telefone</th>
              <th>Endereco</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaClientes.map((client) => (
              <tr key={client.id}>
                <td>
                  <h4>{client.nome}</h4>
                </td>
                <td width={300}>
                  <h4>{client.cpf_cnpj}</h4>
                </td>
                <td width={250}>
                  <h4>{formatPhoneNumber(client.telefone)}</h4>
                </td>
                <td  width={350}>
                  <h4>{client.endereco}</h4>
                </td>
                <td width={200}>
                  <button
                    type="button"
                    className="btn btn-secondary me-1"
                    onClick={() => openModal(client, false)}
                  >
                    Alterar
                  </button>
                  {client.status === 0 ? (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRevert(client.id)}
                    >
                      Desativado
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleRevert(client.id)}
                    >
                      Ativado
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <ClientModal
          client={client}
          isModalOpen={isModalOpen}
          parentCallback={handleCallback}
          isAddMode={!client}
        />
      )}
    </>
  );
};

export default Client;
