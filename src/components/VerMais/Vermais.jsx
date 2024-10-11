import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link, useParams } from 'react-router-dom'
import './Swiper.css'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


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
            <Swiper className='rounded-[5px] overflow-hidden '
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                

                {imoveis.imagem?.map((img, index) => (
                    <SwiperSlide className=' '>
                       
                        <div className='w-full xl:h-[90vh] lg:h-[80vh] md:h-[70vh] sm:h-[60vh] h-[300px]'>

                            <img 
                                key={index}
                                className='w-full  h-full object-cover  rounded-[5px]  '
                                src={`http://localhost:3000/imagem/${img.imagem}`} 
                                alt={`Imagem ${index + 1} do imóvel`}
                            />
                        </div>
                    </SwiperSlide>

                    
                    
                ))}
                
            </Swiper>
              
             

            

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
