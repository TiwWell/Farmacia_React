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

    useEffect(() => {
        listarFarmaceuticos();
    }, []);

    const listarFarmaceuticos = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/listar-farmaceutico"
            );
            if (response.data.codRetorno === 200) {
                console.log(response.data)
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
            .replace(/\D/g, '') // Remove tudo que não é dígito
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona hífen
    }

    function formatarCNPJ(cnpj) {
        return cnpj
            .replace(/\D/g, '') // Remove tudo que não é dígito
            .replace(/(\d{2})(\d)/, '$1.$2') // Adiciona ponto
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto
            .replace(/(\d{3})(\d)/, '$1/$2') // Adiciona barra
            .replace(/(\d{4})(\d{2})$/, '$1-$2'); // Adiciona hífen
    }

    if (!listaPharmaceuticals.length) return null;

    return (
        <>
            <div>
                <button
                    type="submit"
                    className="Btn custom-button"
                    onClick={() => abrirModal()}
                >
                    <div class="sign">+</div>

                    <div class="text">Adicionar</div>
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
                                        <h4>
                                            {pharmaceutical.cpf_cnpj.length <= 11
                                                ? formatarCPF(pharmaceutical.cpf_cnpj)
                                                : formatarCNPJ(pharmaceutical.cpf_cnpj)}
                                        </h4>
                                    </td>
                                    <td width={200}>
                                        <h4>{pharmaceutical.crf}</h4>
                                    </td>
                                    <td width={200}>
                                        <button
                                            type="button"
                                            className="btn btn-secondary me-1"
                                            onClick={() => abrirModal(pharmaceutical, false)}
                                        >
                                            Alterar
                                        </button>
                                        {pharmaceutical.status === 0 ? (
                                            <button type="submit"
                                                className="btn btn-danger"
                                                onClick={() => inverterFarmaceutico(pharmaceutical.id)}>
                                                Desativado
                                            </button>
                                        ) : (
                                            <button type="submit"
                                                className="btn btn-success"
                                                onClick={() => inverterFarmaceutico(pharmaceutical.id)}>
                                                Ativado
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