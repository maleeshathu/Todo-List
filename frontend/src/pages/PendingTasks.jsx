import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Home.css එකම පාවිච්චි කළ හැකියි

const PendingTasks = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const fetchPendingTasks = useCallback(async () => {
        try {
            // Backend එකේ pending ලැයිස්තුව පමණක් ලබාගන්නා URL එක
            const res = await axios.get('http://localhost:5000/api/todos');
            const pending = res.data.filter(t => !t.completed);
            setTasks(pending);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        fetchPendingTasks();
    }, [fetchPendingTasks]);

    const handleToggleComplete = async (id, currentStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !currentStatus });
            fetchPendingTasks();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="home-container">
            <nav className="navbar">
                <h2>Pending Tasks</h2>
                <div className="nav-links">
                    <span onClick={() => navigate('/home')}>Home</span>
                    <span onClick={() => navigate('/pending')} style={{fontWeight: 'bold', textDecoration: 'underline'}}>Pending</span>
                    <span onClick={() => navigate('/completed')}>Completed</span>
                </div>
            </nav>

            <div className="task-list" style={{marginTop: '30px'}}>
                {tasks.length > 0 ? tasks.map((t) => (
                    <div key={t._id} className="task-item">
                        <div className="task-info">
                            <h3>{t.task}</h3>
                            <p>{t.description || "No description"}</p>
                        </div>
                        <div className="action-btns">
                            <button className="btn-complete" onClick={() => handleToggleComplete(t._id, t.completed)}>Done</button>
                        </div>
                    </div>
                )) : <p style={{textAlign: 'center', color: 'white'}}>පෙන්නුම් කිරීමට Pending වැඩ කිසිවක් නැත.</p>}
            </div>
        </div>
    );
};

export default PendingTasks;