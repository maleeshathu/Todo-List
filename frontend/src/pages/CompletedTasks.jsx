import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const CompletedTasks = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const fetchCompletedTasks = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/todos');
            const completed = res.data.filter(t => t.completed);
            setTasks(completed);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        fetchCompletedTasks();
    }, [fetchCompletedTasks]);

    return (
        <div className="home-container">
            <nav className="navbar">
                <h2>Completed Tasks</h2>
                <div className="nav-links">
                    <span onClick={() => navigate('/home')}>Home</span>
                    <span onClick={() => navigate('/pending')}>Pending</span>
                    <span onClick={() => navigate('/completed')} style={{fontWeight: 'bold', textDecoration: 'underline'}}>Completed</span>
                </div>
            </nav>

            <div className="task-list" style={{marginTop: '30px'}}>
                {tasks.length > 0 ? tasks.map((t) => (
                    <div key={t._id} className="task-item completed-item">
                        <div className="task-info">
                            <h3 style={{textDecoration: 'line-through'}}>{t.task}</h3>
                            <p>{t.description || "No description"}</p>
                        </div>
                        <div className="action-btns">
                            <span style={{color: '#10b981', fontWeight: 'bold'}}>✓ Finished</span>
                        </div>
                    </div>
                )) : <p style={{textAlign: 'center', color: 'white'}}>තවම එක වැඩක්වත් ඉවර කරලා නැහැ.</p>}
            </div>
        </div>
    );
};

export default CompletedTasks;