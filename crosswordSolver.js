function crosswordSolver(gridString, words) {
  const grid = gridString.split('\n').map(row => row.split(''));
  const height = grid.length;
  const width = grid[0].length;
  const filledGrid = grid.map(row => row.map(cell => (cell === '.' ? '.' : ' ')));
 
  function canPlace(word, row, col, horizontal) {
    if (horizontal) {
      if (col + word.length > width) return false; //vérifier si le mot dépasse la largeur de la grille
      for (let i = 0; i < word.length; i++) {
        if (filledGrid[row][col + i] !== '.' && filledGrid[row][col + i] !== ' ' && filledGrid[row][col + i] !== word[i]) return false; // vérifier les conflits
      }
    } else {
      if (row + word.length > height) return false; // vérifier si le mot dépasse la hauteur de la grille
      for (let i = 0; i < word.length; i++) {
        if (filledGrid[row + i][col] !== '.' && filledGrid[row + i][col] !== ' ' && filledGrid[row + i][col] !== word[i]) return false; // vérifier les conflits
      }
    }
    return true;
  }
 
  function placeWord(word, row, col, horizontal) {
    if (horizontal) {
      for (let i = 0; i < word.length; i++) {
        filledGrid[row][col + i] = word[i];
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        filledGrid[row + i][col] = word[i];
      }
    }
  }  
 
  function solve() {
    let wordsCopy = words.slice(); // copier le tableau de mots pour ne pas modifier l'original
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (!isNaN(grid[row][col]) && grid[row][col] !== '0') {
          let numWords = parseInt(grid[row][col]);
          while (numWords > 0 && wordsCopy.length > 0) {
            let word = wordsCopy.shift();
            if (canPlace(word, row, col, true)) {
              placeWord(word, row, col, true);
              col += word.length - 1;
              numWords--;
            } else if (canPlace(word, row, col, false)) {
              placeWord(word, row, col, false);
              row += word.length - 1;
              numWords--;
            } else {
              console.log('Erreur');
              return;
            }
          }
        }
      }
    }
  }
 
  solve();
  console.log(filledGrid.map(row => row.join('')).join('\n'));
}
 
const gridString = '2001\n0..0\n1000\n0..0';
const words = ['casa', 'alan', 'ciao', 'anta'];
crosswordSolver(gridString, words);
 