import React from 'react';
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import history from './history';
import { Route, Router } from 'react-router-dom';
import Login from './components/login/login.component';
import Register from './components/register/register.component';
import ForgotPass from './components/forgotpass/forgotpassword';
import ResetPass from './components/resetpass/resetpass';
import Profile from './components/profile/profile';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { loginReducer } from './reducer/login-reducer';
import { sessionReducer } from './reducer/session-reducer';
import { profileReducer } from './reducer/profile-pic-reducer';

const reducers = combineReducers({
  login: loginReducer,
  session: sessionReducer,
  profile: profileReducer
});

const store = createStore(reducers);

function App() {
  return (
    <Provider store = {store}>
      <Router history = {history}>
        <div className = "container">
          <Route path = "/" exact component = {Login}/>
          <Route path = "/register" component = {Register}/>
          <Route path = "/forgotpassword" component = {ForgotPass}/>
          <Route path = "/set-password/:token" component = {ResetPass}/>
          <Route path = "/profile" component = {Profile}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
