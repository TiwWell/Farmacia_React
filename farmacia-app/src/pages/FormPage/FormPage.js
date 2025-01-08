import './FormPage.css';
import { format } from 'date-fns';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const FormPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    cpfCnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    genero: '',
    senha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dataNascimento: format(date, 'dd/MM/yyyy') });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className="registration-container">
      <h1>Cadastro de Cliente</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </label>
        <label>
          Sobrenome:
          <input type="text" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required />
        </label>
        <label>
          CPF ou CNPJ:
          <input type="text" name="cpfCnpj" value={formData.cpfCnpj} onChange={handleChange} required />
        </label>
        <label>
          Endereço:
          <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} required />
        </label>
        <label>
          Telefone:
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Gênero:
          <select name="genero" value={formData.genero} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
        </label>
        <label>
          Senha:
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default FormPage;
