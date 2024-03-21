import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Main from './pages/main';
export interface NewBoard {
  board: string;
}

function App() {

  return (
    <Routes>
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default App;

