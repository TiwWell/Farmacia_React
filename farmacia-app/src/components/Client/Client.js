import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "./Client.css";
import ClientModal from "./ClientModal";

const Client = () => {
  const [client, setClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaClientes, setListaClientes] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    handleSelect();
  }, []);

  const handleSelect = () => {
    try {
      axios
        .get("http://localhost:8080/api/lista-cliente")
        .then((response) => {
          console.log(response);
          setListaClientes(response.data);
        })
        .catch((error) => {
          console.error("Erro ao obter clientes:", error);
          toast.error(
            "Erro no carregamento da lista de clientes. Verificar se a API está disponível.",
            { position: "botton-right" }
          );
        });
    } catch (error) {
      console.error("Erro ao configurar a solicitação:", error);
      toast.error(
        "Erro no carregamento da lista de clientes. Verificar se a API está disponível.",
        { position: "botton-right" }
      );
    }
  };

  function handleDeactivate(clientId) {
    axios
      .get(`http://localhost:8080/api/desativar-cliente/${clientId}`)
      .then((response) => {
        toast.success("Desativado com sucesso");
        window.location.reload();
      });
  }

  function handleReactivate(clientId) {
    axios
      .get(`http://localhost:8080/api/reativar-cliente/${clientId}`)
      .then((response) => {
        toast.success("Reativado com sucesso");
        window.location.reload();
      });
  }

  const openModal = (client, isAddMode) => {
    setIsModalOpen(true);
    setClient(client);
    setIsAddMode(isAddMode);
  };

  const handleCallback = (childData) => {
    setIsModalOpen(childData);
  };

  if (!listaClientes) return null;
  return (
    <>
      <div>
        <button 
          type="submit" 
          className="btn btn-primary float-end" 
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
                    <button
                      type="button"
                      className="btn btn-secondary me-1"
                      onClick={() => openModal(client, false)}
                    >
                      Alterar
                    </button>
                    {client.desativado === 0 ? (
                      <button type="submit" className="btn btn-danger" onClick={() => handleDeactivate(client.id)}>
                        Desativar
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-success" onClick={() => handleReactivate(client.id)}>
                        Reativar
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </thead>
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
