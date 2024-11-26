import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "./api";

export default function ImoveisAdmin() {
  const [imoveis, setImoveis] = useState([]);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [quartos, setQuartos] = useState("");
  const [valor, setValor] = useState("");
  const [texto, setTexto] = useState("");
  const [area, setArea] = useState("");
  const [banheiro, setBanheiro] = useState("");
  const [garagem, setGaragem] = useState("");

  const handleLogout = () => {
    console.log("Logout iniciado. Removendo token do localStorage.");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    api.get("/imovel").then((res) => setImoveis(res.data));
  }, [imoveis]);

  const deleteImovel = (id) => {
    api.delete(`/imovel/${id}`);
  };

  const buscarCep = (e) => {
    e.preventDefault();

    axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`).then((res) => {
      console.log(res.data);
      setRua(res.data.street);
      setBairro(res.data.neighborhood);
      setCidade(res.data.city);
      setEstado(res.data.state);
    });
  };

  const limpar = (e) => {
    setNome("");
    setCep("");
    setRua("");
    setBairro("");
    setCidade("");
    setEstado("");
    setNumeroCasa("");
    setQuartos("");
    setValor("");
    setTexto("");
    setArea("");
    setBanheiro("");
    setGaragem("");
    e.target.img.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nome", nome);
    formData.append("cep", cep);
    formData.append("rua", rua);
    formData.append("bairro", bairro);
    formData.append("cidade", cidade);
    formData.append("estado", estado);
    formData.append("numeroCasa", numeroCasa);
    formData.append("quartos", quartos);
    formData.append("valor", valor);
    formData.append("texto", texto);
    formData.append("area", area);
    formData.append("banheiro", banheiro);
    formData.append("garagem", garagem);

    const files = e.target.img.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("imagem", files[i]);
    }

    api
      .post("/imovel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        limpar(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
       
        <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
          <h1 className="text-3xl font-thin text-neutral-800">Imóveis</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Sair
          </button>
        </div>

        
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-neutral-100"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do Imóvel"
              className="w-full border-b border-neutral-300 pb-2 focus:outline-none focus:border-black transition-colors"
            />
            <input
              type="file"
              name="img"
              
              multiple
              className="w-full file:text-neutral-600 file:border-0 file:bg-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="CEP"
                className="w-full border-b border-neutral-300 pb-2 focus:outline-none focus:border-black transition-colors"
              />
              <button
                onClick={buscarCep}
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Buscar
              </button>
            </div>
            <input
              type="text"
              name="rua"
              value={rua}
              readOnly
              placeholder="Rua"
              className="w-full border-b border-neutral-300 pb-2 bg-neutral-50 text-neutral-600"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <input
              type="text"
              name="numeroCasa"
              value={numeroCasa}
              onChange={(e) => setNumeroCasa(e.target.value)}
              placeholder="Número"
              className="w-full border-b border-neutral-300 pb-2 focus:outline-none focus:border-black transition-colors"
            />
            <input
              type="text"
              name="bairro"
              value={bairro}
              readOnly
              placeholder="Bairro"
              className="w-full border-b border-neutral-300 pb-2 bg-neutral-50 text-neutral-600"
            />
            <input
              type="text"
              name="cidade"
              value={cidade}
              readOnly
              placeholder="Cidade"
              className="w-full border-b border-neutral-300 pb-2 bg-neutral-50 text-neutral-600"
            />

            <input
              type="text"
              name="estado"
              value={estado}
              readOnly
              placeholder="Cidade"
              className="w-full border-b border-neutral-300 pb-2 bg-neutral-50 text-neutral-600"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="number"
              name="quarto"
              value={quartos}
              onChange={(e) => setQuartos(e.target.value)}
              placeholder="Quartos"
              className="w-full border-b border-neutral-300 pb-2 focus:outline-none focus:border-black transition-colors"
            />
            <input
              type="text"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Area"
              className="w-full border-b border-neutral-300 pb-2 focus:outline-none focus:border-black transition-colors"
            />
            <input
              type="number"
              name="banheiros"
              value={banheiro}
              onChange={(e) => setBanheiro(e.target.value)}
              placeholder="Banheiros"
              className="w-full border-b border-neutral-300 pb-2 focus:outline-none focus:border-black transition-colors"
            />
            <input
              type="number"
              name="garagem"
              value={garagem}
              onChange={(e) => setGaragem(e.target.value)}
              placeholder="Garagens"
              className="w-full border-b border-neutral-300 pb-2 focus:outline-none focus:border-black transition-colors"
            />
            <input
              type="number"
              name="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Valor"
              step="0.01"
              className="w-full border-b border-neutral-300 pb-2 focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <textarea
            name="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Descrição"
            className="w-full border-b border-neutral-300 pb-2 h-32 focus:outline-none focus:border-black transition-colors"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
          >
            Cadastrar Imóvel
          </button>
        </form>

        <div className="space-y-6">
          <h2 className="text-2xl font-thin text-neutral-800 border-b border-neutral-200 pb-4">
            Imóveis Cadastrados
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imoveis.map((imovel) => (
              <div
                key={imovel.id}
                className="bg-white border border-neutral-200  overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {imovel.imagem.length > 0 && (
                  <img
                    className="w-full h-48 object-cover"
                    src={`http://localhost:3000/imagem/${imovel.imagem[0].imagem}`}
                    alt=""
                  />
                )}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-neutral-800">
                      {imovel.nome}
                    </h3>
                    <button
                      onClick={() => deleteImovel(imovel.id)}
                      className="text-neutral-500 hover:text-red-500 transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                  <div className="text-neutral-600 space-y-1">
                    <p>
                      {imovel.valor
                        .toString()
                        .replace(".", ",")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
