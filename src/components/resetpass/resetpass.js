import React, { Component } from 'react';
import axios from 'axios';
import './resetpass.css';
import { Link } from 'react-router-dom';
import en from '../../environment';
import history from '../../history';

class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmpassword: '',
            token: this.props.match.params.token,
            validtoken: true
        };
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
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
        axios.get(en.url + '/user/check_reset_token/'+this.state.token, en.authentication)
        .then((res) => {
            if (res.status === 200) {
                this.setState({
                    validtoken: true
                });
            } else {
                this.setState({
                    validtoken: false
                })
            }
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        });
    }

    onSubmitForm(e) {
        e.preventDefault();
        if (this.state.password === this.state.confirmpassword) {
            let payload = {
                "token": this.state.token,
                "newPassword": this.state.password
            }
            axios.post(en.url + '/user/reset_password', payload, en.authentication)
            .then((res) => {
                if (res.status === 200) {
                    history.push('/');
                } else {
                    alert('Failed to reset password.')
                    this.setState({
                        password: '',
                        confirmpassword: ''
                    });
                }
            }).catch((err) => {
                console.log(err);
                this.setState({
                    password: '',
                    confirmpassword: ''
                })
            })
        }
    }

    render() {
        return (
            <div className = "main">
                <img className="wave" src={require("../../assets/wave.png")} alt= ''/>
                {!this.state.validtoken &&
                <div className= "container">
                    <div className="img">
                        <img src={require("../../assets/bg.svg")} alt = ''/>
                    </div>
                    <div className = "login-content">
                        <h2 className="title">Reset Password Link has Expired</h2>
                    </div>
                </div>}
                {this.state.validtoken &&
                <div className="container">
                    <div className="img">
                        <img src={require("../../assets/bg.svg")} alt = ''/>
                    </div>
                    <div className="login-content">
                        <form onSubmit = {this.onSubmitForm} >
                            <h2 className="pb-3 title">Reset Password</h2>

                            <div className="input-div three">
                                <div className="i">
                                    <i className="fa fa-2x fa-unlock-alt"></i>
                                </div>
                                <div className="div">
                                    <h5>Set Password</h5>
                                    <input type="password" className="input" value = {this.state.password} onChange = {this.onChangePassword} />
                                </div>
                            </div>
                            <div className="input-div four">
                                <div className="i">
                                    <i className="fa fa-2x fa-lock"></i>
                                </div>
                                <div className="div">
                                    <h5>Confirm Password</h5>
                                    <input type="password" className="input" value = {this.state.confirmpassword} onChange = {this.onChangeConfirmPassword} />
                                </div>
                            </div>
                            <div className="link-box">
                                <Link to = {"/"} className="a-right">Already Have an Account? Login</Link>
                            </div>
                            <input type="submit" className="btn" value="Set New Password"/>
                        </form>
                    </div>
                </div>}
            </div>
        )
    }
}

export default ResetPass