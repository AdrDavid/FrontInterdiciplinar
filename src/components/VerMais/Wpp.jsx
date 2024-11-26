const WhatsAppButton = ({ 
    phoneNumber, 
    message, 
    buttonText = 'Agende uma Visita',
    className = 'w-[300px]' 
  }) => {
    // Função para formatar o número de telefone (remove caracteres não numéricos)
    const formatPhoneNumber = (phone) => {
        if (typeof phone !== 'string') {
            console.error("O valor de 'phoneNumber' deve ser uma string.", { phone });
            phone = String(phone);
          }
      return phone.replace(/\D/g, '');
    };
  
    // Função para gerar o link do WhatsApp
    const generateWhatsAppLink = () => {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      const encodedMessage = encodeURIComponent(message);
      return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    };
  
    return (
      <a
        href={generateWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={ `w-[200px] p-[10px] text-[20px] flex justify-center items-center  bg-green-500 text-white  rounded hover:bg-green-600 transition-colors` }
      >
        {buttonText}
      </a>
    );
  };
  
  export default WhatsAppButton;
  