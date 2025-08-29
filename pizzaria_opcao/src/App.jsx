import React from 'react';
// import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
// import Footer from './components/Footer/Footer';
import Professional from './pages/Professional/Professional'; // Importe a nova página

const App = () => {
  return (
    <>
      <div className="app">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professional/:id" element={<Professional />} /> {/* Nova Rota */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default App;