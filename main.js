import { calculator } from './calc.js';

var calc = new calculator();

function keyboardCalls(key, code){
  console.log(code);
  if ((code < 58) && (code > 47)) {
     calc.changeActual(parseFloat(key));
  }

  if ((code == 61) || (code==13)){
    calc.changeToEqual();
  }
  if (code == 43){
    calc.changeToAdd();
  }

  if (code == 45){
    calc.changeToSub();
  }

  if (code == 42){
    calc.changeToMul();
  }

  if (code == 37){
    calc.changeToPct();
  }

  if (code == 47){
    calc.changeToDiv();
  }

  if (code == 8){
    calc.clearPrev();
  }

  if (code == 127){
    calc.clearAll();
  }

  if (code == 46){
    calc.decimalOn();
  }
}

function one(){
  calc.changeActual(1);
}
function two(){
  calc.changeActual(2);
}
function three(){
  calc.changeActual(3);
}
function four(){
  calc.changeActual(4);
}
function five(){
  calc.changeActual(5);
}
function six(){
  calc.changeActual(6);
}
function seven(){
  calc.changeActual(7);
}
function eight(){
  calc.changeActual(8);
}
function nine(){
  calc.changeActual(9);
}
function zero(){
  calc.changeActual(0);
}

function plus(){
  calc.changeToAdd();
}

function minus(){
  calc.changeToSub();
}

function multiply(){
  calc.changeToMul();
}

function pct(){
  calc.changeToPct();
}

function divide(){
  calc.changeToDiv();
}

function equal(){
  calc.changeToEqual();
}

function clearPrev(){
  calc.clearPrev();
}

function clearAll(){
  calc.clearAll();
}

function decimalOn(){
  calc.decimalOn();
}

function changeSign(){
  calc.changeSign();
}



$(document).ready(function() {
  $("#one").on("click", one);
  $("#two").on("click", two);
  $("#three").on("click", three);
  $("#four").on("click", four);
  $("#five").on("click", five);
  $("#six").on("click", six);
  $("#seven").on("click", seven);
  $("#eight").on("click", eight);
  $("#nine").on("click", nine);
  $("#zero").on("click", zero);
  $("#clear").on("click", clearPrev);
  $("#dot").on("click", decimalOn);
  $("#plus").on("click", plus);
  $("#minus").on("click", minus);
  $("#times").on("click", multiply);
  $("#div").on("click", divide);
  $("#pct").on("click", pct);
  $("#equal").on("click", equal);
  $("#ac").on("click", clearAll);
  $("#sign").on("click", changeSign);
});

document.addEventListener('keypress', (event) => {
  const keyName = event.key;
  keyboardCalls(keyName, event.keyCode);

});