let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];
let currentPlayer = 'X';
const winSound = new Audio('audio/ok.mp3');
const tieSound = new Audio('audio/bu.mp3');
const crossImg = 'img/cross.png'; // Pfad zum Kreuz-Bild
const circleImg = 'img/circle.png'; // Pfad zum Kreis-Bild
const gameImg = 'img/game.png';


function handleClick(index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        document.getElementById(`cell-${index}`).src = currentPlayer === 'X' ? crossImg : circleImg;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        checkWinner();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            displayResult(`${fields[a]}`);
            winSound.play();
            return;
        }
    }

    if (!fields.includes(null)) {
        lost();
        tieSound.play();
        return;
    }
}

function resetGame() {
    fields = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    currentPlayer = 'X';
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.innerText = '';
    }
}


function displayResult(winner) {
    let winnerImg;
    if (winner === 'X') {
        winnerImg = 'img/cross.png';
    } else if (winner === 'O') {
        winnerImg = 'img/circle.png';
    } 
    document.getElementById('result').innerHTML = `<p><img src="${winnerImg}" alt="${winner}" style="width: 40px;"> WINS!</p><img src="${gameImg}" alt="Game Over">`;
    document.getElementById('tic-tac-toe').style.display = 'none'; // Spielbrett ausblenden
    document.getElementById('playAgainBtn').style.display = 'block'; // Button anzeigen
}

function lost() {
    document.getElementById('result').innerHTML = `<img src="${gameImg}" alt="Game Over"> <p> You lost! </p>`;
    document.getElementById('tic-tac-toe').style.display = 'none'; // Spielbrett ausblenden
    document.getElementById('playAgainBtn').style.display = 'block'; // Button anzeigen
}

function restartGame() {
    location.reload(); // Seite neu laden, um das Spiel neu zu starten
}