const myModal = document.getElementById('openModal');

const close = document.getElementById('close');
close.onclick = function() {
  myModal.style.display = 'none';
  startGame();
};

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

// Main variables in use
let pScore, cScore, gameCount;

// This handles the transistioning in and out
// of the introScreen and matchScreen
const startGame = () => {
  pScore = 0;
  cScore = 0;
  gameCount = 10;
  const playBtn = document.querySelector('.intro button');
  const introScreen = document.querySelector('.intro');
  const match = document.querySelector('.match');

  playBtn.addEventListener('click', () => {
    introScreen.classList.add('fadeOut');
    match.classList.add('fadeIn');
  });
  playMatch();
};

//  Logic for the Game playing
const playMatch = () => {
  const options = document.querySelectorAll('.options button');
  const playerHand = document.querySelector('.player-hand');
  const computerHand = document.querySelector('.computer-hand');
  const hands = document.querySelectorAll('.hands img');

  hands.forEach(hand => {
    hand.addEventListener('animationend', function() {
      this.style.animation = '';
    });
  });

  const computerOptions = ['rock', 'paper', 'scissors'];

  options.forEach(option => {
    option.addEventListener('click', function() {
      const computerNumber = Math.floor(Math.random() * 3);
      const computerChoice = computerOptions[computerNumber];
      if (gameCount != 0) {
        compare(this.textContent, computerChoice);
        playerHand.src = `./assets/p${this.textContent}.png`;
        computerHand.src = `./assets/${computerChoice}.png`;

        computerHand.style.animation = 'shakePlayer 2s ease';
        playerHand.style.animation = 'shakePlayer 2s ease';

        updateScore();
      } else {
        result();
      }
    });
  });
};

const result = () => {
  const pScoreResult = document.querySelector('.player-result p');
  const cScoreResult = document.querySelector('.computer-result p');
  const result = document.querySelector('.second-div h3');

  pScoreResult.textContent = pScore;
  cScoreResult.textContent = cScore;
  if (pScore > cScore) {
    result.textContent = 'You Win!';
  } else if (cScore > pScore) {
    result.textContent = 'You Lose!';
  } else {
    result.textContent = 'Draw!';
  }
  myModal.style = 'display: block';
};

const updateScore = () => {
  const playerScore = document.querySelector('.player-score p');
  const computerScore = document.querySelector('.computer-score p');

  playerScore.textContent = pScore;
  computerScore.textContent = cScore;
  gameCount--;
};

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
