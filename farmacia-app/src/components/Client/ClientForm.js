import axios from "axios";
import React from "react";

function ClientForm(props) {
    const { open } = props;
    console.log ("Homem com 1,65");
    return (<>{open && (


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Nome</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">CPF CNPJ</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Telefone</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Endereço</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Desativado</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" class="btn btn-primary">Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
    }
    </>




    )



}

export default ClientForm;
