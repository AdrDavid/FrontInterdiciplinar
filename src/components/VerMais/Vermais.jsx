import axios from 'axios'
import React, {useState, useEffect} from 'react'

import { Link, useParams } from 'react-router-dom'

export default function Vermais() {
    const [imoveis, setImoveis] = useState({})
    const {id} = useParams()
    useEffect(() => {

        
        axios.get(`http://localhost:3000/imovel/${id}`).then(res => setImoveis(res.data))

        

    }, [id])

    

  return (
    <>
        <div className='w-[80%] h-[100px] text-[#1d1d1d] p-2 bg-[#dd7c7c00] flex justify-between items-end mx-auto shadow-[0px_20px_30px_-4px_rgba(0,0,0,0.18)] '>
            <h1 className='text-[40px]'>Título</h1>
            <Link 
                to='/'
                className=' bg-[#6cd35800] underline decoration-4  text-[#1d1d1d]  top-0 right-0 text-[40px] '
            >Home</Link>
        </div>

        <div className='w-[80%] mx-auto min-h-[700px] bg-[#ffffff] mt-[50px]'>
            <div className='w-[100%] mx-auto min-h-[500px] bg-[#202020] mt-[50px]'>

              
             {imoveis.imagem?.map((img, index) => (
                <img 
                    key={index}
                    className='w-full h-auto min-h-[300px] object-cover rounded-[5px] opacity-[0.8] hover:opacity-[1] transition-opacity duration-500'
                    src={`http://localhost:3000/imagem/${img.imagem}`} 
                    alt={`Imagem ${index + 1} do imóvel`}
                />
            ))}

            
            </div>

            <div className='flex justify-between'>

            <div className='w-[50%] mx-auto  bg-[#2c532000] mt-[20px]'>
                <div>

                </div>
                <p className='text-[22px]'><span className='text-[22px] text-[#1f1f1f]'>Bairro - </span>{imoveis.bairro}</p>
                <br />
                <p className='text-[22px]'><span className='text-[22px] text-[#1f1f1f]'>Quartos - </span>{imoveis.quarto}</p>
                <br />
                <p className='text-[22px]'><span className='text-[22px] text-[#1f1f1f]'>VAlor - </span>{imoveis.valor}</p>
               
                
            </div>
            <div className='w-[50%] mx-auto  bg-[#20405300] mt-[20px]'>
                <p className='text-[20px] text-justify  text-[#1f1f1f]'>{imoveis.texto}</p>
            </div>
            
            </div>

        </div>

        <div className='w-[80%] mx-auto min-h-[700px] bg-[#ffffff] mt-[200px]'>
            <h1 className='text-[26px] text-[#1d1d1d] max-w-[600px] mx-auto'>Entre em contato conosco</h1>
            <br />
            <form action="" className='max-w-[600px] mx-auto'>
                <input type="Eail" name="" id="" placeholder='Email' className='w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5' />
                <input type="Eail" name="" id="" placeholder='Email' className='w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5' />
                <textarea name="" id="" className='w-[100%] min-h-[100px] border-4 p-2 focus:outline-none mb-5'></textarea>
                <input type="submit" value="Enviar" className='w-[100%] h-[50px] border-4 p-2 focus:outline-none mb-5 cursor-pointer' />
            </form>
        </div>
    </>
  )
}
