'use client'
const InfoModal = ({ show, onClose}: 
  { show: boolean; onClose: () => void}) => {

  if (!show) return null;


  return (
    <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex items-center justify-center select-none">
      <div className="border-2 border-gray-300 bg-black/70 w-11/12 h-3/6 lg:w-2/3 lg:h-[40%] p-10 rounded-lg z-60 flex flex-col relative justify-between overflow-x-hidden overflow-y-auto">
        <div className='mt-6'>
          <div className='bg-gradient-white bg-[length:200%_200%] animate-gradient-move p-[2px] rounded-md'>
            <div className='bg-white p-2 rounded-md'>
              <h1 className='text-xl'>Sobre o projeto:</h1>
              <p className='mt-4 text-center'>
                Este é um projeto open source, criado por 
                <a className='font-bold text-orange-500' href='https://www.instagram.com/kauan.gkpa/?hl=pt-br' target='_black'> Kauan Passos Ataide [ Seguir ] </a> 
                que utiliza armazenamento local, sendo aberto para que todos possam utilizar de forma gratuita todos os serviços disponíveis, não podendo comercializar ou utilizar o mesmo para fins lucrativos!
              </p>
            </div>
          </div>
        </div>
        <div className='w-full pb-5'>
          <div className='bg-gradient-white bg-[length:200%_200%] animate-gradient-move p-[2px] rounded-md'>
            <button 
            onClick={() => onClose()} 
            className="px-14 py-2 w-full bg-gradient-zinc bg-[length:200%_200%] animate-gradient-move text-white rounded flex justify-center items-center hover:bg-zinc-900"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  };

export default InfoModal;
