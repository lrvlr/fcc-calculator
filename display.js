
var checkFontSize = function(length){
		var fit = document.getElementById("fit"),
			wrap = document.getElementById("wrap"),
		  	step = 4,
		  	currentSize;

	if (length > 10) {
		while (fit.offsetWidth > (wrap.offsetWidth-15)){
			currentSize = parseFloat(window.getComputedStyle(fit, null).getPropertyValue('font-size'));
		 	fit.style.fontSize = ((currentSize - step) + "px");
		}
	} else {
		fit.style.fontSize = "30px";
	}

}


var display = function(aCalculator, aValue){
  this.calculator = aCalculator;
  this.equation = "";
  this.lastPressed = new lastIsNumber(this);
  this.previewNumber = aValue;
  
  
  this.updateValue = function(){
    this.previewNumber = this.calculator.lastPreview();
  }

  this.updateNumberInEquation = function(){
    this.equation += " " + this.previewNumber;
    this.refreshEquation();
    this.lastPressed = new lastIsNumber(this);
  }
  
  this.updateSignInEquation = function(sign){
    this.lastPressed.updateSign(sign);
  }
  
  this.updateSign = function(sign){
    this.equation += " " + sign;
    this.refreshEquation();
    this.lastPressed = new lastIsSign(this);
  }
  
  this.removeLastSignFromEquation = function(){
    var lastPos = this.equation.length - 2;
    this.equation = this.equation.substring(0, lastPos);
  }
  
  this.clearEquation = function (){
    this.equation = "";
    this.refreshEquation();
  }
  
  this.refreshResult = function(){
   	var html = this.previewNumber;
    $(".bottom").html(html);
    checkFontSize(this.previewNumber.length);
  }

   this.refreshEquation = function(){
    var html = this.equation;
    $(".equation").html(html);
    
  }
  
  this.error = function(err){
    console.log(err);
    var html = err;
    $(".bottom").html(html);
    checkFontSize(err.length);
  }
}

/*----DISPLAY STATES----*/
var displayState = function(aDisplay) {
  this.display = aDisplay;
  this.updateSign = function(sign){
  }
}

var lastIsNumber = function (aDisplay){
  displayState.call(this, aDisplay);
  this.updateSign = function(sign){
    this.display.updateSign(sign);
  }
}

var lastIsSign = function (aDisplay){
  displayState.call(this, aDisplay);
  this.updateSign = function(sign){
    this.display.removeLastSignFromEquation();
    this.display.updateSign(sign);
  }
}

export { display };
