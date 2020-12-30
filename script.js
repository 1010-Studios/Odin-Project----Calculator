"use strict";

const printEquationScreen = document.getElementById("display__equation");
const printMainScreen = document.getElementById("display__main");
const btnNums = document.querySelectorAll(".btn__num");
const BTNExp = document.querySelectorAll(".btn__exp");
const BTNdec = document.getElementById("exp__dec");
const BTNequ = document.getElementById("exp__equ");
const BTNclr = document.getElementById("exp__clr");
const BTNneg = document.getElementById("exp__neg");

let tempNum = "";
let op1 = "";
let op2 = "";
let operator = "";
let displayEquation = ``;
let displayProduct = ``;
let disabled = true;

function _drawScreen() {
  console.log(`------DRAWSCREEN------`);
  console.log(`---OP1: ${op1} |Operator:${operator}| OP2: ${op2}---`);
  printEquationScreen.innerHTML = displayEquation;
  printMainScreen.innerHTML = displayProduct;
}

function _decideOperation() {
  if (op1 === 0 || (op2 === 0 && operator === `exp__div`)) {
    console.log(`Attempting to divide by 0`);
    displayProduct = `ERROR || Div/0!`;
  } else if (op1 >= 0 && op2 >= 0) {
    displayProduct = operate(op1, op2, operator);
  } else if (op1 >= 0 && typeof op2 !== "string") {
    console.log(`---OP1: ${op1} |Operator:${operator}| OP2: ${op2}---`);
  }

  _drawScreen();
}

function operate() {
  function _decide() {
    switch (operator) {
      case `exp__mul`:
        return op1 * op2;
      case `exp__div`:
        if (op1 === 0 || op2 === 0) {
          toggleDisabledButtons(true);
          return `!Div/0! `;
        } else return op1 / op2;
      case `exp__add`:
        return op1 + op2;
      case `exp__min`:
        return op1 - op2;
      default:
        break;
    }
  }

  //Failsafe for Equals button hit before second number input
  if (typeof op2 !== "number") {
    displayProduct = displayProduct;
  } else displayProduct = _decide();

  displayEquation = `${op1} ${displayOperator(operator)} ${op2} =`;
  op1 = parseFloat(displayProduct);
  op2 = ``;
  operator = "";
  console.log(`|----Product----|`);
  console.log(`|----${displayProduct}----|`);
  _drawScreen();
}

function displayOperator(ops) {
  console.log(ops);
  switch (ops) {
    case `exp__mul`:
      return `*`;
    case `exp__div`:
      return `/`;
    case `exp__add`:
      return `+`;
    case `exp__min`:
      return `-`;
    default:
      return "";
  }
}

function _detectInput() {
  //Number Buttons
  btnNums.forEach((i) =>
    i.addEventListener("click", function () {
      if ((op1 !== "" && operator === "") || operator === "exp__equ") {
        displayEquation = "";
        op1 = "";
      }

      if (tempNum === "" && i.id === "exp__dec") {
        tempNum = "0";
      }

      if (tempNum.length <= 9) {
        tempNum += i.value;
      }
      if (operator !== "" || operator === "exp__equ") {
        op2 = parseFloat(tempNum);
      } else {
        // op1 = displayProduct;
      }

      displayProduct = tempNum;
      _drawScreen();
    })
  );

  //Operator Buttons
  BTNExp.forEach((i) =>
    i.addEventListener("click", function () {
      //Set operator here
      if (operator !== "" && i.id !== "exp__equ") {
        operator = i.id;
      }
      if (i.id === "exp__equ") {
        operate();
      }
      if (op1 === "") {
        op1 = parseFloat(displayProduct);
        displayProduct = "";
      }
      if (typeof op1 === "number" && typeof op2 === "number") {
        operate();
      }
      if (op1 !== "" && i.id !== "exp__equ") {
        displayEquation = `${op1} ${displayOperator(i.id)}`;
        displayProduct = "";
      }
      operator = i.id;
      tempNum = "";
      _drawScreen();
    })
  );

  //clearScreen button
  BTNclr.addEventListener("click", clearScreen);

  //Negative Number Button
  BTNneg.addEventListener("click", function () {
    console.log(`Not Implemented!`);
  });

  //keyboard functionality
}

function clearScreen() {
  console.log(`Clear`);
  op1 = "";
  op2 = "";
  displayEquation = "";
  displayProduct = "";
  tempNum = "";
  operator = "";
  toggleDisabledButtons(false);
  _drawScreen();
}

function toggleDisabledButtons(dis) {
  if (!dis) {
    BTNExp.forEach((i) => (i.disabled = false));
    btnNums.forEach((i) => (i.disabled = false));
    BTNneg.disabled = false;
  } else {
    BTNExp.forEach((i) => (i.disabled = true));
    btnNums.forEach((i) => (i.disabled = true));
    BTNneg.disabled = true;
  }
}

_detectInput();
