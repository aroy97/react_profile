import React, { Component } from 'react';
import axios from 'axios';
import './chat.scss';
import en from '../../../environment';
import { stateToProps, dispatchToProps } from '../../../reducerFunction';
import { connect } from 'react-redux';
import history from '../../../history';
import io from 'socket.io-client';
import queryString from 'query-string';



class Chat extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h1>Hi</h1>
        )
    }
}

export default Chat