import React, { Component } from 'react';
import axios from 'axios';
import './login.css';
import { Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import en from '../../environment';
import { stateToProps, dispatchToProps } from '../../reducerFunction';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onchangePassword = this.onchangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeRemember = this.onChangeRemember.bind(this);
        this.state = {
            username: '',
            password: '',
            modalShow: false,
            remember: false
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
            if(this.value === ""){
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

    onChangeRemember(e) {
        this.setState({
            remember: e.target.checked
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
            if (res.status === 200) {
                this.props.setToken(res.data['token']);
                console.log('Login Successful');
                if (this.state.remember === true) {
                localStorage.setItem('userToken', res.data.token);
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
                <img className="wave" src={require("../../assets/wave.png")} alt = "Background"/>
                <div className="container">
                    <div className="img">
                        <img src={require("../../assets/bg.svg")} alt = "Mobile"/>
                    </div>
                    <div className="login-content">
                        <form onSubmit = {this.onSubmit}>
                            <img src={require("../../assets/avatar.svg")} alt= "Avatar"/>
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
                            <div className = "row">
                                <div className = "col-sm-6 col-xs-12">
                                    <div className = "remember">
                                        <input type = "checkbox" checked = {this.state.remember} onChange = {this.onChangeRemember} />
                                            &nbsp;<label>Remember Me</label>
                                    </div>
                                </div>
                                <div className = "col-sm-6 col-xs-12">
                                <Link to = {"/forgotpass"}>Forgot Password?</Link>
                                </div>
                            </div>
                            <input type="submit" className="btn" value="Login"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(stateToProps,dispatchToProps) (Login)