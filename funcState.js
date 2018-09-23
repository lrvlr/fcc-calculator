/*----FUNCTION STATE------*/

var genericFunctionState = function(aCalculator){
    this.calculator = aCalculator;
    this.newNumber = function(){
    }
    this.changeSign = function(){
    }
}

var noFunction = function (aCalculator){
    genericFunctionState.call(this,aCalculator);
    this.newNumber = function(){
      this.calculator.clearActual();
    }
    this.changeSign = function(){
      this.calculator.changeActualSign();    
    }
};

var eqFunction = function (aCalculator){
    genericFunctionState.call(this,aCalculator);   
    this.newNumber = function(){
      this.calculator.clearAll();
    }
    this.changeSign = function(){
      this.calculator.changeResultSign();
    }
};

export { noFunction, eqFunction };

/*---END STATE FUNCTIONS---*/