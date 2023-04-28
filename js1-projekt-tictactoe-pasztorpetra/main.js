// szükséges változók létrehozása és definiálása

let matrix = [];
let stepCount = 0;
const cols = 3;
const rows = 3;
let mark = "X";
const elements = Array.from(document.querySelectorAll(".cell"));

// initState: játéktér feltöltése üres mezőkkel

const initState = () => {
  for (let i = 0; i < rows; i += 1) {
    matrix[i] = [];
    for (let j = 0; j < cols; j += 1) {
    matrix[i][j] = null;
    }
  }
};

// changeMatrixValue: egyes cellák azonosítása

const changeMatrixValue = (element) => {
  const row = parseInt(element.dataset.row, 10);
  const cell = parseInt(element.dataset.cell, 10);
  matrix[row][cell] = element.textContent;
};

// deleteSigns: kiválasztja az összes cellát és mindegyikben elhelyez egy string-et

const deleteSigns = () => {
  elements.forEach((item) => (item.innerHTML = ""));
};

// increaseCounter: megtett lépések számát növeli eggyel

const increaseCounter = () => stepCount++;

// modifyCell: beállítja az elem tartalmának a használt jelet,
// majd kattintásra (esemény) eltávolítja a handleClick függvényt.

const modifyCell = (element) => {
  element.innerHTML = mark;
  element.removeEventListener("click", handleClick);
};

// setMark: a jelre beállítja a következő lépésnél használt jelet úgy,
// hogy ha az X-et használtuk éppen, akkor 0 és fordítva

const setMark = () => {
  if (mark === "X") {
    mark = "O";
  } else {
    mark = "X";
  }
};

// handleClick: függvények meghívása

const handleClick = (event) => {
  increaseCounter();
  modifyCell(event.target);
  setMark();
  changeMatrixValue(event.target);
  checkWinner();
};

// addClickListener: cellák kiválasztása és kattintásra handClick függvény
// hozzáadása mindegyikhez

const addClickListener = () => {
  elements.forEach((item) => item.addEventListener("click", handleClick));
};

// removeAllClickListeners: kiválasztja a cellákat,
// és kattintásra (esemény) mindegyikről eltávolítja a handleClick függvényt

const removeAllClickListeners = () => {
  elements.forEach((cell) => cell.removeEventListener("click", handleClick));
};

// checkValues: végigmegy a kapott tömb sorain,
// és a sor minden EGYES elemének értéke esetében megvizsgálja, hogy az 0 vagy X.
// Ha a sor minden egyes eleme 0 vagy X, akkor a 0 vagy az X győzött

const checkValues = (array) =>
  array
    .map((row) => {
      if (
        row.every((item) => item === "X" || row.every((item) => item === "O"))
      ) {
        return true;
      } else {
        return false;
      }
    })
    .indexOf(true) !== -1;

//Ha true-t kapunk visza adott sorra, akkor
//annak indexét vizsgálva nem kaphatunk -1-et.
//Azaz az elem benne van a tömbben.
//*/

const checkColumnValues = () =>
  checkValues(matrix.map((array, i) => array.map((item, j) => matrix[j][i])));

const checkDiagonalValues = () =>
  checkValues([
    matrix.map((array, i) => matrix[i][i]),
    matrix.map((array, i) => matrix[i][matrix[i].length - i - 1]),
  ]);

//Miután az első függvénnyel leellenőriztük a sorok tartalmát,
//a fentiekkel megvizsgáljuk az oszlopok és az átlókban lévő mezők tartalmát.
//Ez azért fontos, mert így tudhatjuk meg,
//hogy lesz-e három azonos jel egymás mellett/alatt/átlósan.

// checkWinner: kiírja a konzolra a checkColumnValues()t és a checkDiagonalValues()-t,
// majd meghívja az endGame()-et, HA a checkValues(matrix)
// vagy a checkColumnValues() vagy a checkDiagonalValues() igaz.

const checkWinner = () => {
  console.log(checkColumnValues());
  console.log(checkDiagonalValues());
  if (checkValues(matrix) || checkColumnValues() || checkDiagonalValues()) {
    endGame();
  }
};

//setMessage: kiválasztja a message osztályú elemet, és az üzenetet állítja be a div tartalmának

const setMessage = (message) => {
  document.querySelector(".message").innerHTML = message;
};

//startGame: függvényeket hív meg

const startGame = () => {
  initState();
  addClickListener();
  newGame();
};

// endGame: a setMessage nevű függvény segítségével beállítja az üzenetet,
// amelynek tartalma:'The winner is Player ' plusz: (mark === 'X' ? 'O' : 'X') + '.')
// Ez az utóbbi kódrészlet kiválasztja azt a jelet, amellyel a nyertes játszott
// (és egy pontot helyez el a mondat végén).
// Ezután a függvény meghívja a removeAllClickListeners() nevű függvényt.

const endGame = () => {
  setMessage("The winner is Player" + (mark === "X" ? "O" : "X") + ".");
  removeAllClickListeners();
};

// newGame: gomb kiválasztása és kattintásra függvények meghívása

const newGame = () => {
  document.querySelector(".reset").addEventListener("click", () => {
    initState();
    addClickListener();
    deleteSigns();
    setMessage("Playing...");
    setMark();
  });
};

startGame();
