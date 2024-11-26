import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// import Map from '../Maps/Map'
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./Swiper.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Defina a sua chave da API do Google Maps
const MAPS_API_KEY = "AIzaSyBaVjmtCCBw5ULjy8gwdntYwAme8ReB4jA";

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

  //  //////////////////////////////

  // Use o hook para carregar a API do Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: MAPS_API_KEY,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/imovel/${id}`)
      .then((res) => setImoveis(res.data));
  }, [id]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
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
      <div className=" slide_G w-[80%] mx-auto min-h-[700px] bg-[#ffffff] mt-[50px]">
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
        <br />
        <br />
        <div>
          <h1 className="text-[26px] text-[#1d1d1d]">
            Deixa eu te mostrar um pouco mais <br /> sobre este lindo imóvel!
          </h1>
          <hr />

          <div>
            <p className="text-[#2e2e2e] text-[18px] ">
              Pra começar esse imóvel tem a seguinte Localização:
            </p>
            <p>
              Rua: {imoveis.rua} - N: {imoveis.numero}
            </p>
            <p>Bairro: {imoveis.bairro}</p>
            <p>
              Cidade: {imoveis.cidade} - {imoveis.estado}
            </p>
          </div>
          <hr />
          <br />
          <br />
          <div className="w-[100%] max-w-[1200px]  min-h-[200px] m-auto">
            <p className="text-[#000000] text-[22px] text-center">
              Este imóvel lhe entrega
            </p>
            <br />

            <div className=" slide_conteudo w-[100%] 2xl:min-w-[1200px] xl:min-w-[1200px] lg:min-w-[900px] flex flex-wrap justify-center gap-3 mt-[20px] ">
              <div className="w-[250px] h-[360px] bg-[#000000] rounded-[5px]  relative ">
                <h1 className=" z-10 text-[26px] text-[#ffffff] absolute top-[5px] left-[5px] ">
                  Conteudo
                </h1>
                <img
                  className="absolute top-0 left-0 w-[100%] h-[100%] object-cover rounded-[5px] opacity-[0.7] hover:opacity-[1] transition-opacity duration-500"
                  src="https://i.pinimg.com/control/236x/c9/50/59/c9505967bca9deb510eaf0339c98d867.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="xl:w-[40%] sm:w-[100%] mx-auto pl-[20px]  bg-[#ffffff] ">
          <h1 className="text-[26px] text-[#1d1d1d]  mx-auto">
            Está interessado nesse imóvel?
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
      ;
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}
