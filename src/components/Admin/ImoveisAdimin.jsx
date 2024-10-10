import axios from 'axios'
import React, { useEffect, useState } from 'react'
export default function ImoveisAdmin() {

  const [imoveis, setImoveis] = useState([])

  useEffect(() => {

      axios.get('http://localhost:3000/imovel').then(res => setImoveis(res.data) )

  }, [imoveis])

  const deleteImovel = (id) => {
    axios.delete(`http://localhost:3000/imovel/${id}`)

  }



  const handleSubmit = (e) => {

    e.preventDefault()

    const formData = new FormData();
   
    formData.append('bairro', e.target.bairro.value);
    formData.append('quartos', Number(e.target.quarto.value));
    formData.append('valor', Number(e.target.valor.value));
    formData.append('texto', e.target.texto.value);

   
    const files = e.target.img.files;
    for (let i = 0; i < files.length; i++) {
        formData.append('imagem', files[i]); 
    }

    // Envie o FormData
    axios.post('http://localhost:3000/imovel', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        console.log(res);
    }).catch(error => {
        console.log(error);
    });

  }

  

  return (

    <>
    <div className='w-[100%]  min-w-[500px] mx-auto py-20 bg-[#8f8f8f]'>
        <form action="" className='w-[60%] mx-auto' onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" name="img" id="" className='w-[100%] h-[50px] border-4 mb-5' multiple />
            <input type="text" name="bairro" id="" placeholder='Bairro' className='w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5' />
            <input type="number" name="quarto" id="" placeholder='Quartos' className='w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5' />
            <input type="number" name="valor" id="" placeholder='Valor' className='w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5' />
            <textarea name="texto" id="" className='w-[100%] h-[120px]  border-4 p-2 focus:outline-none mb-5'></textarea>
            <input type="submit" value="Enviar" className='w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5 cursor-pointer' />
            
        </form>

    </div>



    <div className='bg-[#af525200] min-h-[400px] relative  '>
        {/* <div className='bg-[#202020] z-0 w-[100%] min-h-[70%] bottom-0  absolute '></div> */}
        <div className=' z-10 w-[80%] bg-[#91e91e00] flex flex-wrap justify-center gap-3 mx-auto'>
            
          {imoveis.map((imovel) => (
          
          <div className=' bg-[#000000e7]  w-full max-w-[24%] sm:w-1/3 cursor-pointer  rounded-[5px] relative shadow-[5px_5px_10px_0px_rgba(0,0,0,0.18)]' key={imovel.id}>
            {/* <button className='absolute top-2 right-2 bg-[#000000] text-[#ffffff] p-1 rounded-[5px] hover:bg-[#ffffff] hover:text-[#000000]' onClick={() => axios.delete(`http://localhost:3000/imovel/${imovel.id}`)} >DELETAR</button> */}
            <button className='z-10 absolute top-2 right-2 bg-[#000000] text-[#ffffff] p-1 rounded-[5px] hover:bg-[#ffffff] hover:text-[#000000]' onClick={() => deleteImovel(imovel.id)} >DELETAR</button>

              {imovel.imagem.length > 0 &&(
                <img 
                className=' w-full h-auto min-h-[300px] object-cover rounded-[5px] opacity-[0.8] hover:opacity-[1] transition-opacity duration-500 ' 
                src={`http://localhost:3000/imagem/${imovel.imagem[0].imagem}`} alt="" />

              )}
                  
                  <div className=' absolute bottom-2 left-[5%] bg-[#9c232300] w-[90%] flex flex-wrap gap-2 justify-center p-2 rounded-[5px]'>
                      <div className='w-[100%] h-[100%] absolute top-0 bg-[#ffffff42]  rounded-[10px] z-0 blur-[5px]' ></div>
                      <p className=' z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4  px-3 py-1    rounded-[5px]'  >{imovel.valor}</p>
                      <p className='z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4  px-3 py-1    rounded-[5px]'  >{imovel.quartos} Quartos</p>
                      <p className='z-10 w-[100%] text-[#000000] text-center bg-[#e2e2e2e7] text-[14px] line-clamp-4  px-3 py-1    rounded-[5px]'  >{imovel.bairro}</p>
                      
                  </div>

                  
          </div>
        ))}
      
          
        
        </div>
    
    </div>
    </>


    

  )
}
