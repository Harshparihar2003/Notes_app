import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/Home';
import  {About}  from './components/About';
import { Navbar } from './components/Navbar';
import NoteState from './context/NoteState';
import Alerts from './components/Alerts';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert]  = useState(null);
  const showAlert = (message , type) =>{
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <NoteState>
    <BrowserRouter>
      <Navbar/>
      <Alerts alert={alert}/>
      <div className='container'>
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert} />}/>
          <Route exact path="/about" element={<About />} /> 
        <Route exact path="/login" element={<Login showAlert={showAlert}  />}/>
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />} /> 
      </Routes>
      </div>
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
