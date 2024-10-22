import React, { useState } from 'react'

import Banner from '../../assets/images/casa.jpg'

import Filtro from '../Filtros/Filtro'
import ImoveisContainer from '../Imoveis/ImoveisContainer'
export default function Home() {
  const [filtro, setFiltro] = useState({ valorMin: '', valorMax: '', quartos: '', bairro: '' });



  const handleFilter = (novosFiltros) => {
    setFiltro(novosFiltros);
  };


  return (
<div className='bg-[#c9c8c800]'>
    <div className='bg-[#080404] mx-auto h-[80vh] relative'>
        <img className=' z-0 absolute top-[0] opacity-[0.6] left-[0] h-[100%] w-[100%] object-cover' src={Banner} alt="" />
        <div className=' relative z-10  pt-[8%]  h-[100%] w-[40%]'>
            <h1 className='text-[60px] text-[#f1f1f1] text-center' >LOREM IPSUM</h1>
        </div>
    </div>
    
    <Filtro onFilter={handleFilter} />

    <ImoveisContainer filtros={filtro} />
    


    <div className='w-[100%] h-[300px] bg-[#777777] relative '>
                dasjdaskjndjksandkjsandjk
    </div>
</div>
  )
}
