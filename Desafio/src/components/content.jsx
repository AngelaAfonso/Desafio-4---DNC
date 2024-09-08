import React, { useState } from 'react';
import './style.css';
import pencil from "../assets/pencil.svg";
import trash from "../assets/trash.svg";
import plus from "../assets/plus.svg";

const Content = () => {
    const [tasks, setTasks] = useState([
        { text: 'Limpar a casa', completed: false },
        { text: 'Responder e-mails', completed: false }
    ]);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const handleToggleTask = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleEditTask = (index) => {
        setEditingIndex(index);
        setEditingText(tasks[index].text);
    };

    const handleSaveEdit = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: editingText } : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditingText('');
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditingText('');
    };

    return (
        <div className="content">
            <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
            <div className="list">
                <div className="titles">
                    <p>Tarefa</p>
                    <p>Status</p>
                    <p>Opções</p>
                </div>
                <div id="line"></div>
                {tasks.map((task, index) => (
                    <div className="chore-section" key={index}>
                        {editingIndex === index ? (
                            <input
                                type="text"
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                            />
                        ) : (
                            <p>{task.text}</p>
                        )}
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTask(index)}
                        />
                        <div className="chore-images">
                            {editingIndex === index ? (
                                <>
                                    <button id="save-cancel" onClick={() => handleSaveEdit(index)}>Salvar</button>
                                    <button id="save-cancel" onClick={handleCancelEdit}>Cancelar</button>
                                </>
                            ) : (
                                <>
                                    <img src={pencil} alt="Edit" onClick={() => handleEditTask(index)} />
                                    <img src={trash} alt="Delete" onClick={() => handleDeleteTask(index)} />
                                </>
                            )}
                        </div>
                    </div>
                ))}
                <div className="chore-section">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Nova Tarefa..."
                    />
                    <div className="chore-images">
                        <img src={plus} alt="Add" onClick={handleAddTask} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
