import React from 'react';
import logo from './logo.svg';
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import history from './history';
import { Route, Router } from 'react-router-dom';
import Login from './components/login/login.component';
import Register from './components/register/register.component';

function App() {
  return (
    <Router history = {history}>
      <div className = "container">
        <Route path = "/" exact component = {Login}/>
        <Route path = "/register" component = {Register}/>
      </div>
    </Router>
  );
}

export default App;
