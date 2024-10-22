import React, { useEffect, useState } from 'react'
import Imoveis from './Imoveis'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function ImoveisContainer({filtros}) {

  const [imoveis, setImoveis] = useState([])
  const [imoveisFiltrados, setImoveisFiltrados] = useState([]);

  useEffect(() => {

    
    const getImoveis = () => {
      
      axios.get('http://localhost:3000/imovel').then(res => setImoveis(res.data) )
    }
    getImoveis()
      


  }, [])


  useEffect(() => {
    const filtrarImoveis = () => {
      const { valorMin, valorMax, quartos, bairro } = filtros;
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
  }, [filtros, imoveis]);


  return (

   



    <div className='bg-[#af525200] min-h-[400px] relative  '>
        
        <div className=' z-10 2xl:w-[1400px] lg:w-[980px] md:w-[700px]  w-[95%] flex flex-wrap justify-center gap-3 mx-auto'>
           
        {imoveisFiltrados.map((imovel) => (
      
          <div className=' bg-[#000000e7]   2xl:w-[24%] lg:w-[32%] md:w-[48%] sm:w-[48%] w-[95%]    cursor-pointer  rounded-[5px] relative shadow-[5px_5px_10px_0px_rgba(0,0,0,0.18)]' key={imovel.id}>


          {imovel.imagem.length > 0 &&(
            <img 
            className=' w-full  md:h-[400px] sm:h-[400px] h-[500px] object-cover rounded-[5px] opacity-[0.8] hover:opacity-[1] transition-opacity duration-500 ' 
            src={`http://localhost:3000/imagem/${imovel.imagem[0].imagem}`} alt="" />

          )}
              
              <div className=' absolute bottom-2 left-[5%] bg-[#9c232300] w-[90%] flex flex-wrap gap-2 justify-center p-2 rounded-[5px]'>
                  <div className='w-[100%] h-[100%] absolute top-0 bg-[#ffffff42]  rounded-[10px] z-0 blur-[5px]' ></div>
                  <p className=' z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4  px-3 py-1   
                   rounded-[5px]'  >{imovel.valor.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                  <p className='z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4  px-3 py-1    
                  rounded-[5px]'  >{imovel.quartos} Quartos</p>
                  <p className='z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4  px-3 py-1    
                  rounded-[5px]'  >{imovel.bairro}</p>
                  
              </div>

              <Link className='absolute top-0 left-0 w-[100%] h-[100%] ' to={`/vermais/${imovel.id}`} ></Link>
      </div>
  ))}
          
        
        </div>
    
    </div>
  )
}
