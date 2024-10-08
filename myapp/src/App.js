import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from './component/join/Join';
import Chat from './component/chat/Chat';




const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route index element={<Join />} />
          <Route path='/chat' element={<Chat />} />
        </Routes >
      </BrowserRouter>
    </div>
  )
}

export default App