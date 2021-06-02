class Session {
    host_socket;
    player_2_socket;
    player_3_socket;
    player_4_socket;

    gameState = {
        host_name: "",
        p2_name: "",
        p3_name: "",
        p4_name: "",
        host_tricks: 0,
        p2_tricks: 0,
        p3_tricks: 0,
        p4_tricks: 0,
        host_turn: true,
        p2_turn: false,
        p3_turn: false,
        trump: "",
        bidStage: true,
        bids: [],
        played_cards: ["", "", "", ""]
    }

    constructor(h_name, h_socket, code){
        this.gameState.host_name = h_name;
        this.host_socket = h_socket;
        this.code = code;
    }

    JoinSession = (name, socket) => {
        if(this.gameState.p2_name === "" && this.player_2_socket === ""){
            this.gameState.p2_name = name;
            this.player_2_socket = socket;
        }
        else if(this.gameState.p3_name === "" && this.player_3_socket === ""){
            this.gameState.p3_name = name;
            this.player_3_socket = socket;
        }
        else{
            this.gameState.p4_name = name;
            this.player_4_socket = socket;
        }
    }

    Broadcast = (event, data) => {
        this.player_one_socket.emit(event, data);
        this.player_two_socket.emit(event, data);
    }

    Deal = () => {

    }

    endRound = () => {

    }

    playerMove = (suit, value) => {

    }
}

module.exports = {
    Session:Session
}