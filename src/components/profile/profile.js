import React, { Component } from 'react';
import axios from 'axios';
import './profile.scss';
import { Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import en from '../../environment';
import { stateToProps, dispatchToProps } from '../../reducerFunction';
import { connect } from 'react-redux';
import history from '../../history';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.userName,
            email: '',
            profilepic: this.props.profilePic,
            oldpassword: '',
            newpassword: '',
            confirmnewpasword: '',
            newName: '',
            phone: '',
            status: '',
            sellersPermitFile: ''
        };
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeDetails = this.changeDetails.bind(this);
        this.selectProfilePic = this.selectProfilePic.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleReaderLoaded = this.handleReaderLoaded.bind(this);
    }

    uploadProfilePic(e) {
        e.preventDefault();
    }

    changePassword(e) {
        e.preventDefault();
    }

    changeDetails(e) {
        e.preventDefault();
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

    selectProfilePic(e) {
        e.preventDefault();
        let fileList = e.target.files;
        if (fileList.length > 0) {
            const file = fileList[0];
            this.setState({
                sellersPermitFile: file
            });
            console.log(this.state.sellersPermitFile);
            console.log('file taken');
            // this.handleInputChange(file);
        }
        else {
            alert("No file selected");
        }   
    }

    handleInputChange(files) {
        var file = files;
        this.submitEnable=true;
        var pattern1 = /image-*/;
        var reader = new FileReader();
        this.imgURL = "";
        if (!file.type.match(pattern1)) {
          alert('invalid format');
          return;
        }
        reader.onload = (_event) => { 
          this.imgURL = reader.result; 
        }
        reader.onloadend = this.handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
      }

      handleReaderLoaded(e) {
        let reader = e.target;
        var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
        this.sellersPermitString = base64result;
      }

    //   addPictures() {
    //     this.apicall = true;
    //       this.finalJson = {
    //         "card": this.sellersPermitString,
    //         "token": this.token
    //       }
    //       this.apicallService.postID(this.finalJson
    //       ).then((response: HttpResponse<any>) => {
    //         console.log(response);
    //         this.apicall = false;
    //         if(response.status == 200) {
    //           this.router.navigate(['../purchase'], { relativeTo: this.route }).catch();
    //         }
    //       }).catch((err: any) => {
    //         this.apicall = false;
    //         // this.router.navigate(['../heatmap'], { relativeTo: this.route }).catch();
    //         console.log(err);
    //       })
    //   }


    render() {
        console.log(this.state.profilepic);
        return (
            <div className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3 py-2 text-center">
                            <img className = "styled-img" src={this.state.profilepic} />
                            <br />
                            <h2>{this.state.name}</h2>
                            <h5>{this.state.email}</h5>
                            <br />
                            <input className="my-2 btn btn-green-style" type = "file" onClick={this.selectProfilePic}/>Select Profile Picture
                            <br />
                            <br />
                            <button className="my-2 btn btn-green-style" onClick={this.uploadProfilePic}>Upload Profile Picture</button>
                            <br />
                        </div>
                        <div className="col-12 col-lg-9 py-2">
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