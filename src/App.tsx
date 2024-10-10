import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { ToDoList } from './Components/ToDoList';
import { Login } from './Components/Login';
function App() 
{
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/List' element={<ToDoList/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
