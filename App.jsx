import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  AdminServices from './BankApplication/Bank.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<AdminServices />}/>
              
      </Routes>
    </BrowserRouter>
  );
}

export default App;
