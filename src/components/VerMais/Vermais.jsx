import axios from "axios";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import Map from '../Maps/Map'
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";

import Wpp from "./Wpp.jsx";
import url from "../url";
export default function Vermais() {

  // const url = "http://172.30.5.171:3000";
  const [imoveis, setImoveis] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/imovel/${id}`)
      .then((res) => setImoveis(res.data));
  }, [id]);

  const formSubmit = async (e) => {
    console.log("imovel", imoveis.nome);
    setLoading(true);
    e.preventDefault();
    console.log("formulario enviado");
    const dadosEmail = {
      remetente: e.target.email.value,
      assunto: `Email Recebido: ${e.target.nome.value} - Referente ao imovel: ${imoveis.nome}`,
      texto: `
                ${e.target.texto.value} \n\n 
                Numero pra contato: ${e.target.telefone.value} \n\n 
                Rua:${imoveis.rua} \n
                Bairro: ${imoveis.bairro} \n
                Cidade: ${imoveis.cidade} \n
                Estado: ${imoveis.estado} \n
                Quartos: ${imoveis.quartos} \n
                Valor: ${imoveis.valor
                  .toString()
                  .replace(".", ",")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} \n
                `,
      // texto: `${e.target.texto.value} \n\n Numero pra contato: ${e.target.telefone.value} \n\n Imagens:\n ${imoveis.imagem.map(img => `http://localhost:3000/imagem/${img.imagem}`).join('\n')}`
    };

    try {
      const res = await axios.post(
        `${url}/email/send`,
        dadosEmail
      );
      console.log(res);
      console.log(res.data);
      console.log(res.data.success);
      alert(res.data.success);
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar email");
    } finally {
      e.target.reset();
      setLoading(false);
    }
  };

  //  //////////////////////////////

  useEffect(() => {
    axios
      .get(`${url}/imovel/${id}`)
      .then((res) => setImoveis(res.data));
  }, [id]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % imoveis.imagem.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imoveis.imagem.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="w-[80%] h-[100px] text-[#1d1d1d] p-2 bg-[#dd7c7c00] flex justify-between items-end mx-auto shadow-[0px_20px_30px_-4px_rgba(0,0,0,0.18)] ">
        <h1 className="text-[40px]">Imobiliária ADR</h1>
        <Link
          to="/"
          className=" bg-[#6cd35800] underline decoration-4  text-[#1d1d1d]  top-0 right-0 text-[40px] "
        >
          Home
        </Link>
      </div>

      <div className="w-[80%] mx-auto min-h-[700px] bg-[#ffffff] mt-[50px]">
        <div className="relative" w-full max-w-xl mx-auto>
          <div
            className="relative overflow-hidden rounded-lg shadow-md"
            style={{ height: "720px" }}
          >
            {imoveis.imagem?.map((img, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
                  index === currentImageIndex
                    ? "left-0"
                    : index < currentImageIndex
                    ? "-left-full"
                    : "left-full"
                }`}
              >
                <img
                  className="w-full h-full object-cover rounded-[5px]"
                  src={`${url}/imagem/${img.imagem}`}
                  alt={`Imagem ${index + 1} do imóvel`}
                />
              </div>
            ))}

            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 
                     bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
            >
              <ChevronLeft className="text-gray-800" />
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 
                     bg-white rounded-full p-2 hover:bg-white/75 transition"
            >
              <ChevronRight className="text-gray-800" />
            </button>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {imoveis.imagem?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>

        <br />
        <br />
        <br />
        {/* bg-[#bf982c] */}
        <div className="w-[100%]  min-h-[400px] mx-auto pl-[20px]  flex flex-wrap   ">
          <div className="w-[100%]  xl:w-[50%]  ">
            <h1 className="text-[30px] text-[#1d1d1d] text-bold  mx-auto">
              {imoveis.nome}
            </h1>
            <br />
            <h1 className="text-[28px] text-[#3e86cf] text-bold  mx-auto">
              R${" "}
              {imoveis.valor
                ?.toString()
                .replace(".", ",")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </h1>
            <br />
            <div className="flex gap-5">
              <div className="w-[200px] p-[10px] bg-[#7aacde] flex justify-center rounded-[5px]">
                <h1 className="text-[20px] text-[#ffffff] text-bold  mx-auto">
                  Quartos: {imoveis.quartos}
                </h1>
              </div>
              <div className="w-[200px] p-[10px] bg-[#7aacde] flex justify-center rounded-[5px]">
                <h1 className="text-[20px] text-[#ffffff] text-bold  mx-auto">
                  Banheiro: {imoveis.banheiro}
                </h1>
              </div>
              <div className="w-[200px] p-[10px] bg-[#7aacde] flex justify-center rounded-[5px]">
                <h1 className="text-[20px] text-[#ffffff] text-bold  mx-auto">
                  Garagem: {imoveis.garagem}
                </h1>
              </div>
              <div className="w-[200px] p-[10px] bg-[#7aacde] flex justify-center rounded-[5px]">
                <h1 className="text-[20px] text-[#ffffff] text-bold  mx-auto">
                  Area: {imoveis.area}
                </h1>
              </div>
            </div>

            <br />

            <div className="flex gap-5 flex-wrap">
              <div className="min-w-[200px] p-[10px] bg-[#e4e7eb] flex justify-center rounded-[5px]">
                <h1 className="text-[20px] text-[#1d1d1d] text-bold  mx-auto">
                  Estado: {imoveis.estado}
                </h1>
              </div>
              <div className="min-w-[200px] p-[10px] bg-[#e4e7eb] flex justify-center rounded-[5px]">
                <h1 className="text-[20px] text-[#1d1d1d] text-bold  mx-auto">
                  Cidade: {imoveis.cidade}
                </h1>
              </div>
              <div className="min-w-[200px] p-[10px] bg-[#e4e7eb] flex justify-center rounded-[5px]">
                <h1 className="text-[20px] text-[#1d1d1d] text-bold  mx-auto">
                  {imoveis.bairro}
                </h1>
              </div>
              <div className="min-w-[200px] p-[10px] bg-[#e4e7eb] flex justify-center rounded-[5px]">
                <h1 className="text-[20px] text-[#1d1d1d] text-bold  mx-auto">
                  {" "}
                  {imoveis.rua} - {imoveis.numeroCasa}
                </h1>
              </div>
              <Wpp
                phoneNumber={5566992129562}
                message={`Ola, gostaria de saber mais sobre o imovel:\n ${
                  imoveis.nome
                } \n R$ ${imoveis.valor
                  ?.toString()
                  .replace(".", ",")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}\n quartos: ${
                  imoveis.quartos
                } \n endereco: ${imoveis.rua}, ${imoveis.bairro}, ${
                  imoveis.numeroCasa
                } ${imoveis.cidade}, ${imoveis.estado}\n} `}
              ></Wpp>
            </div>
            <br />
          </div>
          <div className="w-[100%] xl:w-[50%]    pl-[20px] text-[25px] text-[#5c5c5c]  ">
            <p>{imoveis.texto}</p>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
      </div>
      <div className="w-[100%] sm:w-[100%] mx-auto px-[20px] py-[40px]  bg-[#e4e7eb] ">
        <form action="" className=" mx-auto w-[40%]" onSubmit={formSubmit}>
          <h1 className="text-[26px] text-[#1d1d1d]  mx-auto">
            Está interessado nesse imóvel?
          </h1>
          <br />
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email"
            className="w-[100%] h-[50px]  p-2 focus:outline-none mb-5"
          />
          <input
            type="text"
            name="nome"
            id=""
            placeholder="Nome"
            className="w-[100%] h-[50px] p-2 focus:outline-none mb-5"
          />
          <input
            type="numero"
            name="telefone"
            id=""
            placeholder="Seu Telefone"
            className="w-[100%] h-[50px]  p-2 focus:outline-none mb-5"
          />
          <textarea
            name="texto"
            id=""
            className="w-[100%] min-h-[100px]  p-2 focus:outline-none mb-5"
          ></textarea>

          {loading && <p className="text-[20px]">Carregando...</p>}
          <input
            type="submit"
            value="Enviar"
            className="w-[100%] h-[50px] text-[20px] text-[#ffffff] text-bold bg-[#7aacde] border-4 p-2 focus:outline-none mb-5 cursor-pointer"
          />
        </form>
      </div>

      <Footer />

      <br />
    </>
  );
}
