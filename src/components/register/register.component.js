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
            otpactual: '',
            img: "data:image/png;base64,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"
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
                "pic": this.state.img,
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