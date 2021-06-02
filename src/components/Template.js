import React, { Component } from 'react'
import CreateSession from './createSession';
import JoinSession from './joinSession';
import socket from '../setupSocket';

const Template = props => {
    return (
        <div>
            <h1 className = "title">Mystery Bridge Monkes</h1>
            <CreateSession/>
            <br/>
            <JoinSession/>
        </div>
    )
}

export default Template;