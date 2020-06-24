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

    render() {
        return (
            <div className = "home-body">
                <div className = "row floating-class">
                    <div className = "col-sm-4 col-xs-12">
                        <Contacts/>
                    </div>
                    <div className = "col-sm-8 col-xs-12">
                        <Chat/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home