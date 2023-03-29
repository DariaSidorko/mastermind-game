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


let attempts = 10;
let computerColors = [];
let numberOfColors = 4;
let numOfAttempts = 3;

document.querySelector('.attempts').textContent = numOfAttempts

// computerColors = randomColorsArray(numberOfColors);
computerColors = ['purple', 'purple', 'purple', 'purple'];


// papulating history row dynamicaly
let history_array = [];
let history_container = document.querySelector('.attempt-history-container');


function papulate_history_array(array){
  let each_history = document.querySelector('.each-attempt-history');
 //console.log(each_history)
  array.push(each_history)
  for(let i=1; i<numOfAttempts; i++){
    array[i] = each_history.cloneNode(true);
    //array[i].classList.add('each-attempt-history')
  }
  return array;
}

function update_history_array(array){
  console.log('Updating!!')
  console.log(array)
  history_container.innerHTML = "";
  for(let i=0; i<array.length; i++){
    //console.log(array[i])
    history_container.appendChild(array[i]);
  }
  console.log(history_container)
}

history_array = papulate_history_array(history_array);

// history_array.pop();
// history_array.pop();
update_history_array(history_array);

//history_container.removeChild(history_container.children[0])
//update_history_array(history_array);
  


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


let attempt_btn = document.querySelector('.attempt-btn');
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
    numOfAttempts--;
    document.querySelector('.attempts').textContent = numOfAttempts;

    if(isWon(computerAnswer)){
      update_history_array(history_array);
      alert('You WON!');
      location.reload();
    }
    else if(numOfAttempts === 0 && !isWon(computerAnswer) ){
      update_history_array(history_array);
      alert('You LOST!');
      location.reload();
    }
    }

});

function isWon(array){
  for(each of array){
    if(each !== 'dark-green') return false
  }
  return true
}