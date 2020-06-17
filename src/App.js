import React from 'react';
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import history from './history';
import { Route, Router } from 'react-router-dom';
import Login from './components/login/login.component';
import Register from './components/register/register.component';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { loginReducer } from './reducer/login-reducer';

const reducers = combineReducers({
  login: loginReducer
});

const store = createStore(reducers);

function App() {
  return (
    <Provider store = {store}>
      <Router history = {history}>
        <div className = "container">
          <Route path = "/" exact component = {Login}/>
          <Route path = "/register" component = {Register}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
