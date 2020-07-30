//To-DO
    //make symbols appear depending on turn
    //restart prompt || clear screen

const gameBoard = (() => {
    const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return {board};
})();

//gameController
const gameController = (() => {

    //objects
    function player(name, symbol, score){
        this.name = name;
        this.symbol = symbol;
        this.score = score;
    }
    
    //variables
    var player1 = new player('player 1', 'X', 0);
    var player2 = new player('player 2', 'O', 0);
    var players = [player1, player2];
    var matchOver = true;
    var gameOn = false;
    var ngPress = false;
    var turnView = document.getElementsByClassName(players[0].symbol);
    var waitingTurnView = document.getElementsByClassName(players[1].symbol);
    var newPlayerButton = document.getElementById("newGame");
    var newRoundButton = document.getElementById('newRound');
    var quickPlayButton = document.getElementById('quickPlay');
    var confirmButton = document.getElementById('yesBtn');
    var cancelButton = document.getElementById('cancelBtn')
    var newPlayerModal = document.getElementById("newPlayerModal");
    var restartConfirmScreen = document.getElementById('restartModal')
    var closeBtn = document.getElementsByClassName("close")[0];
    var submitButton = document.getElementById('submit');
    var box = document.getElementsByClassName('boardDiv');
    for (var i = 0; i < box.length; i++) {
        const position = box[i].getAttribute('data-board-number');
        box[i].addEventListener('click', () => placeMarker(position));
    }
    //functions
    function placeMarker(num) {
        if (typeof gameBoard.board[num] === 'string' || gameController.matchOver == true) {
            return null;
        }
        else{
           var markedBox = document.createElement('p');
           markedBox.setAttribute('class', 'symbol');
           document.getElementsByClassName('boardDiv')[num].appendChild(markedBox).innerHTML = gameController.players[0].symbol;
           backendSwitcharoo(num);
           switchTurnView();
         }
    }

    function backendSwitcharoo(num) {
        console.log(players[0].symbol);
        gameBoard.board[num] = gameController.players[0].symbol;
        checkResults();
        gameController.players.push(gameController.players.shift());
    }

    function nextRound() {
        gameBoard.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        var sBox = document.getElementsByClassName('symbol');
        while (sBox[0]) {
            sBox[0].parentNode.removeChild(sBox[0]);
        }
        gameController.matchOver = false;
        switchTurnView();
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
                console.log(gameController.players[0].name + " win!");
                gameController.players[0].score++
                document.getElementById('p1ScoreSpace').innerHTML = player1.score.toString();
                document.getElementById('p2ScoreSpace').innerHTML = player2.score.toString();
                gameController.matchOver = !gameController.matchOver;
        }
        else if (checkForStrings(gameBoard.board) === true ){
            console.log('tie');
        }
    }   
    

    function checkForStrings(ary) {
        return ary.every(i => (typeof i === "string"));
    }

    function switchTurnView() {
        gameController.turnView = document.getElementsByClassName(gameController.players[0].symbol);
        gameController.waitingTurnView = document.getElementsByClassName(gameController.players[1].symbol);
        if(gameController.matchOver){
            for (var i = 0; i < gameController.turnView.length; i++) {
                gameController.turnView[i].style.display = 'none';
            }
            for (var i = 0; i < gameController.waitingTurnView.length; i++) {
                gameController.waitingTurnView[i].style.display = 'none';
            }
        }
        else{
            for (var i = 0; i < gameController.turnView.length; i++) {
                gameController.turnView[i].style.display = 'block';
            }
            for (var i = 0; i < gameController.waitingTurnView.length; i++) {
                gameController.waitingTurnView[i].style.display = 'none';
            }
        }
    }
    //new game button
    function createNewPlayers() {
        gameController.players = [];
        gameController.player1 = new player(document.getElementById('p1Name').value, 'X', 0);
        gameController.player2 = new player(document.getElementById('p2Name').value, 'O', 0);
        gameController.players.push(gameController.player1);
        gameController.players.push(gameController.player2);    
        document.getElementById('p1NameSpace').innerHTML = gameController.player1.name;
        document.getElementById('p1NameScore').innerHTML = gameController.player1.name;
        document.getElementById('p2NameSpace').innerHTML = gameController.player2.name;
        document.getElementById('p2NameScore').innerHTML = gameController.player2.name;
        document.getElementById('p1ScoreSpace').innerHTML = player1.score.toString();
        document.getElementById('p2ScoreSpace').innerHTML = player2.score.toString();
        newPlayerModal.style.display = "none";
        document.getElementById("playerInfo").reset();
        switchTurnView();
        gameController.matchOver = false;
        document.getElementById('newRound').style.display = 'block';
        document.getElementById('quickPlay').innerHTML = 'Restart';
        gameOn = true;
    }

    // nextRound();
    // document.getElementById('p1ScoreSpace').innerHTML = '0';
    // document.getElementById('p2ScoreSpace').innerHTML = '0';

    function quickPlay(){
        gameController.players=[];
        gameController.matchOver = false;
        gameController.player1.score = 0;
        gameController.player2.score = 0;
        gameController.players.push(gameController.player1);
        gameController.players.push(gameController.player2);
        switchTurnView();
        document.getElementById('newRound').style.display = 'inline';
        document.getElementById('quickPlay').innerHTML = 'Restart';
        document.getElementById('p1ScoreSpace').innerHTML = player1.score.toString();
        document.getElementById('p2ScoreSpace').innerHTML = player2.score.toString();
        gameOn = true;
    }

    function confirmRestart() {
        restartConfirmScreen.style.display = 'block';
    }

    //button presses
    //New player Submit
    submitButton.onclick = () => {createNewPlayers()};

    //quick play button
    quickPlayButton.onclick = () => {
        ngPress = false;
        gameOn
            ? confirmRestart()
            : quickPlay();
    }

    //New round button
    newRoundButton.onclick = () => {nextRound()};

    //New player button
    newPlayerButton.onclick = function() {
        ngPress = true;
        gameOn
            ? confirmRestart()
            : newPlayerModal.style.display = "block";
    }

    //Confirm restart button
    confirmButton.onclick = () =>{
        gameOn = false;
        ngPress == true
        ? newPlayerModal.style.display = 'block'
        : quickPlay();
        restartConfirmScreen.style.display = 'none';
        ngPress = false;
        nextRound();
    }

    //Cancel restart button
    document.getElementById('cancelBtn').onclick = () =>{
        restartConfirmScreen.style.display = 'none';
    }
    document.getElementsByClassName('close')[1].onclick = () => {
        restartConfirmScreen.style.display = 'none';
    }

    //close Modals
    closeBtn.onclick = function() {
    newPlayerModal.style.display = "none";
    restartConfirmScreen.style.display = 'none';
    document.getElementById("playerInfo").reset();
    }
    window.onclick = function(event) {
    if (event.target == newPlayerModal || event.target == restartConfirmScreen) {
        newPlayerModal.style.display = "none";
        restartConfirmScreen.style.display = 'none';
        document.getElementById("playerInfo").reset();
    }
    }

    return {box, player1, player2, players, matchOver, turnView, waitingTurnView, ngPress, player, placeMarker, checkResults, createNewPlayers, quickPlay, switchTurnView, newPlayerModal, newPlayerButton, closeBtn};
    })();