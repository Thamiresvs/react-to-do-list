import React, { useState } from "react";
import { FaTrash, FaPlus, FaCheck } from "react-icons/fa";
import { Tooltip, TooltipProvider } from "react-tooltip"; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Função para adicionar uma nova tarefa
  const addTask = () => {
    if (task) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  // Função para remover uma tarefa
  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Função para marcar uma tarefa como concluída
  const toggleComplete = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        {/* Container principal */}
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">To-Do List</h1>

          {/* Input e botão para adicionar tarefas */}
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Adicionar tarefa..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              data-tooltip-id="input-tooltip"
            />
            <Tooltip id="input-tooltip">Digite sua nova tarefa aqui</Tooltip>
            <button
              onClick={addTask}
              className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-600 transition-colors"
              data-tooltip-id="add-task-tooltip"
            >
              <FaPlus className="mr-1" />
            </button>
            <Tooltip id="add-task-tooltip">Adicionar nova tarefa</Tooltip>
          </div>

          {/* Lista de tarefas */}
          <ul>
            {tasks.map((t, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-2 mb-2 border-b border-gray-200 ${
                  t.completed ? 'text-gray-500 line-through' : 'text-black'
                }`}
              >
                <span>{t.text}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => toggleComplete(index)}
                    className={`mr-2 px-2 py-1 rounded ${
                      t.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-black hover:bg-gray-300'
                    }`}
                    data-tooltip-id={`toggle-complete-tooltip-${index}`}
                  >
                    {t.completed ? <FaCheck /> : <FaCheck />}
                  </button>
                  <Tooltip id={`toggle-complete-tooltip-${index}`}>
                    {t.completed ? "Marcar como não concluído" : "Marcar como concluído"}
                  </Tooltip>
                  <button
                    onClick={() => removeTask(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                    data-tooltip-id={`remove-task-tooltip-${index}`}
                  >
                    <FaTrash className="mr-1" />
                  </button>
                  <Tooltip id={`remove-task-tooltip-${index}`}>Excluir tarefa</Tooltip>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
