/*----NUMBER STATE ------*/
  var genericNumberState = function(aCalculator){
    this.calculator = aCalculator;
    this.numberCompleted = function(){
      this.calculator.addNumberToEquation();
    }
    this.solve = function(){
      this.calculator.solve();
    }
    this.addDecimal = function(){
    }
    this.clearAll = function() {
        this.calculator.clearAll();
    } 
    this.addNumber = function(number){
    }
  }

  var notWritting = function (aCalculator) {
    genericNumberState.call(this, aCalculator);
    this.numberCompleted = function(){
      this.calculator.erasePreviousFunction();
    }
    this.solve = function(){
    }
    this.addDecimal = function(){
      this.calculator.resetPreviousIfNeeded();
      this.calculator.decimalStart();
    }
    this.addNumber = function(number){
      this.calculator.newNumber(number);
    }
  }

  var numberWritten = function (aCalculator) {
    genericNumberState.call(this, aCalculator);
    this.addDecimal = function(){
        this.calculator.resetPreviousIfNeeded();
        this.calculator.decimalStart();
    }
    this.addNumber = function(number){
      this.calculator.newNumber(number);
    }
  }

  var decimalWritting = function (aCalculator) {
    genericNumberState.call(this, aCalculator);
    this.clearAll = function(){
        this.calculator.clearAll();
        this.calculator.decimalStart();
    }
    this.addNumber = function(number){
      this.calculator.addDecimal(number);
    }
  }

  var integerWritting = function (aCalculator) {
    genericNumberState.call(this, aCalculator);
    this.addDecimal = function(){
      this.calculator.decimalStart();
    }
    this.addNumber = function(number){
        this.calculator.addOnes(number);
    }
  }

export { notWritting, numberWritten, decimalWritting, integerWritting };