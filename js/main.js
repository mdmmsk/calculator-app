const btns = document.querySelectorAll(".btn");
const display = document.querySelector(".calculator__number");

let data = {
	variableA: null,
	variableB: null,
	operator: null,
	previousOperator: null,

	handleEvent(event){
		let elem = event.currentTarget;
		if(isFinite(elem.id)){
			this.clickNumberBtn(elem)
		}else if(elem.id === "="){
			this.clickEqualBtn(elem)
		}else if(elem.id === "clear"){
			this.clickClearBtn(elem)
		}else if(elem.id === "back"){
			this.clickBackBtn(elem)
		}else{
			this.clickOperatorBtn(elem)
		}
	},

	clickNumberBtn(elem){
		if(display.innerHTML === "0" || isNaN(display.innerHTML)){
			display.innerHTML = elem.id;
		}else if(symbolSize()){
			display.innerHTML += elem.id;
		}
	},

	clickOperatorBtn(elem){
		let veriable = +display.innerHTML;
		this.operator = elem.id;
		display.innerHTML = elem.id;
		symbolSize();
		if(isFinite(veriable)){
			switch(null){
				case this.variableA:
					data.variableA = veriable;
					break;
				case this.variableB:
					data.variableB = veriable;
				default:
					data.variableA = calculation(this.variableA, this.variableB, this.previousOperator);
					data.variableB = null;
			}
			this.previousOperator = data.operator;
		}
	},

	clickEqualBtn(){
		this.variableB = +display.innerHTML;
		let equal = calculation(this.variableA, this.variableB, this.operator);
		if(equal.toString().length > 7){
			equal = equal.toFixed(3);
		}
		if(isFinite(equal)){
			display.innerHTML = equal;
			colorNumber();
			symbolSize();
			this.variableA = null;
			this.variableB = null;
		}else{
			this.operator = display.innerHTML;
		}
	},

	clickClearBtn(){
		this.variableA = null,
		this.variableB = null,
		this.operator = null,
		this.previousOperator = null,
		display.innerHTML = 0;
		display.style.fontSize = "";
	},

	clickBackBtn(){
		display.innerHTML = (display.innerHTML.length > 1) ? display.innerHTML.slice(0, length - 1) : 0;
		symbolSize();
	}
}

for(let key of btns){
	key.addEventListener("mousedown", data)
}

function symbolSize(){
	if(display.clientWidth >= 280 && display.style.fontSize == ""){
		display.style.fontSize = "50px";
		return true
	}else if(display.clientWidth < 170 && display.style.fontSize == "50px"){
		display.style.fontSize = "";
	}else{
		return symbolLimit()
	}
}

function symbolLimit(){
	if(display.clientWidth >= 280){
		return false;
	}else{
		return true;
	}
}

function calculation(a, b, operator){
	switch (operator){
		case "+":
			return a + b;
		case "-":
			return a - b;
		case "/":
			return a / b;
		case "*":
			return a * b;
	}
}

function colorNumber(){
	display.style.color = "rgb(255, 185, 73)";
	setTimeout( () => display.style.color = "", 100);
}