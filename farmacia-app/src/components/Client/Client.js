import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import InputMask from "react-input-mask";
import "./Client.css";
import ClientModal from "./ClientModal";

const Client = () => {
  const [client, setClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listaClientes, setListaClientes] = useState(null);

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
      // Trate erros durante a configuração da solicitação
      console.error("Erro ao configurar a solicitação:", error);
      toast.error(
        "Erro no carregamento da lista de clientes. Verificar se a API está disponível.",
        { position: "botton-right" }
      );
    }
  };

  function handleDelete(clientId) {
    axios
      .get(`http://localhost:8080/api/desativar-cliente/${clientId}`)
      .then((response) => {
        toast.success("Desativado com sucesso");
        window.location.reload();
      });
  }

  const openModal = (client) => {
    setIsModalOpen(true);
    setClient(client);
  };

  const handleCallback = (childData) => {
    setIsModalOpen(childData);
  };

  if (!listaClientes) return null;
  return (
    <>
      <div>
        <button type="submit" className="btn btn-success float-end" onClick={() => openModal()}>
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
                      className="btn btn-primary me-1"
                      onClick={() => openModal(client)}
                    >
                      Alterar
                    </button>
                    {client.desativado === 0 ? (
                      <button
                        type="submit"
                        className="btn btn-danger"
                        onClick={() => handleDelete(client.id)}
                      >
                        Desativar
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-secondary">
                        Desativado
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
        />
      )}
    </>
  );
};

export default Client;
