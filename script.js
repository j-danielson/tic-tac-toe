//Gameboard obj
    //set up array for each div

const gameBoard = (() => {
    const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return {board};
})();

//gameController
const gameController = (() => {
    
    //variables
    var player1 = 'X';
    var player2 = 'O';
    var turn = player1;
    var matchOver = false;
    var newPlayerModal = document.getElementById("newPlayerModal");
    var newPlayerButton = document.getElementById("newGame");
    var closeBtn = document.getElementsByClassName("close")[0];
    var submitButton = document.getElementById('submit');
    var box = document.getElementsByClassName('boardDiv');
    for (var i = 0; i < box.length; i++) {
        const position = box[i].getAttribute('data-board-number');
        // const divBox = new gameBox(position)
        // console.log(box[i].innerHTML);
        box[i].addEventListener('click', () => placeMarker(position));
    }
    
    function placeMarker(num) {
        if (typeof gameBoard.board[num] === 'string' || gameController.matchOver == true) {
            return null;
        }
        else{
           gameController.turn == gameController.player1
            ? (gameBoard.board[num] = player1, document.getElementsByClassName('boardDiv')[num].innerHTML = 'X', checkResults(), gameController.turn = gameController.player2)
            : (gameBoard.board[num] = player2, document.getElementsByClassName('boardDiv')[num].innerHTML = 'O', checkResults(), gameController.turn = gameController.player1);
           }
           
    }

    function backendChange(player, num) {
        gameBoard.board[num] = player;
        gameController.turn = gameController.player;
    }

    function checkResults() {
        if (gameBoard.board[0] == gameBoard.board[1] && gameBoard.board[1] == gameBoard.board[2] ||
            gameBoard.board[3] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[5] ||
            gameBoard.board[6] == gameBoard.board[7] && gameBoard.board[7] == gameBoard.board[8] ||
            gameBoard.board[0] == gameBoard.board[3] && gameBoard.board[3] == gameBoard.board[6] ||
            gameBoard.board[1] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[7] ||
            gameBoard.board[2] == gameBoard.board[5] && gameBoard.board[5] == gameBoard.board[8] ||
            gameBoard.board[0] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[8] ||
            gameBoard.board[2] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[6]) {
                console.log(gameController.turn + " win!");
                gameController.matchOver = true;
        }
        else if (checkForStrings(gameBoard.board) === true ){
            console.log('tie');
        }
    }   
    

    function checkForStrings(ary) {
        return ary.every(i => (typeof i === "string"));
    }

    //new game button
    function createNewPlayers() {
        gameController.player1 = document.getElementById('p1Name').value;
        gameController.player2 = document.getElementById('p2Name').value;
        newPlayerModal.style.display = "none";
        document.getElementById("playerInfo").reset();
        gameController.turn = gameController.player1;
    }

    submitButton.onclick = () => {createNewPlayers()};

    //modal popup
    

    newPlayerButton.onclick = function() {
        newPlayerModal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    closeBtn.onclick = function() {
    newPlayerModal.style.display = "none";
    document.getElementById("playerInfo").reset();
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == newPlayerModal) {
        newPlayerModal.style.display = "none";
        document.getElementById("playerInfo").reset();
    }
    }
    return {box, turn, player1, player2, placeMarker, checkResults, createNewPlayers, newPlayerModal, newPlayerButton, closeBtn};
    })();
    //get input by player data
    //updates score
    //runs buttons