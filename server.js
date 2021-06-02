const express = require('express');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const Session = require('./session').Session;

var codeSession = {};
var socketSession = {};

function socketEvents(socket){
    socket.on('create-session', (name) => {
        console.log("session created");
        var code = Math.floor(Math.random()*1000000).toString();
        const session = new Session(name, socket, code);

        codeSession = {...codeSession, [code]:session };
        socketSession = {...socketSession, [socket]:session};

        socket.on("disconnect", () => {
            delete codeSession[code];
            delete socketSession[socket];
        })
    })

    socket.on("join-session", (code, name) => {
        if(codeSession[code] === undefined){
            socket.emit("invalid-code");
        }
        else{
            codeSession[code].JoinSession(name, socket);
            socketSession = {...socketSession, [socket]:codeSession[code]};
// need to figure out how to max out number of ppl joining at 4
            socket.on("disconnect", () => {
                delete socketSession[socket];
            })
        }
    })
}

io.on('connection', socketEvents);

const port = process.env.PORT || 8000;
server.listen(port);