// blue: #0278ee;
// orange: #ff913e;
// pink: #dd0074;
// green: #02ee78;
// yellow: #e9e741;
// purple: #b148f4;

// ['blue', 'orange', 'pink', 'green', 'yellow', 'puprle']

let colors = ['purple', 'yellow', 'green', 'pink', 'orange', 'blue'];

// function that creates random color sequence for the computer side
function randomColorsArray(numOfColors){
  let array = [];
  for(let i=0; i<numOfColors; i++){
    array.push(colors[Math.floor(Math.random() * 6)]);
  }
  return array
}


let timeLimit;
let computerColors = [];
const numberOfColors = 4;
let numOfAttempts;
let attemptsCounter = 0;
let history_array = [];


let start = document.querySelector('.start');
let settings = document.querySelector('.setting-container');
let game_area = document.querySelector('.game-container');
let attempt_btn = document.querySelector('.attempt-btn');
let span = document.querySelector(".close");
let history_container = document.querySelector('.attempt-history-container');
let new_game = document.querySelector('.new-game');
let attemptsLeft = document.querySelector('.attempts');
let modal =  document.querySelector("#winLooseModal");
let message3 = document.querySelector('.end-message-3');

let modal_rules =  document.querySelector("#rules-modal");
let rules = document.querySelector('.rules');
let close_rules_modal = document.querySelector('.close-rules-modal');

let winners_modal = document.querySelector('#winners-modal');
let winners = document.querySelector('.winners');
let close_winners_modal = document.querySelector('.close-winners-modal');

// generating random colors for the computer code
computerColors = randomColorsArray(numberOfColors);

// console output for testing purposes
console.log("computer collors: " + computerColors);
// test case 
// computerColors = ['purple', 'purple', 'green', 'purple'];


// papulating history row dynamicaly
function papulate_history_array(){
  let each_history = document.querySelector('.each-attempt-history');
  let array = [];
  array.push(each_history)
  for(let i=1; i<numOfAttempts; i++){
    array[i] = each_history.cloneNode(true);
  }
  return array;
}

// updating history row
function update_history_array(array){
  history_container.innerHTML = "";
  for(let i=0; i<array.length; i++){
    history_container.appendChild(array[i]);
  }
}

// check if player won
function isWon(array){
  for(each of array){
    if(each !== 'dark-green') return false
  }
  return true
}

// Timer function
function countdown( elementName, minutes, seconds ){
  let element, endTime, hours, mins, msLeft, time;
    function twoDigits(n){
        return (n <= 9 ? "0" + n : n);
    }
    function updateTimer(){
      msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
          element.innerHTML = "0";
        } else {
          time = new Date( msLeft );
          hours = time.getUTCHours();
          mins = time.getUTCMinutes();
          element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
          setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }
  element = document.getElementById(elementName);
  endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
  updateTimer();
}


// time is up modal
function timeUp() {
  modal.style.display = "block";
  document.querySelector('.end-message-1').textContent = "Time is up!";
  document.querySelector('.end-message-2').textContent = "Game over";
  message3.textContent = `Try again.`;
  game_area.classList.add('remove');
}

//hiding game area ho display settings on the home screen first
game_area.classList.add('remove');



// MAIN START OF THE GAME BUTTON
start.addEventListener('click', (e) => {

  // hiding settings, displaying main game area with fade in effect
  settings.classList.add('remove');
  game_area.classList.add('fadeInn');
  game_area.classList.remove('remove');
  
  // adding setting for the player into the game
  for (let i=1; i<4; i++){
    // number of attempts
    if (document.querySelector('#att' + i).checked){
      numOfAttempts = document.querySelector('#att' + i).value;
    }
    // timer
    if (document.querySelector('#time' + i).checked){
      time = document.querySelector('#time' + i).value;
    }
  }

  // populating history row with 
  history_array = papulate_history_array();
  update_history_array(history_array);

  // updating number of attepts left for the front end 
  attemptsLeft.textContent = numOfAttempts - attemptsCounter;

  // setting up timer if shosen in settings by the player
  if(time > 0) {
    countdown( "timer", time, 0 );
    setTimeout(timeUp, time * 60000);
  }
})


// This part allows user to choose colors for the guessing attempt
let colorObj = [];
for (let i=1; i<5; i++){
  colorObj[i-1] = document.querySelector('.color' + i);
  colorObj[i-1].addEventListener('click', (e) => { 
    for (let i=0; i<colors.length; i++){
      if (e.target.classList[e.target.classList.length - 1] === colors[i]){
        if(i === colors.length - 1){
          e.target.classList.add(colors[0]);
        } else{
          e.target.classList.add(colors[i+1])
        }
        e.target.classList.remove(colors[i]);
        return;
      } else if (i === colors.length -1){
        e.target.classList.add(colors[0]);
      }
    }
  });
}






// MAIN GAME LOGIC
attempt_btn.addEventListener('click', (e) => {
  let playerColors = [];
  // error tracker for players input
  let error = 0;

  // error message output when user hit submit without entering all 4 colors
  for (let i=0; i<4; i++){
    if(colorObj[i].classList[colorObj[i].classList.length-1] === 'btn'){
      error++;
    }
    if (error > 0){ 
      document.querySelector('.error-message').style.visibility = 'visible';
    }
    else { 
      document.querySelector('.error-message').style.visibility = 'hidden';
      playerColors[i] = colorObj[i].classList[colorObj[i].classList.length-1]
    }
  }

  // error check that all the colors were entered;
  if(error === 0){
    // creating copies of all the original arrays to be able to mark matched colors to avoid duplicates in the computer answer row
    let computerAnswer = ['grey', 'grey', 'grey', 'grey'];
    let tempComputerColors = [...computerColors];
    let tempPlayerColors = [...playerColors];
    let answerIterator = 0;
    // first round of iterastions to mark all the exact matches(same color, same position, green)
    for (let i=0; i<tempPlayerColors.length; i++){
      for (let j=0; j<tempComputerColors.length; j++){
        if (i === j && tempPlayerColors[i] === tempComputerColors[j]){
          computerAnswer[answerIterator] = 'dark-green';
          answerIterator++;
          // marking mached collors to "remove" them and avoid duplicates in reply
          tempComputerColors[j] = '#';
          tempPlayerColors[i] = '$'
        }
      }
    } 
    // second round of iterations to mark all the color matches, but wrong position (white)
    for (let i=0; i<tempPlayerColors.length; i++){
      for (let j=0; j<computerColors.length; j++){
      if (tempPlayerColors[i] === tempComputerColors[j]){
          computerAnswer[answerIterator] = 'white';
          answerIterator++;
          tempComputerColors[j] = '#';
          tempPlayerColors[i] = '$'
        } 
      }
    }
    
    // grabbing the last history row to insert it an to insert
    let active_history_row = history_array.pop();

    // adding players colors classes to the correspodding history row
    for(let i=0; i<active_history_row.children.length-1; i++){
      active_history_row.children[i+1].classList.add(playerColors[i]);
    }

    // adding color classes to the computer response  
    //first row
    active_history_row.children[5].children[0].children[0].classList.add(computerAnswer[0])
    active_history_row.children[5].children[0].children[1].classList.add(computerAnswer[1])
    // second row
    active_history_row.children[5].children[1].children[0].classList.add(computerAnswer[2])
    active_history_row.children[5].children[1].children[1].classList.add(computerAnswer[3])

    // pushing updated history row with computer response to the beginning the array (to shot up on top on the front end)
    history_array.unshift(active_history_row);
    // updating history section
    update_history_array(history_array);

    // removing previosly selected colors by the player form the front end
    for (let i=1; i<5; i++){
      document.querySelector('.color' + i).classList.remove(playerColors[i-1]);
    }
    // adding 1 to attempt counter
    attemptsCounter++;
    
    // adding uttempt number to the left side of the history row
    document.querySelector('.attempt-num').textContent = attemptsCounter;

    // updating front end attemts left for this game
    attemptsLeft.textContent = numOfAttempts - attemptsCounter;
    
    // checking if user won or lost the game
    if(isWon(computerAnswer)){
    
      update_history_array(history_array);
      // show the modal and populate it with "User won messages"
      modal.style.display = "block";
      document.querySelector('.end-message-1').textContent = "Congratulations!";
      document.querySelector('.end-message-2').textContent = "You won the game!";
      game_area.classList.add('remove');
      // customisation of the message base on how many attemps it took user to win the game
      if (attemptsCounter === 1){
        message3.textContent = `Great job!! You won with ${attemptsCounter} attempt!`;
      } else if (attemptsCounter < 5){
        message3.textContent = `Great job!! You won with ${attemptsCounter} attempts!`;
      } else {
        message3.textContent = `Not bad!! You won with ${attemptsCounter} attempts!`;
      }
      // grabbing a winning history row and removing all the extras to showcase in the modal
      let winning_row = history_array.shift();
      winning_row.removeChild(winning_row.lastElementChild);
      winning_row.removeChild(winning_row.firstElementChild);
      // adding that winning row of colors to the modal
      document.querySelector('.winning-row').appendChild(winning_row);
      game_area.classList.add('remove');
    }
    else if(numOfAttempts - attemptsCounter === 0 && !isWon(computerAnswer) ){
      update_history_array(history_array);
      // show the modal and populate it with "Game ower"
      modal.style.display = "block";
      document.querySelector('.end-message-1').textContent = "Bummer!";
      document.querySelector('.end-message-2').textContent = "Game over";
      message3.textContent = `Try again.`;
      game_area.classList.add('remove');
    }
    }

});


// all the event listeners

// modal closing when clicked outside of the modal
window.addEventListener('click', function(event) {
  if (event.target == modal){
    modal.style.display = "none";
    location.reload();
  } else if(event.target == modal_rules || event.target == winners_modal){
    modal_rules.style.display = "none";
    winners_modal.style.display = "none";
  }
});

// modal X closing button
span.addEventListener('click', () => {
  modal.style.display = "none";
  modal_rules.style.display = "none";
  location.reload();
});

// new game button
new_game.addEventListener('click', () => {
  modal.style.display = "none";
  location.reload();
});

// rules botton
rules.addEventListener('click', () => {
  modal_rules.style.display = "block";
});

//close rules button
close_rules_modal.addEventListener('click', () => {
   modal_rules.style.display = "none";
 });

 winners.addEventListener('click', () => {
  winners_modal.style.display = "block";
});

//close winners button
close_winners_modal.addEventListener('click', () => {
  winners_modal.style.display = "none";
});





