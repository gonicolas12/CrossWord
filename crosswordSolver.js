function crosswordSolver(grid, wordList) {
  grid = transformToGrid(grid);

  // vérifie si un mot peut être placé dans une certaine direction
  function checkWordPlacement(word, x, y, dir) {
      if (dir === "right") {
          if (y + word.length > grid[0].length) return false;
          for (let i = 0; i < word.length; i++) {
              if (grid[x][y + i] !== "" && grid[x][y + i] !== word[i]) return false;
          }
      } else if (dir === "down") {
          if (x + word.length > grid.length) return false;
          for (let i = 0; i < word.length; i++) {
              if (grid[x + i][y] !== "" && grid[x + i][y] !== word[i]) return false;
          }
      }
      return true;
  }

  // insère un mot dans la grille
  function insertWord(word, x, y, dir) {
      if (dir === "right") {
          for (let i = 0; i < word.length; i++) {
              grid[x][y + i] = word[i];
          }
      } else if (dir === "down") {
          for (let i = 0; i < word.length; i++) {
              grid[x + i][y] = word[i];
          }
      }
  }

  // transforme la grille en une matrice de caractères
  function transformToGrid(gridString) {
      let gridLines = gridString.split("\n");
      let gridMatrix = Array.from(gridLines, (x) => x.split(""));
      for (let i = 0; i < gridMatrix.length; i++) {
          for (let j = 0; j < gridMatrix[i].length; j++) {
              if (gridMatrix[i][j] !== ".") {
                  gridMatrix[i][j] = "";
              }
          }
      }
      return gridMatrix;
  }

  // fonction récursive pour résoudre la grille
  function recursiveSolver(idx) {
      if (idx >= wordList.length) return true;
      const word = wordList[idx];
      for (let x = 0; x < grid.length; x++) {
          for (let y = 0; y < grid[0].length; y++) {
              if (checkWordPlacement(word, x, y, "right")) {
                  const tempGrid = JSON.parse(JSON.stringify(grid));
                  insertWord(word, x, y, "right");
                  if (recursiveSolver(idx + 1)) return true;
                  grid = tempGrid;
              }
              if (checkWordPlacement(word, x, y, "down")) {
                  const tempGrid = JSON.parse(JSON.stringify(grid));
                  insertWord(word, x, y, "down");
                  if (recursiveSolver(idx + 1)) return true;
                  grid = tempGrid;
              }
          }
      }
      return false;
  }
  recursiveSolver(0);
  return grid;
}

const grid = '2001\n0..0\n1000\n0..0'
const wordList = ['casa', 'alan', 'ciao', 'anta'];

let solvedGrid = crosswordSolver(grid, wordList);

solvedGrid.forEach(row => {
  console.log(JSON.stringify(row));
});