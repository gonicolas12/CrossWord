function crosswordSolver(puzzle, words) {
    let lines = puzzle.replace(/\s+/g, '').split('\n');
  
    let grid = lines.map(line => {
      let newline = [];
      for (let char of line) {
        if (!isNaN(parseInt(char))) {
          newline.push(...Array(parseInt(char)).fill('.'));
        } else {
          newline.push(char);
        }
      }
      return newline;
    });
  
    for (let word of words) {
      let placed = false;
      for (let i = 0; i < grid.length && !placed; i++) {
        for (let j = 0; j <= grid[i].length - word.length && !placed; j++) {
          if (grid[i].slice(j, j + word.length).every(c => c === '.')) {
            for (let k = 0; k < word.length; k++) {
              grid[i][j + k] = word[k];
            }
            placed = true;
          }
        }
      }
      if (!placed) {
        console.log("Error");
        return;
      }
    }
  
    if (grid.some(line => line.includes('.'))) {
      console.log("Error");
      return;
    }
  
    grid = grid.map(line => line.join(''));
    console.log(grid.join('\n'));
  }
  
  const emptyPuzzle = "2001 0..0 1000 0..0\n1000 0..0 2001 0..0";
  const words = ['casa', 'alan', 'ciao', 'anta'];
  
  crosswordSolver(emptyPuzzle, words);
