import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FindVC from './pages/FindVC';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/findvc" element={<FindVC />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;