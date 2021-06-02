import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import io from 'socket.io-client';
import socket from './../setupSocket';

export default class createSession extends Component {
    constructor(props){
        super(props);
        this.state = {
            host_name: "",
        }
    }

    updateName = (event) => {
        this.setState({
            host_name : event.target.value
        });
    }

    createSession = (event) => {
        if(this.state.host_name !== ""){
            socket.emit("create-session", this.state.host_name);
        }
        else{
            event.preventDefault();
        }
    }

    render(){
        return(
            <div>
                <InputGroup>
                    <InputGroupAddon addonType = "prepend">
                        <InputGroupText>Name</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder = "username" onChange = {this.updateName} />
                </InputGroup>

                <Button color = "primary" onClick = {this.createSession}>Create Game</Button>
            </div>
        )
    }
}