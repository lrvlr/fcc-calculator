import { numberWithDecimals } from './numberWithDecimals.js';
import { display } from './display.js';
import { notWritting, numberWritten, decimalWritting, integerWritting } from './numState.js';
import { noFunction, eqFunction } from './funcState.js';


var max_decimals = 50;

var addPromise = function(oldAcc){
  var oldAccAux = new numberWithDecimals(0,0, max_decimals);
  oldAcc.copyTo(oldAccAux);
  return function(value){
    oldAccAux.add(value);
    return oldAccAux;
  }
}
var subPromise = function(oldAcc){
  var oldAccAux = new numberWithDecimals(0,0, max_decimals);
  oldAcc.copyTo(oldAccAux);  
  return function(value){
    oldAccAux.sub(value);
    return oldAccAux;
  }
}

var mulPromise = function(oldAcc){
  var oldAccAux = new numberWithDecimals(0,0, max_decimals);
  oldAcc.copyTo(oldAccAux);
  return function(value){
    oldAccAux.mul(value);
    return oldAccAux;
  }
}

var divPromise = function(oldAcc){
  var oldAccAux = new numberWithDecimals(0,0, max_decimals);
  oldAcc.copyTo(oldAccAux);
  return function(value){
    oldAccAux.div(value);
    return oldAccAux;
  }
}

var pctPromise = function(oldAcc){
  var oldAccAux = new numberWithDecimals(0,0, max_decimals);
  oldAcc.copyTo(oldAccAux);
  return function(value){
    oldAccAux.pct(value);
    return oldAccAux;
  }
}

var endPromise = function(oldAcc){
  var oldAccAux = new numberWithDecimals(0,0, max_decimals);
  oldAcc.copyTo(oldAccAux);
  return function(value){
    return value;
  }
}

var calculator = function(){
  this.acc = new numberWithDecimals(0,0,max_decimals);
  this.prev = new numberWithDecimals(0,0,max_decimals);
  this.actual = new numberWithDecimals(0,0,max_decimals);
  this.display = new display(this, this.prev.getValue());

  this.functionState = new noFunction(this);
  this.numberState = new numberWritten(this);

  this.functionStack = [];
  this.functionStack.push(new endPromise(this.acc));


  /*----DISPLAY ----*/

  this.newEcuation = function() {
    this.display.clearEquation();
  }
  this.addNumberToEquation = function(){
    this.display.updateNumberInEquation();
  }
  
  this.updateResult = function (){
     this.updatePrev(this.acc);
     this.display.refreshResult();
  }

  this.updateActual = function () {
    this.updatePrev(this.actual);
    this.display.refreshResult();
  }

  this.lastPreview = function(){
    return this.prev.getValue();
  }
  /*----END DISPLAY ----*/
  
  /*---CLEAR FUNCTIONS----*/
  this.clearActual = function () {
    this.actual.reset();
    this.display.refreshResult();
    this.numberState = new numberWritten(this);
  }

  this.clearPrev = function (){
    this.prev.reset();
    this.display.updateValue();
    this.clearActual();
  }

  this.clearAll = function () {
    this.acc.reset();
    this.newEcuation();
    this.functionState = new noFunction(this);
    this.functionStack = [];
    this.functionStack.push(new endPromise(this.acc));
    this.clearPrev();
  }
 /*---END CLEAR FUNCTIONS----*/
  
  /*---ENTERING NUMBER---*/
  this.resetPreviousIfNeeded = function (){
      this.functionState.newNumber();  
  }
  
  this.changeSign = function(){
    this.functionState.changeSign();
  }

  this.changeResultSign = function(){
    this.prevToActual();
    this.changeActualSign();
    this.actualToAcc();
  }
  
  this.changeActualSign = function(){
    this.actual.changeSign();
    this.updateActual();
  }
  
  this.newNumber = function(number){
    this.resetPreviousIfNeeded();
    this.numberState = new integerWritting(this);
    this.numberState.addNumber(number);
  }
  
  this.changeActual = function (num){
    this.numberState.addNumber(num);
 }
  
   this.decimalOn = function (){
     this.numberState.addDecimal();
   }
  
  this.decimalStart = function (){
    this.numberState = new decimalWritting(this);
    this.actual.decimals++;    
  }

  this.addNumber = function(aNumber){
    var actualSign = Math.sign(this.actual.value);
    actualSign = (actualSign == 0) ? (actualSign + 1) : actualSign;
    var result = parseFloat(this.actual.value) + actualSign * parseFloat(aNumber);
    var decRes = (this.actual.decimals > 0) ? (this.actual.decimals - 1) : 0; 
    this.actual.value = result.toFixed(decRes);
    this.updateActual();
  }

  this.addDecimal = function(number){
    var decPos = Math.pow(10, this.actual.decimals);
    number = number / decPos;
    number = number.toFixed(this.actual.decimals);
    this.actual.decimals++;      
    this.addNumber(number);
  }

  this.addOnes = function(number) {
    this.actual.value *= 10;
    this.addNumber(number);
  }
  
 
  /*----FUNCTION SOLVING----*/

  this.solve = function (){
    var useThis = new numberWithDecimals(0,0,max_decimals);
    this.actual.copyTo(useThis);
    while (this.functionStack.length > 0) {  
      var func = this.functionStack.pop();
      try{
        func(useThis).copyTo(this.acc);
        this.acc.copyTo(useThis);
        this.updateResult();
      } catch(err){
        this.clearAll();
        this.display.error(err);
        break;
      }
    }
  }
  
   
  
  /*----FUNCTION CHANGING ----*/

  this.erasePreviousFunction = function(){
    if (this.functionStack.length > 0) {
      this.functionStack.pop();
      this.accToActual();
    }
  }

  this.changeToNumberWritten = function(){
    this.numberState = new numberWritten(this);
  };
  
    
 this.resolvePreviousIfNeeded = function (){
   this.numberState.numberCompleted(); 
   this.numberState.solve();
   this.functionState = new noFunction(this);
   this.numberState = new notWritting(this);
  }


  this.resolvePrevIfNeededAndChangeToDivOrMul = function (newFunction, sign){
    this.numberState.numberCompleted(); 

    if (this.functionStack.length > 1) {

        var func = this.functionStack.pop();
        func(this.actual).copyTo(this.acc);
        this.functionStack.push(newFunction(this.acc));
        this.updateResult();

      } else {

        this.functionStack.push(newFunction(this.actual));
        this.actualToAcc();
      }
    this.functionState = new noFunction(this); 
    this.numberState = new notWritting(this);
    this.clearActual();
    this.display.updateSignInEquation(sign);
   }

  
  this.resolvePreviousAndUpdateEquationSign = function (sign){
      this.resolvePreviousIfNeeded();
      this.display.updateSignInEquation(sign);
  }
  
  this.changeToAdd = function (){
    this.resolvePreviousAndUpdateEquationSign("+");
    this.functionStack.push(new addPromise(this.acc));
  }
  
  this.changeToSub = function (){
    this.resolvePreviousAndUpdateEquationSign("-");
    this.functionStack.push(new subPromise(this.acc));
  }
  
  this.changeToPct = function (){
    this.resolvePreviousAndUpdateEquationSign("%");
    this.functionStack.push(new pctPromise(this.acc));
  }

  this.changeToMul = function (){
    var mulFunction = function(){
      return function(value){
        return new mulPromise(value);
      }
    }
    this.resolvePrevIfNeededAndChangeToDivOrMul(new mulFunction(), "x");
  }
  
  this.changeToDiv = function (){
    var divFunction = function(){
      return function(value){
        return new divPromise(value);
      }
    }
    this.resolvePrevIfNeededAndChangeToDivOrMul(new divFunction(), "/");
  }
  
  
  this.changeToEqual = function (){
    this.resolvePreviousIfNeeded();
    this.newEcuation();
    this.functionState = new eqFunction(this);
    this.numberState = new numberWritten(this);
    this.prevToActual();
  }
  
  
  /*----NUMBERS COPY----*/
  this.actualToAcc = function () {
    this.actual.copyTo(this.acc);
  }
  
  this.prevToActual = function () {
    this.prev.copyTo(this.actual);
  }
  
  this.updatePrev = function(value){
    value.copyTo(this.prev);
    this.display.updateValue();
  }

  this.accToActual = function () {
    this.acc.copyTo(this.actual);
  }
   
}

export { calculator };