import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Category from './pages/Category/Category';
import State from './pages/State/State';
import Edit from './pages/Edit/Edit'; // <-- Adicione este import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = 'http://localhost:4000';

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/category" element={<Category url={url} />} />
          <Route path="/state" element={<State url={url} />} />
          <Route path="/edit/:id" element={<Edit url={url} />} /> {/* <-- Adicione esta linha */}
        </Routes>
      </div>
    </div>
  );
};

export default App;