import React, { Component } from 'react';
import axios from 'axios';
import './register.scss';
import { Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import en from '../../environment';
import history from '../../history';

class Register extends Component {
    constructor(props) {
        super(props);
        this.changeName = this.changeName.bind(this);
        this.changeMobile = this.changeMobile.bind(this);
        this.changeConfirmpassword = this.changeConfirmpassword.bind(this);
        this.changeEmailId = this.changeEmailId.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.otpChange = this.otpChange.bind(this);
        this.getOtp = this.getOtp.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.state = {
            modalShow: false,
            otpsent: false,
            otpchecked: false,
            name: '',
            mobile: '',
            password: '',
            confirmpassword: '',
            emailid: '',
            otp: '',
            otpactual: ''
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

    componentDidUpdate() {
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

    changeConfirmpassword(e) {
        this.setState({
            confirmpassword: e.target.value
        });
    }

    changeEmailId(e) {
        this.setState({
            emailid: e.target.value
        });
    }

    changeMobile(e) {
        this.setState({
            mobile: e.target.value
        });
    }

    changeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    changePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    otpChange(e) {
        this.setState({
            otp: e.target.value
        });
    }

    getOtp(e) {
        e.preventDefault();
        if (this.state.emailid !== ''){  
            let payload = {
                email: this.state.emailid
            }
            this.setState({
                modalShow: true
            });
            axios.post(en.url + '/user/request_otp', payload, en.authentication)
            .then((res) => {
                this.setState({
                    modalShow: false
                })
                if (res.status === 200) {
                    this.setState({
                        otpactual: res.data['otp'],
                        otpsent: true
                    });
                } else {
                    alert('Email already exists');
                    this.setState({
                        emailid: ''
                    });
                }
            }).catch((err) => {
                console.log(err);
                this.setState({
                    modalShow: false
                })
            })
        } else {
            alert('Please enter a valid email id');
        }
    }

    verifyOtp(e) {
        e.preventDefault();
        if (sha256(this.state.otp) === this.state.otpactual) {
            this.setState({
                otpchecked: true
            });
        } else {
            alert('OTP Does not match');
            this.setState({
                otp: ''
            })
        }
    }

    registerUser(e){
        e.preventDefault();
        if (this.state.password === this.state.confirmpassword) {
            if(this.state.mobile.toString().length === 10) {
                let payload = {
                "username": this.state.name,
                "password": sha256(this.state.password),
                "email": this.state.emailid,
                "mobile": this.state.mobile,
                "status": "Hey There! I am using React."
                }
                this.setState({
                    modalShow: true
                })
                axios.post(en.url+ '/user/register', payload, en.authentication)
                .then(() => {
                    this.setState({
                        modalShow: false
                    });
                    history.push('/');
                }).catch((err) => {
                    console.log(err);
                    this.setState({
                        modalShow: false
                    })
                })
            } else {
                alert('Mobile number should be 10 digits long');
                this.setState({
                    mobile: ''
                })
            }
        } else {
            alert('Password and Confirm Password do not match');
            this.setState({
                password: '',
                confirmpassword: ''
            })
        }  
    }

    render() {
        return (
            <div className= "full">
                {this.state.modalShow && <div className="spinner-body">
                    <div className="spinner-border text-success" role="status"></div>
                </div>}
                <div className="login-body">
                    <img className="wave" src={require("../../assets/wave.png")} alt="background"/>
                    <div className="container">
                    <div className="img">
                        <img src={require("../../assets/login.svg")} alt="avatar"/>
                    </div>
                    {this.state.otpchecked && this.state.otpsent &&
                    <div className="login-content">
                        <form onSubmit = {this.registerUser}>
                            <h2 className="pb-3 title">Get Started</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fa fa-2x fa-id-badge"></i>
                                </div>
                                <div className="div">
                                    <h5>Name</h5>
                                    <input type="text" className="input" value = {this.state.name} onChange = {this.changeName} name="name"/>
                                </div>
                            </div>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fa fa-2x fa-mobile"></i>
                                </div>
                                <div className="div">
                                    <h5>Mobile</h5>
                                    <input type="text" className="input" value = {this.state.mobile} onChange = {this.changeMobile} name="Mobile"/>
                                </div>
                            </div>
                            <div className="input-div three">
                                <div className="i">
                                    <i className="fa fa-2x fa-unlock-alt"></i>
                                </div>
                                <div className="div">
                                    <h5>Set Password</h5>
                                    <input type="password" className="input" value = {this.state.password} onChange = {this.changePassword} name="password"/>
                                </div>
                            </div>
                            <div className="input-div four">
                                <div className="i">
                                    <i className="fa fa-2x fa-lock"></i>
                                </div>
                                <div className="div">
                                    <h5>Confirm Password</h5>
                                    <input type="password" className="input" value = {this.state.confirmpassword} onChange = {this.changeConfirmpassword} name="confirmpassword"/>
                                </div>
                            </div>
                            <div className="link-box">
                                <Link className="a-right" to={"/"}>Already Have an Account? Login</Link>
                            </div>
                            <input type="submit" className="btn" value="Register"/>
                        </form>
                    </div>}
                    {!this.state.otpchecked && !this.state.otpsent &&
                    <div className="login-content">
                        <form onSubmit = {this.getOtp}>
                            <h2 className="pb-3 title">Get Started</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fa fa-2x fa-envelope"></i>
                                </div>
                                <div className="div">
                                    <h5>Email</h5>
                                    <input type="text" className="input" value={this.state.emailid} onChange = {this.changeEmailId} name="Email"/>
                                </div>
                            </div>
                            <div className="link-box">
                                <Link className="a-right" to = {"/"}>Already Have an Account? Login</Link>
                            </div>
                            <input type="submit" className="btn" value="Send OTP"/>
                        </form>
                    </div>}
                    {this.state.otpsent && !this.state.otpchecked &&
                    <div className="login-content">
                        <form onSubmit = {this.verifyOtp}>
                            <h2 className="pb-3 title">Get Started</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fa fa-2x fa fa-key"></i>
                                </div>
                                <div className="div">
                                    <h5>Enter OTP</h5>
                                    <input type="text" className="input" value = {this.state.otp} onChange = {this.otpChange} name="OTP"/>
                                </div>
                            </div>
                            <div className="link-box">
                                <p className="a-right" onClick = {this.getOtp}>Resend OTP</p>
                            </div>
                            <input type="submit" className="btn" value="Validate OTP"/>
                        </form>
                    </div>}
                </div>
                </div>
            </div>
        )
    }
}
export default Register