import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import Map from '../Maps/Map'
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import "./Swiper.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Vermais() {
  const [imoveis, setImoveis] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/imovel/${id}`)
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
        "http://localhost:3000/email/send",
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

  

  return (
    <>
      <div className="w-[80%] h-[100px] text-[#1d1d1d] p-2 bg-[#dd7c7c00] flex justify-between items-end mx-auto shadow-[0px_20px_30px_-4px_rgba(0,0,0,0.18)] ">
        <h1 className="text-[40px]">Título</h1>
        <Link
          to="/"
          className=" bg-[#6cd35800] underline decoration-4  text-[#1d1d1d]  top-0 right-0 text-[40px] "
        >
          Home
        </Link>
      </div>

      <div className="w-[80%] mx-auto min-h-[700px] bg-[#ffffff] mt-[50px]">
        <Swiper
          className="rounded-[5px] overflow-hidden "
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {imoveis.imagem?.map((img, index) => (
            <SwiperSlide className=" " key={index}>
              <div className="w-full xl:h-[90vh] lg:h-[80vh] md:h-[70vh] sm:h-[60vh] h-[300px]">
                <img
                  className="w-full  h-full object-cover  rounded-[5px]  "
                  src={`http://localhost:3000/imagem/${img.imagem}`}
                  alt={`Imagem ${index + 1} do imóvel`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-between flex-wrap gap-[2%] mt-[20px]">
          <div className="flex xl:w-[58%] sm:w-[100%] flex-wrap">
            <div className="w-[100%] sm:w-[50%] mx-auto mb-[20px]  bg-[#ffffff] ">
              <div></div>
              <p className="text-[22px]">
                <span className="text-[22px] text-[#1f1f1f]">Rua - </span>
                {imoveis.rua}
              </p>
              <br />
              <p className="text-[22px]">
                <span className="text-[22px] text-[#1f1f1f]">Bairro - </span>
                {imoveis.bairro}
              </p>
              <br />
              <p className="text-[22px]">
                <span className="text-[22px] text-[#1f1f1f]">Cidade - </span>
                {imoveis.cidade}
              </p>
              <br />
              <p className="text-[22px]">
                <span className="text-[22px] text-[#1f1f1f]">Estado - </span>
                {imoveis.estado}
              </p>
              <br />
              <p className="text-[22px]">
                <span className="text-[22px] text-[#1f1f1f]">Quartos - </span>
                {imoveis.quartos}
              </p>
              <br />
              <p className="text-[22px]">
                <span className="text-[22px] text-[#1f1f1f]">Valor - </span>
                {imoveis.valor
                  ?.toString()
                  .replace(".", ",")
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
              </p>
            </div>

            <div className="w-[100%] sm:w-[50%] mx-auto  bg-[#ffffff] mb-[20px]">
              <p className="text-[20px] text-justify  text-[#1f1f1f]">
                {imoveis.texto}
              </p>
            </div>
          </div>

          <div className="xl:w-[40%] sm:w-[100%] mx-auto pl-[20px]  bg-[#ffffff] ">
            <h1 className="text-[26px] text-[#1d1d1d]  mx-auto">
              Entre em contato conosco
            </h1>
            <br />
            <form action="" className=" mx-auto" onSubmit={formSubmit}>
              <input
                type="email"
                name="email"
                id=""
                placeholder="Email"
                className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5"
              />
              <input
                type="text"
                name="nome"
                id=""
                placeholder="Nome"
                className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5"
              />
              <input
                type="numero"
                name="telefone"
                id=""
                placeholder="Seu Telefone"
                className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5"
              />
              <textarea
                name="texto"
                id=""
                className="w-[100%] min-h-[100px] border-4 p-2 focus:outline-none mb-5"
              ></textarea>

              {loading && <p className="text-[20px]">Carregando...</p>}
              <input
                type="submit"
                value="Enviar"
                className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5 cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
