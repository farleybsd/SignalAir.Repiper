import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PollList from './components/PollList';
import PollDetails from './components/PollDetails';
import PollResults from './components/PollResults';
import Home from './components/Home'; // Import the Home component
import CreatePoll from './components/CreatePoll'; // Import the CreatePoll component



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/polls" element={<PollList />} /> {/* View all polls */}
        <Route path="/poll/:pollId" element={<PollDetails />} /> {/* Poll details and voting */}
        <Route path="/poll/:pollId/results" element={<PollResults />} /> {/* Real-time results */}
        <Route path="/create-poll" element={<CreatePoll />} /> {/* Create new poll page */}
      </Routes>
    </Router>
  );
}

export default App;
