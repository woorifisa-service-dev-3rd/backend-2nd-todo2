import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignupForm from './pages/SignupForm'; 
import MainPage from './pages/MainPage';
import TodoPage from './pages/TodoPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
