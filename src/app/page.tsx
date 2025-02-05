'use client'
import Modal from '@/components/modais/modal';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { SubTodo, TodoList } from '@/types/TodoList';
import React, { useCallback, useEffect, useState } from 'react';
import { Pencil, CircleUser } from 'lucide-react';
import NameModal from '@/components/modais/name modal';

const Home = () => {

  const [showModal, setShowModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [attModal, setAttModal] = useState<boolean>(false);
  const [user, setUser] = useState('');
  const [sistemInitialize, setSistemInitialize] = useState(true);
  const [todoItem, setTodoItem] = useState<TodoList[]>([]);
  const [subTodoItem, setSubTodoItem] = useState<SubTodo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDateToAdd, setSelectedDateToAdd] = useState<string | undefined>(undefined);
  const [titleToAdd, setTitleToAdd] = useState<string>("");
  const [shouldAddTask, setShouldAddTask] = useState<boolean>(false);

  if (typeof window !== "undefined") {
    if(sistemInitialize) {
      if(localStorage.hasOwnProperty("todoItem")) {
        setTodoItem(JSON.parse(localStorage.getItem("todoItem")!));
      }
      if(localStorage.hasOwnProperty("user")) {
        setUser(localStorage.getItem("user")!);
        setShowNameModal(false);
      }
      
      setSistemInitialize(false);
    }
  }
  
  useEffect(() => {
    localStorage.setItem("todoItem", JSON.stringify(todoItem));
  },[todoItem]);

  useEffect(() => {
    localStorage.setItem("user", user);
  },[user]);
  

  const handleTaskClick = (taskId: number) => {
    setExpandedTask(taskId === expandedTask ? null : taskId);
  };

  const onOpenModal = () => {
    setShowEditModal(true);
  }

  const onCloseModal = () => {
    setAttModal(true);
  }
  const changeAttModal = () => {
    setAttModal(false);
  }
  
  useEffect(() => {
    if (attModal) {
      changeAttModal();
      setShowEditModal(false);
    }
  },[attModal]);
  
  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  const handleChange = (title: string, date: Date | undefined, subTodoForAdd: SubTodo[], idToChange?: number, deleteItem?: boolean) => {
    if (deleteItem) {
      setTodoItem(prevTodoItem => prevTodoItem.filter(item => item.id!== idToChange));
      return;
    }
    if (idToChange) {
      setTodoItem((prevTodoItem) =>
        prevTodoItem.map((item, index) =>
          index + 1 === idToChange? {...item, label: title, createdAt: date? date.toLocaleDateString("pt-BR"):date, checked: false, subTodo: subTodoForAdd} : item
        )
      )
    } else {
      setSelectedDateToAdd(date?date.toLocaleDateString("pt-BR"):date);
      setTitleToAdd(title);
      setSubTodoItem(subTodoForAdd);
      setShouldAddTask(true);
    }
  };

  const handleAddTask = useCallback(() => {
    const newTodo = {
        id: todoItem.length > 0 ? Math.max(...todoItem.map((item) => item.id)) + 1 : 1,
        label: titleToAdd,
        checked: false,
        createdAt: selectedDateToAdd,
        subTodo: subTodoItem,
      };
      console.log(titleToAdd)
      setTodoItem([...todoItem, newTodo]);
  }, [titleToAdd, selectedDateToAdd, todoItem, subTodoItem]);

  useEffect(() => {
    if (shouldAddTask) {
      handleAddTask();
      setShouldAddTask(false); 
    }
  },[handleAddTask, shouldAddTask]);
  

  const toggleItem = (itemIndex: number) => {
    setTodoItem(todoItem.map((item) => item.id === itemIndex? {...item, checked: !item.checked} : item))
  };  

  const toggleSubTodo = (itemIndex: number, subTodoIndex: number) => {
    setTodoItem(todoItem.map((item) => item.id === itemIndex? 
    {...item, subTodo: item.subTodo.map((subItem) => subItem.id === subTodoIndex? 
      {...subItem, checked: !subItem.checked} : subItem)} : item))
  }; 


  const filteredTodos = selectedDate?.toLocaleDateString('pt-BR')
    ? todoItem.filter(
        (item) =>
          item.createdAt === selectedDate.toLocaleDateString('pt-BR') &&
          item.checked === false
      )
    : [];

    const countChecked = filteredTodos.length;

    const filteredNoChecked = selectedDate?.toLocaleDateString('pt-BR')
    ? todoItem.filter(
        (item) =>
          item.createdAt === selectedDate.toLocaleDateString('pt-BR') &&
          item.checked === true
      )
    : [];

    const countNoChecked = filteredNoChecked.length;

  return (
    <div className="block h-screen w-screen items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-100">
      <div className='bg-zinc-800 w-full h-[250px] p-6 inset-0 flex flex-col items-center z-0 text-white'>
        <div className='w-full relative justify-start items-start'>
          <CircleUser className='w-7 h-7 cursor-pointer' onClick={() => setShowNameModal(true)}/>
        </div>
        <div className='flex flex-col lg:flex-row w-full justify-center items-center lg:justify-between lg:pr-60 pb-16 lg:pl-28 select-none gap-4'>
          <div className='bg-gradient-white bg-[length:200%_200%] animate-gradient-move p-[2px] rounded-md'>
            <span className='px-3 py-1 bg-zinc-800 rounded-md'>
              {`Olá ${user}, seja bem-vindo(a)!`}
            </span>
          </div>
          <div className='text-zinc-800'>
            <DatePicker 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
        </div>
      </div>
      <div className='w-full p-6 flex flex-col z-10'>
        <div className='bg-white rounded-xl p-2 w-full min-h-32 -mt-32'>
          <div className='w-full border-b border-zinc-500 text-zinc-700 flex items-center justify-center'>
            <span>{`${countChecked} tarefas em andamento`}</span>
          </div>
          <div>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((item) => (
                <div key={item.id} className={`${expandedTask === item.id ? 'bg-gradient-white bg-[length:200%_200%] animate-gradient-move p-[2px] rounded-xl' : 'p-0'}`}>
                  <div className="py-2 bg-white rounded-t-xl px-5 lg:px-14 flex justify-between border-b border-zinc-200 cursor-pointer select-none">
                    <div className='w-12 border-r border-zinc-300' onClick={() => onOpenModal()}>
                      <Pencil className='text-gray-800 w-4'/>
                      <Modal
                      show={showEditModal} 
                      onClose={() => onCloseModal()}
                      onAddNewTask={() => handleAddTask()}
                      onSubmit={handleChange}
                      onDate={selectedDate}
                      todoForEdit={item}
                      />
                    </div>
                    <div className='w-full flex justify-start items-start px-5 whitespace-normal' onClick={() => handleTaskClick(item.id)}>
                      <span>{item.label}</span>
                    </div>
                    <div className='w-12 border-l border-zinc-300 flex justify-end items-end' onClick={() => toggleItem(item.id)}>
                      <Checkbox checked={item.checked}/>
                    </div>
                  </div>
                  <div className='w-full select-none'>
                    {expandedTask === item.id && (
                      <div className='rounded-b-xl bg-white'>
                        {item.subTodo.map((todo) => (
                          <div key={todo.id} className="w-full bg-white rounded-b-xl">
                            <div className="py-2 px-4 lg:px-14 flex justify-between border-b-2 border-zinc-200 rounded-b-xl cursor-pointer">
                              <div className='w-full flex justify-start items-start text-zinc-700 whitespace-normal'>
                                <span>{todo.label}</span>
                              </div>
                              <div className='w-12 border-l border-zinc-300 flex justify-end items-end' onClick={() => toggleSubTodo(item.id, todo.id)}>
                                <Checkbox checked={todo.checked}/>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-500 pt-3">Nenhuma tarefa encontrada</p>
            )}
          </div>
        </div>
        <div className='bg-white rounded-xl p-2 w-full min-h-32 mt-8 mb-8'>
          <div className='w-full border-b border-zinc-500 text-zinc-700 flex items-center justify-center'>
            <span>{`${countNoChecked} tarefas finalizadas`}</span>
          </div>
          <div>
            {filteredNoChecked.length > 0 ? (
              filteredNoChecked.map((item) => (
                <div key={item.id} className={`${expandedTask === item.id ? 'bg-gradient-white bg-[length:200%_200%] animate-gradient-move p-[2px] rounded-xl' : 'p-0'}`}>
                  <div className="py-2 px-5 lg:px-14 flex rounded-t-xl bg-white justify-between border-b-2 border-zinc-200 cursor-pointer select-none">
                    <div className='w-12 border-r border-zinc-300' onClick={() => onOpenModal()}>
                      <Pencil className='text-gray-800 w-4'/>
                      <Modal
                      show={showEditModal} 
                      onClose={() => onCloseModal()}
                      onAddNewTask={() => handleAddTask()}
                      onSubmit={handleChange}
                      onDate={selectedDate}
                      todoForEdit={item}
                      />
                    </div>
                    <div className='w-full flex justify-start items-start px-5 text-zinc-700 line-through whitespace-normal' onClick={() => handleTaskClick(item.id)}>
                      <span>{item.label}</span>
                    </div>
                    <div className='w-12 border-l border-zinc-300 flex justify-end items-end' onClick={() => toggleItem(item.id)}>
                      <Checkbox checked={item.checked}/>
                    </div>
                  </div>
                  <div className='w-full select-none'>
                    {expandedTask === item.id && (
                      <div className="bg-white rounded-b-xl">
                        {item.subTodo.map((todo) => (
                          <div key={todo.id} className="w-full rounded-b-xl">
                            <div className="py-2 px-4 lg:px-14 flex justify-between border-b border-zinc-200 rounded-b-xl cursor-pointer">
                              <div className='w-full flex justify-start items-start text-zinc-700 whitespace-normal'>
                                <span>{todo.label}</span>
                              </div>
                              <div className='w-12 border-l border-zinc-300 flex justify-end items-end' onClick={() => toggleSubTodo(item.id, todo.id)}>
                                <Checkbox checked={todo.checked}/>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-500 pt-3">Nenhuma tarefa finalizada</p>
            )}
          </div>
        </div>
      </div>
      <div className='z-20 py-10 w-full h-14 fixed bottom-0 flex justify-center items-center'>
        <button
          onClick={() => setShowModal(true)}
          className="p-6 bg-gradient-zinc bg-[length:200%_200%] animate-gradient-move text-white rounded-full w-5 h-5 flex justify-center items-center text-xl hover:bg-zinc-800"
        >
          +
        </button>
        <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)}
        onAddNewTask={() => handleAddTask()}
        onSubmit={handleChange}
        />
        <NameModal 
        show={showNameModal}
        onClose={() => setShowNameModal(false)}
        onSubmit={setUser}
        />
      </div>
    </div>
  );
};

export default Home;
