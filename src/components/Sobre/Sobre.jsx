import React from "react";
import sob from "../../assets/images/sob.jpg";
export default function Sobre() {
  return (
    <div className=" m-auto mt-[100px]">
      {/* <div className="2xl:w-[1400px] lg:w-[980px] md:w-[700px]  w-[95%] m-auto"> */}
      <div className="bg-[#4d4d4d] h-[70vh] min-h-[400px] bg-cover bg-sob  flex justify-end">
        <div className="bg-[#8a8a8a0c] backdrop-blur-[7px] w-[40%] p-[10px]  h-[100%]">
          <h1 className="text-[30px] text-[#000000] mt-[50px]">
            Quer vender seu imóvel?
          </h1>
          <br />
          <h2 className="text-[20px] text-[#000000]">
            Entre em contato comigo!
          </h2>
          <form action="">
            <input
              type="text"
              className="w-[90%] h-[40px] mt-[15px] m-auto"
              placeholder="Seu Nome"
            />
            <input
              type="text"
              className="w-[90%] h-[40px] mt-[15px] m-auto"
              placeholder="Seu Email"
            />
            <input type="text" className="w-[90%] h-[40px] mt-[15px] m-auto" />
          </form>
        </div>
      </div>
    </div>
  );
}
