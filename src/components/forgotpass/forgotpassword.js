import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import en from '../../environment';
import history from '../../history';

class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailid: '',
            modalShow: false
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
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

    onChangeEmail(e) {
        this.setState({
            emailid: e.target.value
        });
    }

    onSubmitEmail(e) {
        e.preventDefault();
        let payload = {
            "email": this.state.emailid
        }
        this.setState({
            modalShow: true
        });
        axios.post(en.url + '/user/forgot_password', payload, en.authentication)
        .then((res) => {
            this.setState({
                modalShow: false
            });
            if (res.status === 200) {
                alert('Please check mail for password reset link.');
                history.push("/")
            }
        }).catch((err) => {
            this.setState({
                modalShow: false
            });
            console.log(err);
        })
    }

    render() {
        return (
            <div className = "full">
                {this.state.modalShow && <div className="spinner-body">
                    <div className="spinner-border text-success" role="status"></div>
                </div>}
                <img className="wave" src={require("../../assets/wave.png")} alt= ''/>
                <div className="container">
                    <div className="img">
                        <img src={require("../../assets/login.svg")} alt = ''/>
                    </div>
                    <div className="login-content">
                        <form onSubmit = {this.onSubmitEmail}>
                            <h2 className="pb-3 title">Forgot Password</h2>

                            <div className="input-div two {{ufocus}}">
                                <div className="i">
                                    <i className="fa fa-2x fa-envelope"></i>
                                </div>
                                <div className="div">
                                    <h5>Enter Email</h5>
                                    <input value = {this.state.emailid} onChange = {this.onChangeEmail} type="email" className="input" name="email"/>
                                </div>
                            </div>

                            <div className="link-box">
                                <Link className="a-right" to = {"/"}>Already Have an Account? Login</Link>
                            </div>
                            <input type="submit" className="btn" value="Request Password Reset"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPass