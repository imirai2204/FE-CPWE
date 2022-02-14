import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/PageHome';
import Login from './pages/PageLogin';

function App() {
  return (
    <>
      <Navigation></Navigation>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
