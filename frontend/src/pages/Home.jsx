import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const navigate = useNavigate();

    //
    const fetchTasks = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/todos');
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    }, []);

   useEffect(() => {
    fetchTasks(); 
    }, []);


    
const totalTasks = tasks.length;
const completedTasks = tasks.filter(t => t.completed).length;
const pendingTasks = totalTasks - completedTasks;

   
    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/todos/add', { 
                task: title,
                description: description 
            });
            setTitle('');
            setDescription('');
            fetchTasks(); 
        } catch (err) {
            console.error(err);
            alert("Task input successful");
        }
    };

    // 3. Task delete
    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this?")) {
            try {
                await axios.delete(`http://localhost:5000/api/todos/${id}`);
                fetchTasks();
            } catch (err) {
                console.error(err);
                alert("delete failed");
            }
        }
    };

    
    const handleToggleComplete = async (id, currentStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/todos/${id}`, {
                completed: !currentStatus 
            });
            fetchTasks(); 
        } catch (err) {
            console.error("Status update error", err);
        }
    };

    const handleEditClick = (t) => {
        setEditId(t._id);
        setEditTitle(t.task);
        setEditDescription(t.description || '');
    };

    const handleUpdateTask = async () => {
        try {
            await axios.put(`http://localhost:5000/api/todos/${editId}`, {
                task: editTitle,
                description: editDescription
            });
            setEditId(null);
            fetchTasks();
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    return (
        <div className="home-container">
            <nav className="navbar">
                <h2>My To-Do</h2>
                <div className="nav-links">
                    <span onClick={() => navigate('/home')}>Home</span>
                    <span onClick={() => navigate('/pending')}>Pending</span>
                    <span onClick={() => navigate('/completed')}>Completed</span>
                    <span onClick={() => navigate('/')} style={{color: '#ff6b6b'}}>Logout</span>
                </div>
            </nav>


                    {/* --- Dashboard Cards --- */}
        <div className="dashboard-stats">
            <div className="stat-card total">
                <h3>Total</h3>
                <p>{totalTasks}</p>
            </div>
            <div className="stat-card pending">
                <h3>Pending</h3>
                <p>{pendingTasks}</p>
            </div>
            <div className="stat-card completed">
                <h3>Completed</h3>
                <p>{completedTasks}</p>
            </div>
        </div>
        {/* --- Dashboard Cards end --- */}



            <form className="task-form" onSubmit={handleAddTask}>
                <input type="text" placeholder="Task Name" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" className="btn-add">Add Task</button>
            </form>

            <div className="task-list">
                {tasks.map((t) => (
                    <div key={t._id} className={`task-item ${t.completed ? 'completed-item' : ''}`}>
                        <div className="task-info">
                            {editId === t._id ? (
                                <div className="edit-mode-ui">
                                    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                    <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                                    <button onClick={handleUpdateTask} className="btn-update">Update</button>
                                    <button onClick={() => setEditId(null)} className="btn-cancel">Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <h3 style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.task}</h3>
                                    <p>{t.description || "No description"}</p>
                                </>
                            )}
                        </div>
                        
                        {editId !== t._id && (
                            <div className="action-btns">
                                <button 
                                    className={t.completed ? "btn-undo" : "btn-complete"} 
                                    onClick={() => handleToggleComplete(t._id, t.completed)}
                                >
                                    {t.completed ? "Undo" : "Done"}
                                </button>
                                <button className="btn-edit" onClick={() => handleEditClick(t)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(t._id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
