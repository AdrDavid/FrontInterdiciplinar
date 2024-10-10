import React, { useState } from 'react'

export default function Filtro({onFilter}) {

  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');
  const [quartos, setQuartos] = useState('');
  const [bairro, setBairro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ valorMin, valorMax, quartos, bairro });
  };
  
  return (
    <div className='bg-[#ffffff] rounded-[5px] w-[80%] min-h-[120px] mx-auto p-4 flex justify-center  items-center relative top-[-60px] shadow-2xl'>
          <form onSubmit={handleSubmit} action="" className=' bg-[#e6777700] flex flex-wrap justify-center w-auto gap-1  '>
              <input 
                  className='placeholder:text-[#d64e3c] w-[150px] h-[40px] p-1 border-4 focus:outline-none rounded-[5px]' 
                  type="number" 
                  placeholder="Valor min" 
                  onChange={(e) => setValorMin(e.target.value)}/>
              <input 
                  className='placeholder:text-[#28af5c] w-[150px] h-[40px] p-1 border-4 focus:outline-none rounded-[5px]' 
                  type="number" 
                  placeholder="Valor max" 
                  onChange={(e) => setValorMax(e.target.value)}/>
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
                  className='cursor-pointer text-[#2383a8] border-2  border-[#379fc9]  w-[150px] h-[40px] p-1 focus:outline-none rounded-[5px]' 
                   />
              <input 
                  type="submit" 
                  value="Limpar Filtro" 
                  className='cursor-pointer text-[#2383a8] border-2  border-[#379fc9]  w-[150px] h-[40px] p-1 focus:outline-none rounded-[5px]'
                  onClick={() => {
                    setValorMin('');
                    setValorMax('');
                    setQuartos('');
                    setBairro('');
                  }} />
          </form>
    </div>
  )
}
