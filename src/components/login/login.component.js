import React, { Component } from 'react';
import axios from 'axios';
import './login.css';
import { Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import en from '../../environment';

class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: '',
            modalShow: false
        }
    }

    componentDidMount() {
        const inputs = document.querySelectorAll(".input");
        function addcl(){
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }
        function remcl(){
            let parent = this.parentNode.parentNode;
            if(this.value == ""){
                parent.classList.remove("focus");
            }
        }
        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onchangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        let payload = {
            'email': this.state.username,
            'password': sha256(this.state.password)
        }
        this.setState({
            modalShow: true
        })
        axios.post(en.url + '/user/login', payload, en.authentication)
        .then((res) => {
            this.setState({
                modalShow: false
            })
            if (res.status == 200) {
                console.log('Login Successful');
                if (this.rememberme == true) {
                localStorage.setItem('userToken', res.token);
                }
            } else {
                console.log('Login Failed');
            }
            this.setState({
                username: '',
                password: ''
            });
        }).catch((err) => {
            this.setState({
                modalShow: false
            })
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                {this.state.modalShow && <div className="spinner-body">
                    <div className="spinner-border text-success" role="status"></div>
                </div>}
                <img className="wave" src={require("../../assets/wave.png")}/>
                <div className="container">
                    <div className="img">
                        <img src={require("../../assets/bg.svg")}/>
                    </div>
                    <div className="login-content">
                        <form onSubmit = {this.onSubmit}>
                            <img src={require("../../assets/avatar.svg")}/>
                            <h2 className="title">Welcome</h2>
                            <div className="input-div one">
                            <div className="i">
                                    <i className="fas fa-user"></i>
                            </div>
                            <div className="div">
                                    <h5>Username</h5>
                                    <input type="text" value = {this.state.username} onChange = {this.onChangeUsername} className="input"/>
                            </div>
                            </div>
                            <div className="input-div pass">
                            <div className="i"> 
                                    <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                    <h5>Password</h5>
                                    <input type="password" value = {this.state.password} onChange = {this.onchangePassword} className="input"/>
                            </div>
                            </div>
                            <a href="#">Forgot Password?</a>
                            <input type="submit" className="btn" value="Login"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login