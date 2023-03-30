// blue: #0278ee;
// orange: #ff913e;
// pink: #dd0074;
// green: #02ee78;
// yellow: #e9e741;
// purple: #b148f4;

// ['blue', 'orange', 'pink', 'green', 'yellow', 'puprle']

let colors = ['purple', 'yellow', 'green', 'pink', 'orange', 'blue'];

function randomColorsArray(numOfColors){
  let array = [];
  for(let i=0; i<numOfColors; i++){
    array.push(colors[Math.floor(Math.random() * 6)]);
    //console.log(Math.floor(Math.random() * num))
  }
  return array
}


let timeLimit;
let computerColors = [];
let numberOfColors = 4;
let numOfAttempts = 10;
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
let modal =  document.querySelector("#myModal");



// computerColors = randomColorsArray(numberOfColors);
computerColors = ['purple', 'purple', 'purple', 'purple'];


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

function update_history_array(array){
  history_container.innerHTML = "";
  for(let i=0; i<array.length; i++){
    history_container.appendChild(array[i]);
  }
}

function isWon(array){
  for(each of array){
    if(each !== 'dark-green') return false
  }
  return true
}

game_area.classList.add('remove');

start.addEventListener('click', (e) => {

  settings.classList.add('remove');
  game_area.classList.remove('remove');
  game_area.classList.add('fadeInn');

  for (let i=1; i<4; i++){
    if (document.querySelector('#att' + i).checked){
      numOfAttempts = document.querySelector('#att' + i).value;
    }
    if (document.querySelector('#time' + i).checked){
      time = document.querySelector('#time' + i).value;
    }
  }

  history_array = papulate_history_array();
  update_history_array(history_array);

  attemptsLeft.textContent = numOfAttempts - attemptsCounter;

  if(time > 0) {
    countdown( "ten-countdown", time, 0 );
    setTimeout(timeUp, time * 60000);
  }
})





// Allows user to choose colors for the guessing attempt
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

// main logic

//let temp = document.querySelector('#att1');
//console.log(temp.value);



attempt_btn.addEventListener('click', (e) => {
  let playerColors = [];
  // error check that all the colors were entered;
  let error = 0;
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

  if(error === 0){
    // console.log("Computer colors: " + computerColors);
    // console.log("Players colors: " + playerColors);
    let computerAnswer = [];
    let tempComputerColors = [...computerColors];

        // console.log(i +  " " + j + ") Players color: " + playerColors[i])
        // console.log(i +  " " + j + ") Computer color: " + computerColors[j])
        // console.log(playerColors[i] === computerColors[j])
        // console.log(i===j)
        // console.log('*************')
    for (let i=0; i<4; i++){
      for (let j=0; j<4; j++){
        if (i === j && playerColors[i] === tempComputerColors[j]){
          computerAnswer[i] = 'dark-green';
          tempComputerColors[j] = 'black';
        }
      }
    }

    for (let i=0; i<4; i++){
      for (let j=0; j<4; j++){
      if (i !== j && playerColors[i] === computerColors[j] && computerAnswer[i] !== '.white' && computerAnswer[i] !== 'dark-green'){
          computerAnswer[i] = 'white';
          tempComputerColors[j] = 'black';
          //console.log(i +  " " + j + ") WHITE goes in")
        } else if (computerAnswer[i] !== 'white' && computerAnswer[i] !== 'dark-green'){
        computerAnswer[i] = 'grey'
        //console.log(i +  " " + j + ") GREY goes in")
        }
      }
    }
    console.log('Computer answer: ' + computerAnswer);
    
    let active_history_row = history_array.pop();

    for(let i=0; i<active_history_row.children.length-1; i++){
      active_history_row.children[i].classList.add(playerColors[i]);
    }

    
    active_history_row.children[4].children[0].children[0].classList.add(computerAnswer[0])
    active_history_row.children[4].children[0].children[1].classList.add(computerAnswer[1])

    active_history_row.children[4].children[1].children[0].classList.add(computerAnswer[2])
    active_history_row.children[4].children[1].children[1].classList.add(computerAnswer[3])

    history_array.unshift(active_history_row);
    update_history_array(history_array);
    for (let i=1; i<5; i++){
      document.querySelector('.color' + i).classList.remove(playerColors[i-1]);
    }
    //numOfAttempts--;
    attemptsCounter++;
    attemptsLeft.textContent = numOfAttempts - attemptsCounter;
    let message3 = document.querySelector('.end-message-3');
    if(isWon(computerAnswer)){
      update_history_array(history_array);
      modal.style.display = "block";
      document.querySelector('.end-message-1').textContent = "Congratulations!";
      document.querySelector('.end-message-2').textContent = "You won the game!";
      game_area.classList.add('remove');
      if (attemptsCounter === 1){
        message3.textContent = `Great job!! You won with ${attemptsCounter} attempt!`;
      } else if (attemptsCounter < 5){
        message3.textContent = `Great job!! You won with ${attemptsCounter} attempts!`;
      } else {
        message3.textContent = `Not bad!! You won with ${attemptsCounter} attempts!`;
      }
      let winning_row = history_array.shift();
      winning_row.removeChild(winning_row.lastElementChild);
      document.querySelector('.winning-row').appendChild(winning_row);
    }
    else if(numOfAttempts - attemptsCounter === 0 && !isWon(computerAnswer) ){
      update_history_array(history_array);
      modal.style.display = "block";
      document.querySelector('.end-message-1').textContent = "Bummer!";
      document.querySelector('.end-message-2').textContent = "Game over";
      message3.textContent = `Try again.`;
    }
    }

});



window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    location.reload();
  }
});

span.addEventListener('click', () => {
  modal.style.display = "none";
  location.reload();
});

new_game.addEventListener('click', () => {
  modal.style.display = "none";
  location.reload();
});


// **************************************

// Timer function
function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "Time is up!";
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}

// time is up modal
function timeUp() {
  let message3 = document.querySelector('.end-message-3');
  modal.style.display = "block";
  document.querySelector('.end-message-1').textContent = "Time is up!";
  document.querySelector('.end-message-2').textContent = "Game over";
  message3.textContent = `Try again.`;
  modal.style.display = "none";
}