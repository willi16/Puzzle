/*
const puzzleContainer = document.getElementById('puzzleContainer');
const shuffleButton = document.getElementById('shuffleButton');
const difficultySelect = document.getElementById('difficulty');

const images = ['drapeau', 'laptop', 'mosquée','logo.png','logo'];
let imageUrl = '';
let rows = 4;
let cols = 4;
let pieces = [];


function createPuzzle() {
    pieces = [];
    puzzleContainer.innerHTML = '';

    puzzleContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    puzzleContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    const pieceWidth = 400 / cols;
    const pieceHeight = 400 / rows;

    // Mettre à jour l'image du puzzle
    const puzzleImage = document.getElementById('puzzleImage');
    puzzleImage.src = imageUrl; // Met à jour la source de l'image

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzlePiece');
            piece.style.backgroundImage = `url(${imageUrl})`;
            piece.style.backgroundSize = `400px 400px`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;
            piece.setAttribute('draggable', true);
            piece.dataset.position = `${row}-${col}`;
            piece.addEventListener('dragstart', dragStart);
            piece.addEventListener('dragover', dragOver);
            piece.addEventListener('drop', drop);
            puzzleContainer.appendChild(piece);
            pieces.push(piece);
        }
    }
}



function shufflePuzzle() {
    pieces.sort(() => Math.random() - 0.5);
    puzzleContainer.innerHTML = '';
    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.position);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const fromPosition = e.dataTransfer.getData('text/plain');
    const toPosition = e.target.dataset.position;

    const fromPiece = pieces.find(piece => piece.dataset.position === fromPosition);
    const toPiece = pieces.find(piece => piece.dataset.position === toPosition);

    if (fromPiece && toPiece) {
        const fromIndex = pieces.indexOf(fromPiece);
        const toIndex = pieces.indexOf(toPiece);
        pieces[fromIndex] = toPiece;
        pieces[toIndex] = fromPiece;

        puzzleContainer.innerHTML = '';
        pieces.forEach(piece => puzzleContainer.appendChild(piece));
    }
}

function initGame() {
    const selectedImage = images[Math.floor(Math.random() * images.length)];
    imageUrl = selectedImage;
    const difficulty = parseInt(difficultySelect.value);
    rows = cols = difficulty;
    createPuzzle();
    shufflePuzzle();
}

shuffleButton.addEventListener('click', initGame);
difficultySelect.addEventListener('change', initGame);

// Démarrage auto
initGame();
*/


const puzzleContainer = document.getElementById('puzzleContainer');
const shuffleButton = document.getElementById('shuffleButton');
const difficultySelect = document.getElementById('difficulty');

const images = ['drapeau', 'laptop', 'mosquée','logo.png','logo','kbu.png'];
let imageUrl = '';
let rows = 4;
let cols = 4;
let pieces = [];


function createPuzzle() {
    pieces = [];
    puzzleContainer.innerHTML = '';

    puzzleContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    puzzleContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    const pieceWidth = 400 / cols;
    const pieceHeight = 400 / rows;

    // Mettre à jour l'image du puzzle
    const puzzleImage = document.getElementById('puzzleImage');
    puzzleImage.src = imageUrl; // Met à jour la source de l'image

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzlePiece');
            piece.style.backgroundImage = `url(${imageUrl})`;
            piece.style.backgroundSize = `400px 400px`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;
            piece.setAttribute('draggable', true);
            piece.dataset.position = `${row}-${col}`;
            piece.addEventListener('dragstart', dragStart);
            piece.addEventListener('dragover', dragOver);
            piece.addEventListener('drop', drop);
            puzzleContainer.appendChild(piece);
            pieces.push(piece);
        }
    }
}



function shufflePuzzle() {
    pieces.sort(() => Math.random() - 0.5);
    puzzleContainer.innerHTML = '';
    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.position);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const fromPosition = e.dataTransfer.getData('text/plain');
    const toPosition = e.target.dataset.position;

    const fromPiece = pieces.find(piece => piece.dataset.position === fromPosition);
    const toPiece = pieces.find(piece => piece.dataset.position === toPosition);

    if (fromPiece && toPiece) {
        const fromIndex = pieces.indexOf(fromPiece);
        const toIndex = pieces.indexOf(toPiece);
        pieces[fromIndex] = toPiece;
        pieces[toIndex] = fromPiece;

        puzzleContainer.innerHTML = '';
        pieces.forEach(piece => puzzleContainer.appendChild(piece));
    }
}



const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const confettiContainer = document.getElementById('confettiContainer');

function checkPuzzleSolved() {
    for (let i = 0; i < pieces.length; i++) {
        const expectedPosition = `${Math.floor(i / cols)}-${i % cols}`;
        if (pieces[i].dataset.position !== expectedPosition) {
            return false;
        }
    }
    return true;
}

function createConfetti() {
    for (let i = 0; i < 50; i++) { // Create 50 flower confetti pieces
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        flower.style.top = `${Math.random() * 100}vh`; // Start from random vertical position
        confettiContainer.appendChild(flower);

        // Remove the flower after the animation ends
        
        flower.addEventListener('animationend', () => {
            flower.remove();
        });
        
    }
}

function animateWinningPieces() {
    pieces.forEach(piece => {
        piece.classList.add('winning');
        // Remove the winning class after the animation ends
        piece.addEventListener('animationend', () => {
            piece.classList.remove('winning');
        });
    });
}

function showPopup() {
    popup.style.display = 'flex';
    createConfetti();
    animateWinningPieces();
}

function hidePopup() {
    popup.style.display = 'none';
}



function drop(e) {
    e.preventDefault();
    const fromPosition = e.dataTransfer.getData('text/plain');
    const toPosition = e.target.dataset.position;

    const fromPiece = pieces.find(piece => piece.dataset.position === fromPosition);
    const toPiece = pieces.find(piece => piece.dataset.position === toPosition);

    if (fromPiece && toPiece) {
        const fromIndex = pieces.indexOf(fromPiece);
        const toIndex = pieces.indexOf(toPiece);
        pieces[fromIndex] = toPiece;
        pieces[toIndex] = fromPiece;

        puzzleContainer.innerHTML = '';
        pieces.forEach(piece => puzzleContainer.appendChild(piece));

        if (checkPuzzleSolved()) {
            showPopup();
            
        }
    }
}

closePopup.addEventListener('click', hidePopup);



function initGame() {
    const selectedImage = images[Math.floor(Math.random() * images.length)];
    imageUrl = selectedImage;
    const difficulty = parseInt(difficultySelect.value);
    rows = cols = difficulty;
    createPuzzle();
    shufflePuzzle();
}

shuffleButton.addEventListener('click', initGame);
difficultySelect.addEventListener('change', initGame);


// Démarrage auto
initGame();

