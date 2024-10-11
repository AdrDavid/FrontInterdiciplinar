import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Banner from '../../assets/images/casa.jpg';

export default function Home() {
  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');
  const [quartos, setQuartos] = useState('');
  const [bairro, setBairro] = useState('');
  const [imoveis, setImoveis] = useState([]);
  const [imoveisFiltrados, setImoveisFiltrados] = useState([]);

  // Buscar imóveis ao carregar a página
  useEffect(() => {
    const getImoveis = async () => {
      const res = await axios.get('http://localhost:3000/imovel');
      setImoveis(res.data);
      setImoveisFiltrados(res.data); // Começa mostrando todos os imóveis
    };
    getImoveis();
  }, []);

  // Atualizar os imóveis filtrados sempre que o filtro mudar
  useEffect(() => {
    const filtrarImoveis = () => {
      const novosImoveisFiltrados = imoveis.filter((imovel) => {
        return (
          (valorMin ? imovel.valor >= valorMin : true) &&
          (valorMax ? imovel.valor <= valorMax : true) &&
          (quartos ? imovel.quartos >= quartos : true) &&
          (bairro ? imovel.bairro.toLowerCase().includes(bairro.toLowerCase()) : true)
        );
      });
      setImoveisFiltrados(novosImoveisFiltrados);
    };

    filtrarImoveis();
  }, [valorMin, valorMax, quartos, bairro, imoveis]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='bg-[#c9c8c800]'>
      {/* Seção de banner */}
      <div className='bg-[#080404] mx-auto p-5 h-[80vh] relative'>
        <img className='z-0 absolute top-[0] opacity-[0.6] left-[0] h-[100%] w-[100%] object-cover' src={Banner} alt="" />
        <div className='bg-[#bdbdbd00] relative z-10  p-[30px] mt-[60px] min-h-[200px] w-[40%]'>
          <h1 className='text-[60px] text-[#f1f1f1] text-center'>LOREM IPSUM</h1>
        </div>
      </div>

      {/* Seção de filtros */}
      <div className='bg-[#ffffff] rounded-[5px] w-[80%] min-h-[120px] mx-auto p-4 flex justify-center items-center relative top-[-60px] shadow-2xl'>
        <form onSubmit={handleSubmit} className='bg-[#e6777700] flex flex-wrap justify-center w-auto gap-1'>
          <input
            className='placeholder:text-[#d64e3c] w-[150px] h-[40px] p-1 border-4 focus:outline-none rounded-[5px]'
            type="number"
            placeholder="Valor min"
            onChange={(e) => setValorMin(e.target.value)} />
          <input
            className='placeholder:text-[#28af5c] w-[150px] h-[40px] p-1 border-4 focus:outline-none rounded-[5px]'
            type="number"
            placeholder="Valor max"
            onChange={(e) => setValorMax(e.target.value)} />
          <input
            className='w-[150px] h-[40px] p-1 focus:outline-none rounded-[5px] border-4'
            type="number"
            placeholder="Quartos"
            onChange={(e) => setQuartos(e.target.value)} />
          <input
            className='placeholder:text-[#d64e3c] w-[150px] h-[40px] p-1 border-4 focus:outline-none rounded-[5px]'
            type="text"
            placeholder="Bairro"
            onChange={(e) => setBairro(e.target.value)} />
          <input
            type="submit"
            value="Pesquisar"
            className='cursor-pointer text-[#2383a8] border-2  border-[#379fc9]  w-[150px] h-[40px] p-1 focus:outline-none rounded-[5px]' />
          <input
            type="button"
            value="Limpar Filtro"
            className='cursor-pointer text-[#2383a8] border-2  border-[#379fc9]  w-[150px] h-[40px] p-1 focus:outline-none rounded-[5px]'
            onClick={() => {
              setValorMin('');
              setValorMax('');
              setQuartos('');
              setBairro('');
              setImoveisFiltrados(imoveis); // Reseta a lista de imóveis
            }} />
        </form>
      </div>

      {/* Seção de imóveis */}
      <div className='bg-[#af525200] min-h-[400px] relative'>
        <div className='z-10 w-[80%] bg-[#91e91e00] flex flex-wrap justify-center gap-3 mx-auto'>
          {imoveisFiltrados.length > 0 ? (
            imoveisFiltrados.map((imovel) => (
              <div className='bg-[#000000e7] w-full max-w-[24%] sm:w-1/3 cursor-pointer rounded-[5px] relative shadow-[5px_5px_10px_0px_rgba(0,0,0,0.18)]' key={imovel.id}>
                {imovel.imagem.length > 0 && (
                  <img
                    className='w-full h-auto min-h-[300px] object-cover rounded-[5px] opacity-[0.8] hover:opacity-[1] transition-opacity duration-500'
                    src={`http://localhost:3000/imagem/${imovel.imagem[0].imagem}`}
                    alt="" />
                )}
                <div className='absolute bottom-2 left-[5%] bg-[#9c232300] w-[90%] flex flex-wrap gap-2 justify-center p-2 rounded-[5px]'>
                  <div className='w-[100%] h-[100%] absolute top-0 bg-[#ffffff42] rounded-[10px] z-0 blur-[5px]'></div>
                  <p className='z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4 px-3 py-1 rounded-[5px]'>{imovel.valor}</p>
                  <p className='z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4 px-3 py-1 rounded-[5px]'>{imovel.quartos} Quartos</p>
                  <p className='z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4 px-3 py-1 rounded-[5px]'>{imovel.bairro}</p>
                </div>
                <Link className='absolute top-0 left-0 w-[100%] h-[100%]' to={`/vermais/${imovel.id}`}></Link>
              </div>
            ))
          ) : (
            <p>Nenhum imóvel encontrado.</p>
          )}
        </div>
      </div>

      {/* Seção de rodapé */}
      <div className='w-[100%] h-[300px] bg-[#777777] relative'>
        dasjdaskjndjksandkjsandjk
      </div>
    </div>
  );
}
