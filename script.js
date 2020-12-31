"use strict";

const printEquationScreen = document.getElementById("display__equation");
const printMainScreen = document.getElementById("display__main");
const btnNums = document.querySelectorAll(".btn__num");
const BTNExp = document.querySelectorAll(".btn__exp");
const BTNdec = document.getElementById("exp__dec");
const BTNequ = document.getElementById("exp__equ");
const BTNclr = document.getElementById("exp__clr");
const BTNneg = document.getElementById("exp__neg");

// BTNneg.disabled = true; //temporary disabling of +/- button

let tempNum = "";
let op1 = "";
let op2 = "";
let operator = "";
let displayEquation = ``;
let displayProduct = ``;
let disabled = true;

function _drawScreen() {
  console.log(`------DRAWSCREEN------`);
  console.log(`---OP1: ${op1} | ${operator} | OP2: ${op2}---`);
  console.log(`---TEMPNUM: ${tempNum}---`);
  console.log(`Display: ${displayProduct}`);
  printEquationScreen.innerHTML = displayEquation;
  printMainScreen.innerHTML = displayProduct;
}

function _operate(x1, x2, op) {
  function _operator() {
    if (typeof x1 === "number" && typeof x2 === "number") {
      switch (op) {
        case `*`:
          return x1 * x2;
        case `/`:
          if (x1 === 0 || x2 === 0) {
            toggleDisabledButtons(true);
            return `!Div/0! `;
          } else return x1 / x2;
        case `+`:
          return x1 + x2;
        case `-`:
          return x1 - x2;
        case `Enter`:
          return x1;
        default:
          break;
      }
    } else {
      console.log(`Yo`);
      return tempNum;
    }
  }
  displayEquation = `${op1} ${operator} ${op2}`;
  displayProduct = _operator();
  op1 = "";
  op2 = "";
  tempNum = "";
  operator = "";
  console.log(`operate`);
}

function inputNumbers(e) {
  if (op1 === "") displayEquation = ``;
  if (e === ".") {
    BTNdec.disabled = true;
  }

  if (e === "neg") {
    if (tempNum.includes(`-`)) {
      tempNum = tempNum.replace(`-`, ``);
      e = "";
    } else {
      tempNum = `-` + tempNum;
      e = "";
    }
  }

  if (tempNum.length <= 9) tempNum += e;
  if (op1 !== "") op2 = parseFloat(tempNum);

  displayProduct = tempNum;
  _drawScreen();
}

function inputOperator(e) {
  if (BTNdec.disabled === true) BTNdec.disabled = false;
  if (e === "Enter") {
    _operate(op1, op2, operator);
  } else {
    if (typeof op1 === "number" && typeof op2 === "number")
      _operate(op1, op2, operator);

    operator = e;

    if (op1 === "" && operator !== "") {
      op1 = parseFloat(displayProduct);
    }

    displayEquation = `${op1} ${operator} ${op2}`;
    displayProduct = "";
    tempNum = "";
    console.log(`Inputop`);
  }

  _drawScreen();
}

function _detectInput() {
  //Number Buttons
  btnNums.forEach((i) =>
    i.addEventListener("click", function () {
      inputNumbers(i.value);
    })
  );

  //Operator Buttons
  BTNExp.forEach((i) =>
    i.addEventListener("click", function () {
      inputOperator(i.value);
    })
  );

  //clearScreen button
  BTNclr.addEventListener("click", clearScreen);

  //Negative Number Button
  BTNneg.addEventListener("click", function () {
    inputNumbers(`neg`);
  });

  //keyboard functionality
  document.addEventListener(`keydown`, function (e) {
    if (
      e.key === "0" ||
      e.key === "1" ||
      e.key === "2" ||
      e.key === "3" ||
      e.key === "4" ||
      e.key === "5" ||
      e.key === "6" ||
      e.key === "7" ||
      e.key === "8" ||
      e.key === "9" ||
      e.key === "."
    ) {
      inputNumbers(e.key);
    }
    if (
      e.key === "+" ||
      e.key === "-" ||
      e.key === "*" ||
      e.key === "/" ||
      e.key === "Enter"
    ) {
      console.log(e.key);
      inputOperator(e.key);
    }
  });
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
    // BTNneg.disabled = false;
  } else {
    BTNExp.forEach((i) => (i.disabled = true));
    btnNums.forEach((i) => (i.disabled = true));
    BTNneg.disabled = true;
  }
}

_detectInput();
