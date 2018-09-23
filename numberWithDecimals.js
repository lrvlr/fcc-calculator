var numberWithDecimals = function (value, decimals, maxDecimals){
  this.value = value;
  this.decimals = decimals;
  this.max_decimals = maxDecimals;
  
  this.getValue = function(){
    return this.value;
  }
  
  this.reset = function (){
    this.value = 0;
    this.decimals = 0;  
  }
  
  this.changeSign = function(){
    this.value *= -1;
  }

  this.copyTo = function (aNumberWithDecimals){
    aNumberWithDecimals.value = this.value;
    aNumberWithDecimals.decimals = this.decimals;
  }
  
  this.adjustDecimals = function (aNumberWithDecimals){
   this.decimals = (this.decimals > aNumberWithDecimals.decimals) ? this.decimals : aNumberWithDecimals.decimals;
   this.eraseZerosAfterComma();
  }
  
  this.add = function (aNumberWithDecimals){
    this.value = parseFloat(this.value) + parseFloat(aNumberWithDecimals.value);
    this.adjustDecimals(aNumberWithDecimals);
  }
  
  this.sub = function (aNumberWithDecimals){
    this.value = parseFloat(this.value) - parseFloat(aNumberWithDecimals.value);
    this.adjustDecimals(aNumberWithDecimals);
  }
  
  this.mul = function (aNumberWithDecimals){
    this.value = parseFloat(this.value) * parseFloat(aNumberWithDecimals.value);
    this.decimals = this.max_decimals;
    this.adjustDecimals(aNumberWithDecimals);

  }
  
  this.div = function (aNumberWithDecimals){
    if (aNumberWithDecimals.value == 0) {
      throw "ZeroDiv";
    } else {
      this.value = parseFloat(this.value) / parseFloat(aNumberWithDecimals.value);
      this.decimals = this.max_decimals;
      this.adjustDecimals(aNumberWithDecimals);
    }

  }
  
  this.pct = function (aNumberWithDecimals){
    this.mul(aNumberWithDecimals);
    this.value = (parseFloat(this.value) / 100);
  }
  
  this.round = function (){
     this.value = (parseFloat(this.value)).toFixed(this.decimals);
     return this.value;
  }
  
  this.equals = function(aNumberWithDecimals){
    return ((this.round() - aNumberWithDecimals.round()) === 0 );
  }
  
  this.eraseZerosAfterComma = function (){
      var auxWithLessDecimals = new numberWithDecimals(this.value, this.decimals, this.max_decimals);
      while ((auxWithLessDecimals.decimals >= 0) & auxWithLessDecimals.equals(this) ) {
        auxWithLessDecimals.copyTo(this);
        auxWithLessDecimals.decimals--;
        if (auxWithLessDecimals.decimals < 0) break;
        this.round();
      }
  }

}

export { numberWithDecimals };
