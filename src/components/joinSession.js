import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import io from 'socket.io-client';
import socket from './../setupSocket';

export default class joinSession extends Component {
    constructor(props){
        super(props);
        this.state = {
            code: "",
            name: "",
            invalid: false
        }
    }

    updateState = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    joinSession = () => {
        if(this.state.code !== "" && this.state.name !== ""){
            socket.emit("join-session", this.state.code, this.state.name);
        }
    }

    componentDidMount(){
        socket.on("invalid-code", () => {
            this.setState({invalid:true});
        })
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroupAddon addonType = "prepend">
                        <InputGroupText>Name</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder = "username" onChange = {this.updateState} />
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon addonType = "prepend">
                        <InputGroupText>Game Code</InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder = "code" onChange = {this.updateState} />
                </InputGroup>

                <Button color = "primary" onClick = {this.joinSession}>Join Game</Button>

            {this.state.invalid &&
                <div>
                    <p>Sorry, Invalid Game Code</p>
                </div>
            }
            </div>
        )
    }

}