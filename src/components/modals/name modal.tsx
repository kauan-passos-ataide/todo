'use client'
import React, { useState } from 'react';

const NameModal = ({ show, onClose, onSubmit }: 
  { show: boolean; onClose: () => void; onSubmit: (title: string) => void}) => {

  const [inputValue, setInputValue] = useState("");

  if (!show) return null;

  const handleSubmit = () => {
    if (!inputValue) {
      alert("Por favor, informe o seu nome.");
      return;
    }

    onSubmit(inputValue);
    onClose();
    setInputValue("");
  };


  return (
    <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex items-center justify-center select-none">
      <div className="border-2 gap-4 border-gray-300 bg-black/70 w-11/12 lg:w-2/3 min-h-2/6 p-10 rounded-lg z-60 flex flex-col relative justify-between overflow-x-hidden overflow-y-auto">
        <div className='mt-6'>
          <div className="text-gray-300">
            <span>Digite o seu Nome:</span>
          </div>
          <div className='bg-gradient-white bg-[length:200%_200%] animate-gradient-move p-[2px] rounded-md'>
            <input type="text" 
            className='outline-none rounded-md w-full h-9 p-2 text-zinc-300 bg-zinc-900 '
            placeholder='Digite o seu primeiro nome'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        <div className='w-full pb-5'>
          <div className='bg-gradient-white bg-[length:200%_200%] animate-gradient-move p-[2px] rounded-md'>
            <button 
            onClick={handleSubmit} 
            className="px-14 py-2 w-full bg-gradient-zinc bg-[length:200%_200%] animate-gradient-move text-white rounded flex justify-center items-center hover:bg-zinc-900"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  };

export default NameModal;
