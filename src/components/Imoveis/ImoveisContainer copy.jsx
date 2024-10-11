import React from 'react'
import Imoveis from './Imoveis'
export default function ImoveisContainer({filtros}) {
  return (



    <div className='bg-[#af525200] min-h-[400px] relative  '>
        
        <div className=' z-10 w-[80%] bg-[#91e91e00] flex flex-wrap justify-center gap-3 mx-auto'>
           
          <Imoveis filtros={filtros} />
          
        
        </div>
    
    </div>
  )
}
