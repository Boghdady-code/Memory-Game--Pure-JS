let splashButton = document.querySelector(".splash span");
let gameName = document.querySelector(".game-info .game-name span");
splashButton.onclick = function () {
  let yourName = window.prompt("Whats your name ?");
  if (yourName === null || yourName === " ") {
    
    gameName.innerHTML = "Unknown";

  } else {

    gameName.innerHTML = yourName;

  }

  document.querySelector(".splash").remove();
  
};



let restartButton = document.querySelector ("button");

let body = document.querySelector("body");

let boxContainer = document.querySelector(".game-container");

let boxArray = Array.from (boxContainer.children);

let duration = 1000;




let endGameContainer = document.querySelector (".end-game");
let orderArray = Array.from(Array(boxArray.length).keys());

shuffle(orderArray);


boxArray.forEach (function (box, index) {


  box.style.order = orderArray[index];

  box.addEventListener ("click", function() {
    clickedBox(box);
  })



})


function clickedBox(box) {
  box.classList.add("clicked");
  let allClickedBox = boxArray.filter(box => box.classList.contains ("clicked"));
  if (allClickedBox.length === 2) {
    noClicking();
    checkMatched(allClickedBox[0],allClickedBox[1]);
  }
}


function noClicking () {
  boxContainer.classList.add ("no-clicking");
  setTimeout(function () { 
    
    boxContainer.classList.remove ("no-clicking");

  }, duration);
}


function checkMatched(firstBox, secondBox) {
  if (firstBox.dataset.technology === secondBox.dataset.technology) {

    firstBox.classList.remove("clicked");
    secondBox.classList.remove("clicked");

    firstBox.classList.add ("matched");
    secondBox.classList.add ("matched");

  } else {

    let tries = document.querySelector(".game-info .score span");

    tries.innerHTML = parseInt(tries.innerHTML)+1;

    setTimeout (function () {
      firstBox.classList.remove ("clicked");
      secondBox.classList.remove ("clicked");


    }, duration)
    
    endGame (tries);

  }
}



function shuffle (array) { 
  let current = array.length,
      temp,
      random;
      

  while (current > 0) {
    random = Math.floor (Math.random() * current);
    // console.log (random);
    current--;


    temp = array[current];
    array [current] = array [random];
    array [random] = temp;


  }

  return array;



}

function endGame (tries) {
  if (tries.innerHTML == 10) {
    let pEnd = document.createElement ("p");
    let TextEnd = document.createTextNode (`Game Over your Wrong Tries are more than ${tries.innerHTML}`);
    pEnd.appendChild (TextEnd);
    endGameContainer.appendChild(pEnd);
    boxContainer.remove();
    endGameContainer.style.display = "block";
    body.classList.add("finished");
    restartButton.style.display = "block";
  }
}


restartButton.addEventListener ("click" , function () {
  window.location.reload();
})


