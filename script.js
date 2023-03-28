// blue: #0278ee;
// orange: #ff913e;
// pink: #dd0074;
// green: #02ee78;
// yellow: #e9e741;
// purple: #b148f4;

// ['blue', 'orange', 'pink', 'green', 'yellow', 'puprle']

let colors = ['purple', 'yellow', 'green', 'pink', 'orange', 'blue'];


function randomColorsArray(num){
  let array = [];
  for(let i=0; i<num; i++){
    array.push(colors[Math.floor(Math.random() * 6)]);
    //console.log(Math.floor(Math.random() * num))
  }
  return array;
}


// Allows user to choose colors for the gussing attempt
let colorObj = [];

for (let i=1; i<5; i++){
  colorObj[i-1] = document.querySelector('.color' + i);
  colorObj[i-1].addEventListener('click', (e) => {
    for (let i=0; i<colors.length; i++){
      if (e.target.classList[e.target.classList.length - 1] === colors[i]){
        if(i === colors.length - 1){
          e.target.classList.add(colors[0])
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

let attempt_btn = document.querySelector('.attempt-btn');
attempt_btn.addEventListener('click', (e) => {
  for (let i=0; i<4; i++){
    colorObj.classList;
    //console.log(colorObj[i].classList.length)
    //console.log(colorObj[i].classList[colorObj[i].classList.length-1]);
    //console.log(colorObj[i].target.classList)
    if(colorObj[i].classList[colorObj[i].classList.length-1] === 'btn'){
      document.querySelector('.error-message').style.visibility = 'visible';
      console.log('error');
    } else{
      document.querySelector('.error-message').style.visibility = 'hidden';
      console.log('Good');
    }
  }
});

