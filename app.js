// Main variables in use
let pScore, cScore, gameCount;
const playerScore = document.querySelector('.player-score p');
const computerScore = document.querySelector('.computer-score p');
const playBtn = document.querySelector('.intro button');
const introScreen = document.querySelector('.intro');
const match = document.querySelector('.match');
const options = document.querySelectorAll('.options button');
const playerHand = document.querySelector('.player-hand');
const computerHand = document.querySelector('.computer-hand');
const hands = document.querySelectorAll('.hands img');
const pScoreResult = document.querySelector('.player-result p');
const cScoreResult = document.querySelector('.computer-result p');
const matchResult = document.querySelector('.second-div h3');
const computerOptions = ['rock', 'paper', 'scissors'];
const myModal = document.getElementById('openModal');
const close = document.getElementById('close');

// To close the scoreboard.
close.onclick = function() {
  myModal.style.display = 'none';
  startGame();
};

// This is for the loading animation at the start.
const load = () => {
  var numm = 1;
  const change = () => {
    var num = document.getElementById('num');
    if (numm <= 100) {
      document.getElementsByClassName('game').style = 'display:none;';
      num.innerHTML = numm;
      numm++;
    } else {
      document.getElementById('dots').style = 'display:none;';
      document.getElementById('game').style = 'display:unset;';
      document.getElementById('body').style = 'display:unset;';
      document.getElementById('body').style.background = '#ff9999';
    }
  };

  setInterval(change, 100);
  startGame();
};

// This handles the transistion from introScreen to matchScreen.
const startGame = () => {
  playBtn.addEventListener('click', () => {
    introScreen.classList.add('fadeOut');
    match.classList.add('fadeIn');
  });
  playMatch();
};

//  The main game playing.
const playMatch = () => {
  pScore = 0;
  cScore = 0;
  gameCount = 10;

  // To reset the scores of the players
  pScoreResult.textContent = pScore;
  cScoreResult.textContent = cScore;

  // Listen for an hand to be selected.
  hands.forEach(hand => {
    hand.addEventListener('animationend', function() {
      this.style.animation = '';
    });
  });

  random();
};

// This is for the computer to make a random choice.
const random = () => {
  options.forEach(option => {
    option.onclick = function() {
      const computerNumber = Math.floor(Math.random() * 3);
      const computerChoice = computerOptions[computerNumber];
      if (gameCount != 1) {
        compare(this.textContent, computerChoice);

        playerHand.src = `./assets/p${this.textContent}.png`;
        computerHand.src = `./assets/${computerChoice}.png`;

        computerHand.style.animation = 'shakePlayer 2s ease';
        playerHand.style.animation = 'shakePlayer 2s ease';

        updateScore();
      } else {
        result();
      }
    };
  });
};

// This is to update the scoreboard.
const result = () => {
  pScoreResult.textContent = pScore;
  cScoreResult.textContent = cScore;
  if (pScore > cScore) {
    matchResult.textContent = 'You Win!';
  } else if (cScore > pScore) {
    matchResult.textContent = 'You Lose!';
  } else {
    matchResult.textContent = 'Draw!';
  }
  myModal.style = 'display: block';
};

// This updates the score and game count.
const updateScore = () => {
  playerScore.textContent = pScore;
  computerScore.textContent = cScore;

  gameCount--;
};

// This is to compare the hands and update the scores
const compare = (playerChoice, computerChoice) => {
  const winner = document.querySelector('.winner');
  if (playerChoice === computerChoice) {
    winner.textContent = 'It is a tie';
    return;
  }
  if (playerChoice === 'rock') {
    if (computerChoice === 'scissors') {
      winner.textContent = 'Player Wins';
      pScore += 1;
      return;
    } else {
      winner.textContent = 'Computer Wins';
      cScore += 1;
      return;
    }
  }
  if (playerChoice === 'paper') {
    if (computerChoice === 'scissors') {
      winner.textContent = 'Computer Wins';
      cScore += 1;
      return;
    } else {
      winner.textContent = 'Player Wins';
      pScore += 1;
      return;
    }
  }
  if (playerChoice === 'scissors') {
    if (computerChoice === 'rock') {
      winner.textContent = 'Computer Wins';
      cScore += 1;
      return;
    } else {
      winner.textContent = 'Player Wins';
      pScore += 1;
      return;
    }
  }
};

load();
