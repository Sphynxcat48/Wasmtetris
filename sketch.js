let buttons = [];
let dVal, op;
let left;
let r, l, result;

function setup() {
  createCanvas(380, 340);
  dVal = "";
  op = "";
  left = true;
  l = 0.0;
  r = 0.0;
  result = 0.0;
  buttons.push(new Button(40, 300, 40, 40, "0", true));
  buttons.push(new Button(100, 300, 40, 40, ".", true));
  buttons.push(new Button(160, 300, 40, 40, "+/-", false));
  buttons.push(new Button(220, 270, 40, 100, "+", false));
  buttons.push(new Button(40, 240, 40, 40, "1", true));
  buttons.push(new Button(100, 240, 40, 40, "2", true));
  buttons.push(new Button(160, 240, 40, 40, "3", true));
  buttons.push(new Button(40, 180, 40, 40, "4", true));
  buttons.push(new Button(100, 180, 40, 40, "5", true));
  buttons.push(new Button(160, 180, 40, 40, "6", true));
  buttons.push(new Button(40, 120, 40, 40, "7", true));
  buttons.push(new Button(100, 120, 40, 40, "8", true));
  buttons.push(new Button(160, 120, 40, 40, "9", true));
  buttons.push(new Button(220, 180, 40, 40, "×", false));
  buttons.push(new Button(220, 120, 40, 40, "e", false));
  buttons.push(new Button(280, 120, 40, 40, "AC", false));
  buttons.push(new Button(280, 180, 40, 40, "÷", false));
  buttons.push(new Button(280, 240, 40, 40, "-", false));
  buttons.push(new Button(280, 300, 40, 40, "=", false));
  buttons.push(new Button(340, 120, 40, 40, "π", false));
  buttons.push(new Button(340, 180, 40, 40, "x²", false));
  buttons.push(new Button(340, 240, 40, 40, "√", false));
  buttons.push(new Button(340, 300, 40, 40, "R", false));
}

function draw() {
  background("#566F7C");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].display();
    buttons[i].hover();
  }
  updateDisplay();
}

function keyPressed() {
  console.log("key:" + key);
  console.log("keyCode:" + keyCode);
  if (key == 0 || keyCode == 96 || keyCode == 48) {
    handleEvent("0", true);
  } else if (key == 1 || keyCode == 97 || keyCode == 49) {
    handleEvent("1", true);
  } else if (key == 2 || keyCode == 98 || keyCode == 50) {
    handleEvent("2", true);
  } else if (key == 3 || keyCode == 99 || keyCode == 51) {
    handleEvent("3", true);
  } else if (key == 4 || keyCode == 100 || keyCode == 52) {
    handleEvent("4", true);
  } else if (key == 5 || keyCode == 101 || keyCode == 53) {
    handleEvent("5", true);
  } else if (key == 6 || keyCode == 102 || keyCode == 54) {
    handleEvent("6", true);
  } else if (key == 7 || keyCode == 103 || keyCode == 55) {
    handleEvent("7", true);
  } else if (key == 8 || keyCode == 104 || keyCode == 56) {
    handleEvent("8", true);
  } else if (key == 9 || keyCode == 105 || keyCode == 57) {
    handleEvent("9", true);
  } else if (key == '+' || keyCode == 107) {
    handleEvent("+", false);
  } else if (key == '-' || keyCode == 109) {
    handleEvent("-", false);
  } else if (key == '*' || keyCode == 106) {
    handleEvent("×", false);
  } else if (key == '/' || keyCode == 111) {
    handleEvent("÷", false);
  } else if (key == '-' || keyCode == 45) {
    handleEvent("+/-", false);
  } else if (key == 's' || keyCode == 83) {
    handleEvent("√", false);
  } else if (key == 't' || keyCode == 84) {
    handleEvent("x²", false);
  } else if (key == 'c' || keyCode == 67) {
    handleEvent("AC", false);
  } else if (key == 'p' || keyCode == 80) {
    handleEvent("π", false);
  } else if (key == 'r' || keyCode == 82) {
    handleEvent("R", false);
  } else if (key == 'e' || keyCode == 69) {
    handleEvent("e", false);
  } else if (key == '=' || keyCode == 61 || keyCode == 10) {
    handleEvent("=", false);
  }
}

function handleEvent(keyVal, isNum) {
  if (left && dVal.length < 22 && isNum) {
    if (dVal === "0") {
      dVal = keyVal;
    } else {
      dVal += keyVal;
    }
    l = parseFloat(dVal);
  } else if (!left && dVal.length < 22 && isNum) {
    if (dVal === "0") {
      dVal = keyVal;
    } else {
      dVal += keyVal;
    }
    r = parseFloat(dVal);
  } else if (keyVal === "+" && !isNum) {
    dVal = "0";
    op = "+";
    left = false;
  } else if (keyVal === "-" && !isNum) {
    dVal = "0";
    op = "-";
    left = false;
  } else if (keyVal === "×" && !isNum) {
    dVal = "0";
    op = "×";
    left = false;
  } else if (keyVal === "÷" && !isNum) {
    dVal = "0";
    op = "÷";
    left = false;
  } else if (keyVal === "AC" && !isNum) {
    dVal = "";
    op = "";
    left = true;
    l = 0.0;
    r = 0.0;
    result = 0.0;
  } else if (keyVal === "√" && !isNum) {
    if (left) {
      l = sqrt(l);
      dVal = l.toString();
    } else {
      r = sqrt(r);
      dVal = r.toString();
    }
  } else if (keyVal === "π" && !isNum) {
    if (left) {
      l = PI;
      dVal = l.toString();
    } else {
      r = PI;
      dVal = r.toString();
    }
  } else if (keyVal === "x²" && !isNum) {
    if (left) {
      l = sq(l);
      dVal = l.toString();
    } else {
      r = sq(r);
      dVal = r.toString();
    }
  } else if (keyVal === "R" && !isNum) {
    if (left) {
      l = round(l);
      dVal = l.toString();
    } else {
      r = round(r);
      dVal = r.toString();
    }
  } else if (keyVal === "e" && !isNum) {
    if (left) {
      l = exp(l);
      dVal = l.toString();
    } else {
      r = exp(r);
      dVal = r.toString();
    }
  } else if (keyVal === "+/-" && !isNum) {
    if (left) {
      l *= -1;
      dVal = l.toString();
    } else {
      r *= -1;
      dVal = r.toString();
    }
  } else if (keyVal === "=" && !isNum) {
    performCalculation();
  }
}

function mouseReleased() {
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].on && buttons[i].isNum) {
      handleEvent(buttons[i].val, true);
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "AC") {
      handleEvent("AC", false);
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "+") {
      handleEvent("+", false);
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "-") {
      handleEvent("-", false);
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "×") {
      handleEvent("×", false);
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "÷") {
      handleEvent("÷", false);
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "=") {
      performCalculation();
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "+/-") {
      handleEvent("+/-", false);
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "√") {
      handleEvent("√", false);
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "x²") {
      handleEvent("x²", false);
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "π") {
      handleEvent("π", false);
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "R") {
      handleEvent("R", false);
    } else if (buttons[i].on && !buttons[i].isNum && buttons[i].val === "e") {
      handleEvent("e", false);
    }
  }
  console.log("l:" + l);
  console.log("r:" + r);
  console.log("op:" + op);
  console.log("result:" + result);
  console.log("left:" + left);
}

function updateDisplay() {
  fill("#7396A7");
  rectMode(CENTER);
  rect(width / 2, 50, 340, 60, 5);
  fill(0);
  textSize(28);
  textAlign(RIGHT);
  text(dVal, 330, 60);
}

function performCalculation() {
  if (op === "+") {
    result = l + r;
  } else if (op === "-") {
    result = l - r;
  } else if (op === "×") {
    result = l * r;
  } else if (op === "÷") {
    result = l / r;
  }
  dVal = result.toString();
  l = result;
}

class Button {
  constructor(x, y, w, h, val, isNum) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.val = val;
    this.isNum = isNum;
    this.on = false;
  }

  display() {
    stroke(255);
    if (this.on) {
      fill(255, 150, 0);
    } else {
      fill(255);
    }
    rect(this.x, this.y, this.w, this.h, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.val, this.x + this.w / 2, this.y + this.h / 2);
  }

  hover() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      this.on = true;
    } else {
      this.on = false;
    }
  }
}
