"use client";
import React, { useState } from "react";
import { CornerUpLeft } from "lucide-react";

const SubModal = ({
  show,
  onClose,
  onSubmit,
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  if (!show) return null;

  const handleSubmit = () => {
    if (!inputValue) {
      alert("Por favor, preencha o título e a data da tarefa.");
      return;
    }

    onSubmit(inputValue);
    onClose();
    setInputValue("");
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center select-none">
      <div className="bg-gray-100 w-11/12 lg:w-2/3 h-4/5 px-5 py-10 rounded-lg z-60 block items-center justify-center overflow-x-hidden overflow-y-auto">
        <div className="flex flex-row gap-5">
          <CornerUpLeft
            onClick={onClose}
            className="p-2 border-2 w-12 h-12 border-red-600 text-red-600 rounded-md hover:text-white hover:bg-red-600 transition-all duration-300"
          />
          <button
            onClick={handleSubmit}
            className="px-14 py-2 bg-gradient-zinc bg-[length:200%_200%] animate-gradient-move text-white rounded flex justify-center items-center hover:bg-zinc-900"
          >
            Salvar
          </button>
        </div>
        <div>
          <div className="mt-6">
            <span>Titulo</span>
          </div>
          <div className="bg-gradient-white bg-[length:200%_200%] animate-gradient-move p-[1px] rounded-md">
            <input
              type="text"
              className="outline-none rounded-md w-full h-9 p-2 text-zinc-800 "
              placeholder="Digite o título da subtarefa"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubModal;
