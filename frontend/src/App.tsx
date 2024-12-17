// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StaticPage from './pages/StaticPage/StaticPage';
import FormPage from './pages/FormPage/FormPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StaticPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
};

export default App;
