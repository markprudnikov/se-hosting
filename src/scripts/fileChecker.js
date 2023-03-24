class DSU {
  constructor(size) {
    this.parent = new Array(size).map((_, i) => i);
    this.size = new Array(size).fill(1);
  }

  find(x) {
    if (this.parent[x] === x) {
      return x;
    }
    this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return;
    }

    if (this.size[rootX] < this.size[rootY]) {
      [rootX, rootY] = [rootY, rootX];
    }

    this.parent[rootY] = rootX;
    this.size[rootX] += this.size[rootY];
  }
}

function getCellNeighbours(row, col) {
  return [
    [row, col + 1],
    [row + 1, col + 1],
    [row + 1, col],
    [row, col - 1],
    [row - 1, col],
    [row - 1, col + 1]
  ]
}

function checkMapComponents(rows, cols, field) {
  const dsu = new DSU(rows * cols);

  const getIndex = (row, col) => row * cols + col;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = getIndex(row, col);
      const neighbors = getCellNeighbours(row, col).filter(([nRow, nCol]) => {
        return nRow >= 0 && nRow < rows && nCol >= 0 && nCol < cols;
      });

      if (field[row][col] === '+' || field[row][col] == '-') {
        for (const [nRow, nCol] of neighbors.filter(([nRow, nCol]) => field[nRow][nCol] === field[row][col])) {
          const nIndex = getIndex(nRow, nCol);
          dsu.union(index, nIndex);
        }
      }
    }
  }

  const components1 = new Set();
  const components2 = new Set();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = getIndex(row, col);
      if (field[row][col] === '+') {
        components1.add(dsu.find(index));
      }
      if(field[row][col] === '-') {
        components2.add(dsu.find(index));
      }
    }
  }
  if (components1.size === 0 || components2.size === 0) {
    return "Error: One of the bug swarms is missing.";
  }
  if (components1.size > 1 || components2.size > 1) {
    return "Error: Swarm have to be linked.";
  }
  return "";
}

function checkMapFormat(fileContent) {
  const lines = fileContent.split('\n');

  if (lines.length < 2) {
    return "Error: Incorrect file format.";
  }

  const height = parseInt(lines[0].trim(), 10);
  const width = parseInt(lines[1].trim(), 10);

  if (isNaN(height) || isNaN(width)) {
    return "Error: Incorrect file format.";
  }

  if (height <= 0 || width <= 0) {
    return "Error: Incorrect dimensions.";
  }

  let fieldLines = lines.slice(2);

  if (fieldLines.length !== height) {
    return "Error: The field does not correspond to the indicated dimensions.";
  }

  const validSymbols = /^[# +\-.0-9]+$/;

  for (const line of fieldLines) {
    if (!validSymbols.test(line)) {
      return "Error: Incorrect file format.";
    }
  }

  fieldLines = fieldLines.map(line => line.split(' '));

  for (const line of fieldLines) {
    if (line.length !== width) {
      return "Error: The field does not correspond to the indicated dimensions.";
    }
    line.forEach(element => {
      if (element.length !== 1) {
        return "Error: Incorrect file format.";
      }
    })
  }

  fieldLines = fieldLines.map(line => line.join(''));

  for (let row = 0; row < height; row++) {
    if (row === 0 || row + 1 === height) {
      for (let col = 0; col < width; col++) {
        if (fieldLines[row][col] !== '#') {
          return "Error: There\'s no outer border.";
        }
      }
    } else {
      if (fieldLines[row][0] != '#' || fieldLines[row][width - 1] != '#') {
          return "Error: There\'s no outer border.";
      }
    }
  }

  return checkMapComponents(height, width, fieldLines);
}

function checkBugFormat(fileContent) {
  const instructions = fileContent.split('\n').map(line => line.split(';')[0].trim());

  const regex = /^(sense (here|leftahead|rightahead|ahead) (friend|foe|friendwithfood|foewithfood|food|rock|marker \d|foemarker|home|foehome) (\w+|\d+) (\w+|\d+)|mark \d (\w+|\d+)|unmark \d (\w+|\d+)|pickup (\w+|\d+) (\w+|\d+)|drop (\w+|\d+)|turn (left|right)|move (\w+|\d+) (\w+|\d+)|flip \d (\w+|\d+) (\w+|\d+)|direction \d (\w+|\d+) (\w+|\d+)|(\w+|\d+):)$/;

  for (const instruction of instructions) {
    if (!regex.test(instruction)) {
      return "Error: typos/non-existent tokens.";
    }
  }

  return "";
}

function checkFileFormat(fileId, resultId, formatChecker) {
  const fileInput = document.getElementById(fileId);
  const file = fileInput.files[0];
  const result = document.getElementById(resultId);

  if (!file) {
    result.textContent = 'Please select a file.';
    result.style.color = 'red';
    return false;
  }

  let noErrors = true;
  const reader = new FileReader();

  reader.onload = function (event) {
    const fileContent = event.target.result;

    const error = formatChecker(fileContent);
    if(error !== "") {
      result.textContent = error;
      result.style.color = 'red';
      noErrors = false
    }
  };

  reader.onerror = function () {
    result.textContent = 'There was an error reading the file.';
    result.style.color = 'red';
    noErrors = false;
  };

  reader.readAsText(file);
  return noErrors;
}

function handleGameStart() {
  const noErrorsMap = checkFileFormat('worldmap', 'mapResult', checkMapFormat);
  const noErrorsBrain1 = checkFileFormat('brain1', 'brain1Result', checkBugFormat);
  const noErrorsBrain2 = checkFileFormat('brain2', 'brain2Result', checkBugFormat);
  if (noErrorsMap && noErrorsBrain1 && noErrorsBrain2) {
    location.href = 'home.html';
  }
}