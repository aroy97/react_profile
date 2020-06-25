import React, { Component } from 'react';
import axios from 'axios';
import './home.scss';
import en from '../../environment';
import { stateToProps, dispatchToProps } from '../../reducerFunction';
import { connect } from 'react-redux';
import history from '../../history';
import io from 'socket.io-client';
import queryString from 'query-string';
import Contacts from './contacts/contacts';
import Chat from './chat/chat';

// let socket;


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: this.props.token,
            modalShow: false
        }
    }

    // componentDidMount() {
    //     socket = io('localhost:5000');
    //     socket.emit('join', {name: 'Akash', room: 'Aishik'}, () => {

    //     })
    // }

    // componentWillUnmount() {
    //     socket.emit('disconnect');
    //     socket.off();
    // }
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
        axios.post(en.url + '/user/get_session', payload, en.authentication)
        .then((res) => {
            this.setState({
                modalShow: false
            });
            if (res.status === 200) {
                this.props.setSession(res.data);
                this.setState({
                    modalShow: false
                });
            } else {
                history.push("/");
            }
        })
        .catch(function(error){
            alert("Something went wrong");
            console.log(error);
        });
    }

    render() {
        return (
            <div className = "home-body">
                {this.state.modalShow && <div className="spinner-body">
                    <div className="spinner-border text-success" role="status"></div>
                </div>}
                <div className = "row floating-class">
                    <div className = "col-sm-4 col-xs-12 no-gutter">
                        <Contacts/>
                    </div>
                    <div className = "col-sm-8 col-xs-12 no-gutter">
                        <Chat/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(stateToProps,dispatchToProps) (Home)