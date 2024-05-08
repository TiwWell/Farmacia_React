import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "./pharmaceutical.css";
import PharmaceuticalModal from "./pharmaceuticoModal";

const Pharmaceutical = () => {
    const [pharmaceutical, setPharmaceutical] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listaPharmaceuticals, setListaPharmaceuticals] = useState(null);
    const [isAddMode, setIsAddMode] = useState(false);

    useEffect(() => {
        handleSelect();
    }, []);

    const handleSelect = () => {
        try {
            axios
                .get("http://localhost:8080/api/listar-farmaceutico")
                .then((response) => {
                    console.log(response);
                    setListaPharmaceuticals(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao obter farmaceuticos:", error);
                    toast.error(
                        "Erro no carregamento da lista de farmaceuticos. Verificar se a API está disponível.",
                        { position: "botton-right" }
                    );
                });
        } catch (error) {
            console.error("Erro ao configurar a solicitação:", error);
            toast.error(
                "Erro no carregamento da lista de farmaceuticos. Verificar se a API está disponível.",
                { position: "botton-right" }
            );
        }
    };

    function handleDeactivate(pharmaceuticalId) {
        axios
            .get(`http://localhost:8080/api/desativar-farmaceutico/${pharmaceuticalId}`)
            .then((response) => {
                toast.success("Desativado com sucesso");
                window.location.reload();
            });
    }

    function handleReactivate(pharmaceuticalId) {
        axios
            .get(`http://localhost:8080/api/reativar-farmaceutico/${pharmaceuticalId}`)
            .then((response) => {
                toast.success("Reativado com sucesso");
                window.location.reload();
            });
    }
    const openModal = (pharmaceutical, isAddMode) => {
        setIsModalOpen(true);
        setPharmaceutical(pharmaceutical);
        setIsAddMode(isAddMode);
    };

    const handleCallback = (childData) => {
        setIsModalOpen(childData);
    };

    if (!listaPharmaceuticals) return null;
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
                            <th>CRF</th>
                            <th>Ações</th>
                        </tr>
                        {listaPharmaceuticals.map((pharmaceutical) => {
                            return (
                                <tr className="text-center" key={pharmaceutical.id}>
                                    <td width={200}>
                                        <h4>{pharmaceutical.nome}</h4>
                                    </td>
                                    <td width={200}>
                                        <h4>{pharmaceutical.cpf_cnpj}</h4>
                                    </td>
                                    <td width={200}>
                                        <h4>{pharmaceutical.crf}</h4>
                                    </td>
                                    <td width={200}>
                                        <button
                                            type="button"
                                            className="btn btn-secondary me-1"
                                            onClick={() => openModal(pharmaceutical, false)}
                                        >
                                            Alterar
                                        </button>
                                        {pharmaceutical.desativado === 0 ? (
                                            <button type="submit" className="btn btn-danger" onClick={() => handleDeactivate(pharmaceutical.id)}>
                                                Desativar
                                            </button>
                                        ) : (
                                            <button type="submit" className="btn btn-success" onClick={() => handleReactivate(pharmaceutical.id)}>
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
                <PharmaceuticalModal
                    pharmaceutical={pharmaceutical}
                    isModalOpen={isModalOpen}
                    parentCallback={handleCallback}
                    isAddMode={!pharmaceutical}
                />
            )}
        </>
    );

}

export default Pharmaceutical;