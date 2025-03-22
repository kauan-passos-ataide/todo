"use client";
import { CornerUpLeft, Link as LinkIcon, Trash2 } from "lucide-react";
import { useState } from "react";

export const LinksModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const [links, setLinks] = useState<string[]>([]);
  const [inputLink, setInputLink] = useState("");

  const handleAddLink = () => {
    if (!inputLink.trim()) return;

    const url = inputLink.match(/^https?:\/\//) ? inputLink : `https://${inputLink}`;

    setLinks([...links, url]);
    setInputLink("");
  };

  const handleDeleteLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  if (!show) return null;

  return (
    <main className="bg-zinc-800 fixed inset-0 p-10 transition-all duration-500 overflow-x-hidden overflow-y-auto">
      <div className="flex flex-row w-full">
        <div className="flex justify-start items-center">
          <CornerUpLeft
            onClick={onClose}
            className="p-2 border-2 w-12 h-12 border-white text-white rounded-md hover:bg-red-600 transition-all duration-300 cursor-pointer"
          />
        </div>
        <div className="gap-3 text-white flex flex-row justify-center items-center w-full">
          <LinkIcon />
          <h1>Salve os seus links úteis:</h1>
        </div>
      </div>
      <div className="flex flex-row mt-10 w-full gap-5 justify-center items-center">
        <input
          type="text"
          placeholder="Adicione o link"
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
          className="py-1 px-2 rounded-md w-full lg:w-1/2"
        />
        <button
          onClick={handleAddLink}
          className="py-1 px-5 bg-white border text-zinc-800 rounded-md hover:bg-zinc-800 hover:text-white transition-all duration-500 ease-in-out hover:border-white"
        >
          Adicionar
        </button>
      </div>
      <div className="flex flex-col gap-5 w-full mt-10 mb-20">
        {links.map((link, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center p-2 border-b-2 border-zinc-200 text-white"
          >
            <div className="">
              <Trash2
                className="w-7 hover:text-red-600 cursor-pointer"
                onClick={() => handleDeleteLink(index)}
              />
            </div>
            <div className="w-full flex justify-start items-start px-5 whitespace-normal break-all">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
