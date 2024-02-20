class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }


    /**
     * Returns active player.
     * @return  {Object}    player - The active player.
     */
    get activePlayer() {
        return this.players.find(player => player.active);
    }


    /**
     * Creates two player objects
     * @return  {array}    An array of two player objects.
     */
    createPlayers() {
        const players = [new Player('Player 1', 1, 'badge-6.png', true), //#e15258
            new Player('Player 2', 2, 'badge-7.png')];//#e59a13
        return players;
    }


    /**
     * Initializes game.
     */
    startGame(){
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }


    /**
     * Branches code, depending on what key player presses
     * @param	{Object}	e - Keydown event object
     */
    handleKeydown(e) {
        if (this.ready) {
            if (e.key === "ArrowLeft") {
                this.activePlayer.activeToken.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            } else if (e.key === "ArrowDown") {
                this.playToken();
            }
        }
    }


    /**
     * Finds Space object to drop Token into, drops Token
     */
    playToken(){
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;

        for (let space of targetColumn) {
            if (space.token === null) {
                targetSpace = space;
            }
        }

        if (targetSpace !== null) {

            game.ready = false;

            activeToken.drop(targetSpace, function () {
                //callback function
                game.updateGameState(activeToken, targetSpace);
            })
        }


    }


    /**
     * Switches active player.
     */
    switchPlayers() {
        // this.players.forEach(function (player) {
        //     if(player.active) {
        //         player.active = false;
        //     } else {
        //         player.active = true;
        //     }
        // });
        for (let player of this.players) {
            player.active = player.active === true ? false : true;
        }
    }


    /**
     * Displays game over message.
     * @param {string} message - Game over message.
     */
    gameOver(message) {
        document.getElementById('game-over').style.display='block';
        document.getElementById('game-over').textContent=message;
    }


    /**
     * Checks if there a winner on the board after each token drop.
     * @param   {Object}    Targeted space for dropped token.
     * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
     */

    checkForWin(target){
        const owner = target.getOwner()
        let win = false;

        // vertical
        for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].getOwner() === owner &&
                    this.board.spaces[x][y+1].getOwner()  === owner &&
                    this.board.spaces[x][y+2].getOwner()  === owner &&
                    this.board.spaces[x][y+3].getOwner()  === owner) {
                    win = true;
                }
            }
        }

        // horizontal
        for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].getOwner() === owner &&
                    this.board.spaces[x+1][y].getOwner() === owner &&
                    this.board.spaces[x+2][y].getOwner() === owner &&
                    this.board.spaces[x+3][y].getOwner() === owner) {
                    win = true;
                }
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].getOwner() === owner &&
                    this.board.spaces[x-1][y+1].getOwner() === owner &&
                    this.board.spaces[x-2][y+2].getOwner() === owner &&
                    this.board.spaces[x-3][y+3].getOwner() === owner) {
                    win = true;
                }
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].getOwner() === owner &&
                    this.board.spaces[x-1][y-1].getOwner() === owner &&
                    this.board.spaces[x-2][y-2].getOwner() === owner &&
                    this.board.spaces[x-3][y-3].getOwner() === owner) {
                    win = true;
                }
            }
        }

        return win;
    }

    /**
     * Updates game state after token is dropped.
     * @param   {Object}  token  -  The token that's being dropped.
     * @param   {Object}  target -  Targeted space for dropped token.
     */
    updateGameState(token, target) {

        target.mark(token);

        if(this.checkForWin(target)) {

            this.gameOver(`${target.getOwner().name}  wins!`)
        }
        else {
            this.switchPlayers()

            if(this.activePlayer.checkTokens()) {

                this.activePlayer.activeToken.drawHTMLToken()
                this.ready = true;
            }
                else {

                this.gameOver("You are out of tokens..")
                }
        }



    }

}