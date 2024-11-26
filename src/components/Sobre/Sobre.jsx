import React, { useState } from "react";
import axios from "axios";

export default function Sobre() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    estado: '',
    quartos: 0
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const buscarCep = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`https://brasilapi.com.br/api/cep/v2/${formData.cep}`);
      setFormData(prevState => ({
        ...prevState,
        rua: res.data.street,
        bairro: res.data.neighborhood,
        cidade: res.data.city,
        estado: res.data.state
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("CEP inválido ou erro ao buscar dados do endereço");
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dadosEmail = {
      remetente: formData.email,
      assunto: `Proposta de Venda - ${formData.nome}`,
      texto: `
        Nome: ${formData.nome}
        Email: ${formData.email}
        Telefone: ${formData.telefone}
        Endereço: ${formData.rua}, ${formData.bairro}, ${formData.cidade} - ${formData.estado}
        CEP: ${formData.cep}
        Número de Quartos: ${formData.quartos}
      `,
    };

    try {
      const res = await axios.post("http://localhost:3000/email/send", dadosEmail);
      alert(res.data.success ? "Email enviado com sucesso!" : "Erro ao enviar email");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar email");
    } finally {
      e.target.reset();
      setLoading(false);
    }
  };

  return (
    <div className="m-auto mt-[100px]">
      <div className="bg-[#4d4d4d] lg:h-[700px] h-[70vh] min-h-[400px] bg-cover bg-sob flex justify-end">
        <div className="bg-[#8a8a8a0c] backdrop-blur-[7px] w-[40%] p-[10px] h-[100%]">
          <h1 className="text-[30px] text-[#000000] mt-[50px]">
            Quer vender seu imóvel?
          </h1>
          <h2 className="text-[20px] text-[#000000]">Entre em contato comigo!</h2>
          
          <form onSubmit={formSubmit} className="max-w-[700px] space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full h-[40px] px-2"
                placeholder="Seu Nome"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-[40px] px-2"
                placeholder="Seu Email"
                required
              />
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full h-[40px] px-2"
                placeholder="Seu Telefone"
              />
            </div>
            <h2 className="text-[20px] text-[#000000]">Me conte onde fica o Imóvel!</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                className="flex-grow h-[40px] px-2"
                placeholder="CEP"
                required
              />
              <button
                type="button"
                onClick={buscarCep}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Buscar CEP
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                className="w-full h-[40px] px-2"
                placeholder="Rua"
                readOnly
              />
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                className="w-full h-[40px] px-2"
                placeholder="Bairro"
                readOnly
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  className="w-full h-[40px] px-2"
                  placeholder="Cidade"
                  readOnly
                />
                <input
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full h-[40px] px-2"
                  placeholder="Estado"
                  readOnly
                />
              </div>
              <input
                type="number"
                name="quartos"
                value={formData.quartos}
                onChange={handleChange}
                className="w-full h-[40px] px-2"
                placeholder="Número de Quartos"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 p-2 bg-green-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}