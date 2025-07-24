import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import './App.css';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
          <Route path="/quiz/:roomId" element={<QuizPage />} />
          <Route path="/result/:roomId" element={<ResultPage />} />
        </Routes>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
