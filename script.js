const game = () => {
    let pScore = 0;
    let cScore = 0;

    ///Get DOM elements
    const playerScore = document.querySelector('.player-score p');
    const computerScore = document.querySelector('.computer-score p');
    const introScreen = document.querySelector(".intro");
    const playBtn = document.querySelector(".intro button");
    const match = document.querySelector(".match");
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");
    const winner = document.querySelector(".winner");
    const resetBtn = document.querySelector(".reset button");

    // Audio
    const click = new Audio("./Sound/click.mp3");
    const game_start = new Audio("./Sound/game-start.mp3");
    const audio_reset = new Audio("./Sound/game-reset.mp3");
    const audio_win = new Audio("./Sound/game-win.mp3");
    const audio_loss = new Audio("./Sound/game-loss.wav");
    const audio_tie = new Audio("./Sound/game-tie.wav");
    
    
    //start the game
    const startGame = () => {
        playBtn.addEventListener("click", () => {
            game_start.play();
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };

    options.forEach((button) => {
        button.addEventListener("click", () => {
            click.play();
          });
     });
     
    // // resetBtn.addEventListener("click", () => {
    // //     click.play();
    // });
      

    //play match
    const playMatch = () => {
        hands.forEach(hand => {
            hand.addEventListener("animationend", function() {
              this.style.animation = "";
            });
          });
        // computer options
        const computerOptions = ['rock','paper','scissors'];
        options.forEach(option => {
            option.addEventListener("click",function(){
                //computer choice
                const computerNumber = Math.floor(Math.random()*3);
                const computerChoice = computerOptions[computerNumber];
                // call compareHands after 2 seconds
                setTimeout(() => {
                    //here we call compareHands
                    compareHands(this.textContent, computerChoice);
                    //update images
                    playerHand.src = `./Pictures/${this.textContent}.png`;
                    computerHand.src =`./Pictures/${computerChoice}.png`;
                }, 2000);

                //Animation
                playerHand.style.animation = "shakePlayer 1s ease";
                computerHand.style.animation = "shakeComputer 1s ease";
            });
        });

           //reset button
            resetBtn.addEventListener("click", () => {
            audio_reset.play();
            pScore = 0;
            cScore = 0;
            updateScore();
            playerHand.src = `./Pictures/rock.png`;
            computerHand.src = `./Pictures/rock.png`;
            winner.textContent = "Choose an option";
            introScreen.classList.remove("fadeOut");
            match.classList.remove("fadeIn");
        });
  
    };

    const updateScore = () => {
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    }

    const compareHands = (playerChoice, computerChoice) => {
        
        //checking for a tie
        if(playerChoice === computerChoice){
            winner.textContent = "It is a tie";
            audio_tie.play();
            return;
        }
        //check for rock
        if(playerChoice === 'rock'){
            if(computerChoice === 'scissors'){
                winner.textContent = "Player wins."
                audio_win.play();
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = "Computer wins."
                audio_loss.play();
                cScore++;
                updateScore();
                return;
            }
        }
        //check for paper
        if(playerChoice === 'paper'){
            if(computerChoice === 'rock'){
                winner.textContent = "Player wins."
                audio_win.play();
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = "Computer wins."
                audio_loss.play();
                cScore++;
                updateScore();
                return;
            }
        }
        //check for scissors
        if(playerChoice === 'scissors'){
            if(computerChoice === 'paper'){
                winner.textContent = "Player wins."
                audio_win.play();
                pScore++;
                updateScore();
                return;
            }else{
                winner.textContent = "Computer wins."
                audio_loss.play();
                cScore++;
                updateScore();
                return;
            }
        }
    }
        

    //call all the inner function
    startGame();
    playMatch();
}

//start the game
game();