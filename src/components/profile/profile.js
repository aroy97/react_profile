import React, { Component } from 'react';
import axios from 'axios';
import './profile.scss';
import en from '../../environment';
import { stateToProps, dispatchToProps } from '../../reducerFunction';
import { connect } from 'react-redux';
import history from '../../history';
import { sha256 } from 'js-sha256';
import {Image, CloudinaryContext} from 'cloudinary-react';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.userName,
            email: '',
            profilepic: this.props.profilePic,
            profileversion: this.props.profileVersion,
            oldpassword: '',
            newpassword: '',
            confirmnewpasword: '',
            newName: '',
            phone: '',
            status: '',
            file: '',
            base64: '',
            modalShow: false,
            token: this.props.token,
            updated: false,
            cloud: ''
        };
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeDetails = this.changeDetails.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeConfirmNewPassword = this.onChangeConfirmNewPassword.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
    }

    componentDidMount() {
        if (this.state.token === '' || this.state.token === null || this.state.token === undefined) {
            if (localStorage.getItem('sessionToken') === '' || localStorage.getItem('sessionToken') === null ||localStorage.getItem('sessionToken') === undefined) {   
                history.push("/");
            } else {
                let payload = {
                    "token": localStorage.getItem('sessionToken')
                }
                this.setState({
                    token: localStorage.getItem('sessionToken')
                });
                this.getUserDetails(payload);
            }
        } else {
            let payload = {
                "token": this.props.token
            }
            this.getUserDetails(payload);
        }
    }

    getUserDetails(payload) {
        this.setState({
            modalShow: true
        });
        axios.post(en.url + "/user/get_user_details", payload, en.authentication)
        .then((res) => {
            this.setState({
                modalShow: false
            })
            if (res.status === 200) {
                this.props.setToken(this.state.token);
                this.setState({
                    name: res.data["username"],
                    phone: res.data["mobile"],
                    status: res.data["status"],
                    newName: res.data["username"],
                    statusold: res.data["status"],
                    profilepic: res.data["profilepic"],
                    profileversion: res.data["profileversion"]
                });
                console.log(this.state);
            } else {
                history.push("/");
            }
        }).catch((err) => {
            this.setState({
                modalShow: false
            });
            console.log(err);
        });
    }

    logout(e) {
        e.preventDefault();
        localStorage.setItem('sessionToken', '');
        history.push("/");
    }

    changePassword(e) {
        e.preventDefault();
        this.setState({
            modalShow: true
        });
        if (this.state.newpassword === this.state.confirmnewpasword) {
            let payload = {
                "token": this.props.token,
                "oldPassword": sha256(this.state.oldpassword),
                "newPassword": sha256(this.state.newpassword)
            }
            axios.post(en.url + '/user/change_password', payload, en.authentication)
            .then((res) => {
                this.setState({
                    modalShow: false
                });
                if (res.status === 200) {
                    alert("Password has been changed successfully");
                    localStorage.setItem('sessionToken', '');
                    history.push('/');
                } else {
                    alert("Sorry, there was some error in changing password");
                }
            }).catch((err) => {
                this.setState({
                    modalShow: false
                });
                console.log(err);
            })
        }


    }

    changeDetails(e) {
        e.preventDefault();
        if (this.state.phone.toString().length !== 10) {
            alert('Phone number should be of 10 digits');
        } else {
            this.setState({
                modalShow: true
            });
            let payload = {
                "token": this.props.token,
                "username": this.state.newName,
                "mobile": this.state.phone,
                "status": this.state.status
            }
            axios.post(en.url + '/user/update_details', payload, en.authentication)
            .then((res) => {
                this.setState({
                    modalShow: false
                });
                if (res.status === 200) {
                    alert("Details have been changed successfully");
                    this.setState({
                        name: this.state.newName,
                        statusold: this.state.status
                    })
                } else {
                    alert("Sorry, there was some error in changing details");
                }
            }).catch((err) => {
                this.setState({
                    modalShow: false
                });
                console.log(err);
            });
        }

    }

    onChangeName(e) {
        this.setState({
            newName: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onChangeOldPassword(e) {
        this.setState({
            oldpassword: e.target.value
        });
    }

    onChangeNewPassword(e) {
        this.setState({
            newpassword: e.target.value
        });
    }

    onChangeConfirmNewPassword(e) {
        this.setState({
            confirmnewpasword: e.target.value
        });
    }

    handleChange(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        let pattern1 = /image-*/;
        if (!file.type.match(pattern1)) {
            alert('invalid format');
        } else {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.setState({
                    updated: true,
                    file: URL.createObjectURL(file),
                    cloud: reader.result
                });
            }
        }
    }

    uploadProfilePic() {
        this.setState({
            modalShow: true
        });
          let finalJson = {
            "pic": this.state.cloud,
            "token": this.state.token
          }
          axios.post(en.url + '/user/update_picture', finalJson, en.authentication)
          .then((res) => {
            this.setState({
                modalShow: false
            });
            if (res.status === 200) {
                alert('Profile picture updated');
            }
          }).catch((err) => {
              console.log(err);
              this.setState({
                modalShow: false
            });
          })
      }


    render() {
        return (
            <div className="main-profile">
                {this.state.modalShow && <div className="spinner-body">
                    <div className="spinner-border text-success" role="status"></div>
                </div>}
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-lg-3 py-2 text-center">
                            {!this.state.updated && <CloudinaryContext cloudName = 'profilechatify'>
                                <Image publicId = {this.state.profilepic} version = {this.state.profileversion}/>
                                </CloudinaryContext>}
                            {this.state.updated && <img className = "styled-img" src={this.state.file} alt = "profilepic"/>}
                            <br />
                            <h2>{this.state.name}</h2>
                            <h5>{this.state.statusold}</h5>
                            <br />
                            <label className="custom-file-upload btn">
                                <input type="file" onChange={this.handleChange}/>
                                Select Profile Picture
                            </label>
                            <br />
                            <br />
                            <button className="my-2 btn btn-green-style" onClick={this.uploadProfilePic}>Upload Profile Picture</button>
                            <br />
                            <br />
                            <button className="my-2 btn btn-green-style" onClick={this.logout}>Logout</button>
                            <br />
                        </div>
                        <div className="col-xs-12 col-lg-9 py-2">
                            <h2 className="text-center styled-h2">Account Settings</h2>
                            <hr />
                            <div className="row">
                                <div className="col">
                                    <p className = "styled-p"><span className="fa fa-cog"></span> Change Password</p>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-4 col-12 py-2">
                                                <div className="input">
                                                    <input type="password" name="current" id="current"
                                                        placeholder="Enter Current Password" required value={this.state.oldpassword} onChange={this.onChangeOldPassword} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-12 py-2">
                                                <div className="input">
                                                    <input type="password" name="new" id="new" placeholder="Enter New Password" value={this.state.newpassword} onChange={this.onChangeNewPassword}
                                                        required className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-12 py-2">
                                                <div className="input">
                                                    <input type="password" name="confirm" id="confirm" value={this.state.confirmnewpasword} onChange={this.onChangeConfirmNewPassword}
                                                        placeholder="Confirm New Password" required className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-9 col-12 py-2">
                                                <span className = "styledMessage">

                                                </span>
                                            </div>
                                            <div className="col-md-3 col-12 py-2 text-right">
                                                <button className="btn btn-green-style" onClick= {this.changePassword}>
                                                    Change Password
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col">
                                    <p className = "styled-p" ><span className="fa fa-user"></span> Change Details</p>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-4 col-12 py-2">
                                                <div className="input">
                                                    <label htmlFor="phone">Update Phone Number</label>
                                                    <input type="text" name="phone" id="phone" value = {this.state.phone} onChange = {this.onChangePhone}
                                                        placeholder="Update Phone Number" className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-12 py-2">
                                                <div className="input">
                                                    <label htmlFor="name">Update Display Name</label>
                                                    <input type="text" name="newname" id="newname" placeholder="Update Name" value = {this.state.newName} onChange = {this.onChangeName}
                                                        className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-12 py-2">
                                                <div className="input">
                                                    <label htmlFor = "status">Update Status</label>
                                                    <input type="text" name="status" id="status" placeholder="Update Status" value = {this.state.status} onChange = {this.onChangeStatus}
                                                    className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-9 col-12 py-2">
                                                <span className = "styledMessage">

                                                </span>
                                            </div>
                                            <div className="col-md-3 col-12 py-2 text-right">
                                                <button className="btn btn-green-style" onClick={this.changeDetails}>Update Details</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(stateToProps,dispatchToProps) (Profile)