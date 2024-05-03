import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "./Medicine.css";
import MedicineModal from "./MedicineModal";

const Medicine = () => {
    const [medicine, setMedicine] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listaMedicines, setListaMedicines] = useState(null);
    const [isAddMode, setIsAddMode] = useState(false);

    useEffect(() => {
        handleSelect();
    }, []);

    const handleSelect = () => {
        try {
            axios
                .get("http://localhost:8080/api/listar-remedio")
                .then((response) => {
                    console.log(response);
                    setListaMedicines(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao obter medicines:", error);
                    toast.error(
                        "Erro no carregamento da lista de medicines. Verificar se a API está disponível.",
                        { position: "botton-right" }
                    );
                });
        } catch (error) {
            console.error("Erro ao configurar a solicitação:", error);
            toast.error(
                "Erro no carregamento da lista de medicines. Verificar se a API está disponível.",
                { position: "botton-right" }
            );
        }
    };

    function handleDeactivate(medicineId) {
        axios
            .get(`http://localhost:8080/api/desativar-remedio/${medicineId}`)
            .then((response) => {
                toast.success("Desativado com sucesso");
                window.location.reload();
            });
    }

    function handleReactivate(medicineId) {
        axios
            .get(`http://localhost:8080/api/reativar-remedio/${medicineId}`)
            .then((response) => {
                toast.success("Reativado com sucesso");
                window.location.reload();
            });
    }
    const openModal = (medicine, isAddMode) => {
        setIsModalOpen(true);
        setMedicine(medicine);
        setIsAddMode(isAddMode);
    };

    const handleCallback = (childData) => {
        setIsModalOpen(childData);
    };

    if (!listaMedicines) return null;
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
                            <th>Valor</th>
                            <th>Quantidade</th>
                            <th>Imagem</th>
                            <th>Ações</th>
                        </tr>
                        {listaMedicines.map((medicine) => {
                            return (
                                <tr className="text-center" key={medicine.id}>
                                    <td width={200}>
                                        <h4>{medicine.nome}</h4>
                                    </td>
                                    <td width={200}>
                                        <h4>{medicine.valor}</h4>
                                    </td>
                                    <td width={200}>
                                        <h4>{medicine.quantidade}</h4>
                                    </td>
                                    <td width={200}>
                                        <img width={50} height={50} src={medicine.img}/>
                                    </td>
                                    <td width={200}>
                                        <button
                                            type="button"
                                            className="btn btn-secondary me-1"
                                            onClick={() => openModal(medicine, false)}
                                        >
                                            Alterar
                                        </button>
                                        {medicine.desativado === 0 ? (
                                            <button type="submit" className="btn btn-danger" onClick={() => handleDeactivate(medicine.id)}>
                                                Desativar
                                            </button>
                                        ) : (
                                            <button type="submit" className="btn btn-success" onClick={() => handleReactivate(medicine.id)}>
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
                <MedicineModal
                    medicine={medicine}
                    isModalOpen={isModalOpen}
                    parentCallback={handleCallback}
                    isAddMode={!medicine}
                />
            )}
        </>
    );

}

export default Medicine;
