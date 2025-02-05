'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker } from '../ui/date-picker';
import { SubTodo, TodoList } from '@/types/TodoList';
import { Trash2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import SubModal from './sub modal';

const Modal = ({ show, onClose, onSubmit, todoForEdit, onDate }: 
  { show: boolean; 
    onClose: () => void; 
    onAddNewTask: () => void; 
    onSubmit: (title: string, date: Date | undefined, titleSubTodo: SubTodo[], idTodo?: number, deleteItem?: boolean) => void; 
    todoForEdit?: TodoList; 
    onDate?: Date}
  ) => {

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(onDate || undefined);
  const [inputValue, setInputValue] = useState(todoForEdit?.label || "");
  const [showModal, setShowModal] = useState(false);
  const [titleToAdd, setTitleToAdd] = useState<string>("");
  const [shouldAddTask, setShouldAddTask] = useState<boolean>(false);
  const [subTodoItem, setSubTodoItem] = useState<SubTodo[]>(todoForEdit?.subTodo || []);

  const handleAddTask = useCallback(() => {
      const newSubTodo = {
          id: subTodoItem.length > 0 ? Math.max(...subTodoItem.map((item) => item.id)) + 1 : 1,
          label: titleToAdd,
          checked: false,
        };
        setSubTodoItem([...subTodoItem, newSubTodo]);
    }, [titleToAdd, subTodoItem]);

  useEffect(() => {
      if (shouldAddTask) {
        handleAddTask();
        setShouldAddTask(false); 
      }
    },[handleAddTask, shouldAddTask]);
    
  if (!show) return null;

  const toggleItem = (itemIndex: number) => {
    setSubTodoItem(subTodoItem.map((item) => item.id === itemIndex? {...item, checked: !item.checked} : item))
  };

  const handleChange = (title: string) => {
    setTitleToAdd(title);
    setShouldAddTask(true);
  };

  const removeTask = (id: number) => {
    setSubTodoItem(prevTodoItem => prevTodoItem.filter(item => item.id!== id));
  }

  const handleSubmit = () => {
    if (!inputValue || !selectedDate) {
      alert("Por favor, preencha o título e a data da tarefa.");
      return;
    }
    if (todoForEdit) {
      onSubmit(inputValue, selectedDate, subTodoItem, todoForEdit.id);
    } else {
      onSubmit(inputValue, selectedDate, subTodoItem)
    }
    onClose();
    setInputValue("");
    setSelectedDate(undefined);
    setSubTodoItem([]);
  };

  const handleDelete = () => {
    onSubmit(inputValue, selectedDate, subTodoItem, todoForEdit?.id, true);

    onClose();
    setInputValue("");
    setSelectedDate(undefined);
    setSubTodoItem([]);
  };



  return (
    <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-100 w-11/12 lg:w-2/3 h-4/5 p-10 rounded-lg z-60 block items-center justify-center overflow-x-hidden overflow-y-auto">
        <div className='flex flex-row gap-5 select-none justify-between'>
          <button onClick={onClose} className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-md hover:text-white hover:bg-red-600 transition-all duration-300">
            Fechar
          </button>
          <button onClick={handleSubmit} className="px-14 py-2 w-full bg-gradient-zinc bg-[length:200%_200%] animate-gradient-move text-white rounded flex justify-center items-center hover:bg-zinc-900 select-none">
            Salvar
          </button>
          {todoForEdit? (
            <button onClick={handleDelete} className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-md hover:text-white hover:bg-red-600 transition-all duration-300">
              <Trash2 />
            </button>
          )
          : []}
        </div>
        <div>
          <div className="mt-6 select-none">
            <span>Titulo</span>
          </div>
          <div className='bg-gradient-white bg-[length:200%_200%] animate-gradient-move p-[1px] rounded-md'>
            <input type="text" 
            className='outline-none border rounded-md w-full h-9 p-2 text-zinc-800'
            placeholder='Digite o título da tarefa'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="mt-6 select-none">
            <span>Data</span>
          </div>
          <div className='select-none'>
            <DatePicker 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
        </div>
        <div className='z-70 min-h-32 select-none'>
          <div className="mt-6 flex flex-col gap-6">
            <span>Sub tarefas</span>
            <button 
            onClick={() => setShowModal(true)} 
            className='px-14 py-2 bg-gradient-zinc bg-[length:200%_200%] animate-gradient-move text-white rounded flex justify-center items-center hover:bg-zinc-900'
            >
              Adicionar sub tarefa
            </button>
            <SubModal
            show={showModal} 
            onClose={() => setShowModal(false)}
            onSubmit={handleChange}
            />
          </div>
          <div className=''>
            {subTodoItem.map((item) => (
                <div key={item.id}>
                  <div className="py-2 bg-white mt-4 px-5 lg:px-14 flex justify-between border-b-2 rounded-b-xl border-zinc-200 cursor-pointer select-none">
                    <div className='w-12 border-r border-zinc-300' onClick={() => removeTask(item.id)}>
                      <Trash2 className='text-gray-800 w-4 hover:text-red-500'/>
                    </div>
                    <div className='w-full flex justify-start items-start px-5 text-zinc-700 whitespace-normal'>
                      <span>{item.label}</span>
                    </div>
                    <div className='w-12 border-l border-zinc-300 flex justify-end items-end' onClick={() => toggleItem(item.id)}>
                      <Checkbox checked={item.checked}/>
                    </div>
                  </div>
                  <div className='w-full select-none'>
                    
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
