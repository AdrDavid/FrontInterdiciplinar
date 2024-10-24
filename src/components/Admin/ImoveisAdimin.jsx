import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ImoveisAdmin() {
  const [imoveis, setImoveis] = useState([]);


  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [cep, setCep] = useState();

  




  useEffect(() => {
    axios
      .get("http://localhost:3000/imovel")
      .then((res) => setImoveis(res.data));
  }, [imoveis]);

  const deleteImovel = (id) => {
    axios.delete(`http://localhost:3000/imovel/${id}`);
  };

  const buscarCep = (e) => {
    e.preventDefault();

    axios
      .get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
      .then((res) => {
        console.log(res.data);
        setRua(res.data.street);
        setBairro(res.data.neighborhood);
        setCidade(res.data.city);
        setEstado(res.data.state);
        setLatitude(res.data.location.coordinates.latitude);
        setLongitude(res.data.location.coordinates.longitude);
        
      })
      // console.log("Listando " + rua);

    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   

    const formData = new FormData();

    formData.append("nome", e.target.nome.value);
    formData.append("rua", e.target.rua.value);
    formData.append("bairro", e.target.bairro.value);
    formData.append("cidade", e.target.cidade.value);
    formData.append("estado", e.target.estado.value);
    formData.append("cep", cep);
    formData.append("quartos", Number(e.target.quarto.value));
    formData.append("valor", e.target.valor.value);
    formData.append("texto", e.target.texto.value);
    formData.append("numeroCasa", Number(e.target.numeroCasa.value));

    const files = e.target.img.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("imagem", files[i]);
    }

    // Envie o FormData
    axios
      .post("http://localhost:3000/imovel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-[100%]  min-w-[500px] mx-auto py-20 bg-[#8f8f8f]">
      
        <form
          action=""
          className="w-[60%] mx-auto"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="nome"
            id=""
            placeholder="Nome"
            className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5"
            value="Sobrado Miranda"
          />
          <input
            type="file"
            name="img"
            id=""
            className="w-[100%] h-[50px] border-4 mb-5"
            multiple
          />
          
          <div className="w-[100%] flex">
            <input
              type="number"
              name="cep"
              id=""
              value={cep}
              placeholder="Cep"
              className="w-[85%] h-[50px] border-4 p-2 focus:outline-none mb-5"
              onChange={(e) => setCep(e.target.value)}
            />

            <button onClick={buscarCep} className="w-[15%] h-[50px] border-4 flex justify-center items-center cursor-pointer">
              Buscar
            </button>
          </div>

          <input
            type="text"
            name="rua"
            id=""
            value={rua}
            placeholder="Rua"
            className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5"
          />
          <input
            type="text"
            name="numeroCasa"
            id=""
            placeholder="Numro da Casa"
            className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5"
          />
          <input
            type="text"
            name="bairro"
            id=""
            value={bairro}
            placeholder="Bairro"
            className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5"
          />
          <input
            type="text"
            name="cidade"
            id=""
            value={cidade}
            placeholder="Cidade"
            className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5"
          />
          <input
            type="text"
            name="estado"
            id=""
            value={estado}
            placeholder="Estado"
            className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5"
          />

          <input
            type="number"
            name="quarto"
            id=""
            placeholder="Quartos"
            className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5"
            value="2"
          />
          <input
            type="number"
            name="valor"
            id=""
            placeholder="Valor"
            className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5"
            value="200000.15"
          />
          <textarea
            name="texto"
            id=""
            className="w-[100%] h-[120px]  border-4 p-2 focus:outline-none mb-5"
          ></textarea>
          <input
            type="submit"
            value="Enviar"
            className="w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5 cursor-pointer"
          />
        </form>
      </div>

      <div className="bg-[#af525200] min-h-[400px] relative  mt-[40px] ">
        <div className=" z-10 w-[80%] bg-[#91e91e00] flex flex-wrap justify-center gap-3 mx-auto">
          {imoveis.map((imovel) => (
            <div
              className=" bg-[#000000e7]  w-full max-w-[24%] sm:w-1/3  rounded-[5px] relative shadow-[5px_5px_10px_0px_rgba(0,0,0,0.18)]"
              key={imovel.id}
            >
              <p
                className="z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4  px-3 py-1  absolute top-[-30px] 
                       rounded-[5px]"
              >
                {imovel.nome}
              </p>
              <button
                className="z-10 absolute top-2 right-2 bg-[#000000] text-[#ffffff] p-1 rounded-[5px] hover:bg-[#ffffff] hover:text-[#000000]"
                onClick={() => deleteImovel(imovel.id)}
              >
                DELETAR
              </button>

              {imovel.imagem.length > 0 && (
                <img
                  className=" w-full h-auto min-h-[300px] object-cover rounded-[5px]  "
                  src={`http://localhost:3000/imagem/${imovel.imagem[0].imagem}`}
                  alt=""
                />
              )}

              <div className=" absolute bottom-2 left-[5%] bg-[#9c232300] w-[90%] flex flex-wrap gap-2 justify-center p-2 rounded-[5px]">
                <div className="w-[100%] h-[100%] absolute top-0 bg-[#ffffff42]  rounded-[10px] z-0 blur-[5px]"></div>
                <p
                  className=" z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4  px-3 py-1   
                       rounded-[5px]"
                >
                  {imovel.valor
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
                <p
                  className="z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4  px-3 py-1   
                       rounded-[5px]"
                >
                  {imovel.quartos} Quartos
                </p>
                <p
                  className="z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4  px-3 py-1   
                       rounded-[5px]"
                >
                  {imovel.bairro}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
