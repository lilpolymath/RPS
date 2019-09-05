const game = () => {
  let pScore = 0;
  let cScore = 0;

  // This handles the transistioning in and out
  // of the introScreen and matchScreen
  const startGame = () => {
    const playBtn = document.querySelector('.intro button');
    const introScreen = document.querySelector('.intro');
    const match = document.querySelector('.match');

    playBtn.addEventListener('click', () => {
      introScreen.classList.add('fadeOut');
      match.classList.add('fadeIn');
    });
  };

  //   Logic for the Game playing
  const playMatch = () => {
    const options = document.querySelectorAll('.options button');
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    const hands = document.querySelectorAll('.hands img');

    // hands.forEach(hand => {
    //     hand.addEventListener('animationend',  function() {
    //         this.style.animation = '',
    //     })
    // })

    const computerOptions = ['rock', 'paper', 'scissors'];

    options.forEach(option => {
      option.addEventListener('click', function() {
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        compare(this.textContent, computerChoice);
        updateScore();
        playerHand.src = `./assets/${this.textContent}.png`;
        computerHand.src = `./assets/${computerChoice}.png`;

        playerHand.style.animation = 'shaker 2s ease';
        computerHand.style.animation = 'shakePlayer 2s ease';
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector('.player-score p');
    const computerScore = document.querySelector('.computer-score p');

    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
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

  startGame();
  playMatch();
};

game();
