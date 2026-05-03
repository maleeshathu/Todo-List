import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PendingTasks from './pages/PendingTasks';
import CompletedTasks from './pages/CompletedTasks';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pending" element={<PendingTasks />} />
        <Route path="/completed" element={<CompletedTasks />} />
        <Route path="/pending" element={<PendingTasks />} />
        <Route path="/completed" element={<CompletedTasks />} />
      </Routes>
    </Router>
  );
}

export default App;