import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Movies from './components/Movies';
import ParticularMovie from './pages/ParticularMovie'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Movies/>} />
          <Route path='/page' element={<ParticularMovie />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}
export default App