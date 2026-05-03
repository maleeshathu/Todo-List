import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // CSS file එක මෙතනින් import කරන්න

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
        
        try {
            const res = await axios.post(url, { username, password });
            alert(res.data.message);
            if (!isRegister) {
                navigate('/home');
            } else {
                setIsRegister(false);
            }
        } catch (err) {
            alert(err.response?.data?.error || "වැරදීමක් සිදුවුණා!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>{isRegister ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn-submit">
                        {isRegister ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                <p className="switch-text">
                    {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                    <span className="switch-link" onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? 'Login' : 'Register'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;