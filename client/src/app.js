let grid = new Array(1000);
const density = 0.3;
const rules = {
  0 : {
    0: 0,
    1: 0,
    2: 0,
    3: 1,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  },
  1 : {
    0: 0,
    1: 0,
    2: 1,
    3: 1,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  }
};

const randomizeGrid = function() {
  for (var row=0; row<100; row ++) {
    for (var col=0; col<100; col++) {
      const index = (row*100)+col;
      if (Math.random()>1.0-density) {
        grid[index] = 1;
      } else {
        grid[index] = 0;
      }
    }
  }
};

const updateGrid = function(oldGrid) {

  // apply game rules. We do this into a clone of the previous state of the world

  let grid = oldGrid.slice(0);
  let newGrid = grid.slice(0); // clone

  for (var row=0; row<100; row ++) {

    var up = row===0? 99 : row - 1;
    var down = row===99? 0 : row + 1;

    for (var col=0; col<100; col++) {

      var left = col===0? 0 : col-1;
      var right = col===99? 0 : col+1;

      const index = (row*100)+col;

      const neighbours = [
        grid[(up*100)+left],
        grid[(up*100)+col],
        grid[(up*100)+right],
        grid[(row*100)+left],
        grid[(row*100)+right],
        grid[(down*100)+left],
        grid[(down*100)+col],
        grid[(down*100)+right]
      ];

      let aliveNeighbours = 0;
      neighbours.forEach((neighbour) => aliveNeighbours += neighbour);

      // use lookup table
      newGrid[index] = rules[grid[index]][aliveNeighbours];

    }
  }
  return newGrid;
}

const renderGrid = function() {

  // render grid, this can take about a second so do as a promise

  return new Promise((resolve,reject) => {
    for (var row=0; row<100; row ++) {
      for (var col=0; col<100; col++) {
        const index = (row*100)+col;
        const div = document.querySelector(`#cell_${index+1}`);
        if (grid[index]===0) {
          div.className = 'dead';
        } else {
          div.className = 'alive';
        };
      };
    };
    return resolve("Done!");
  });

}

const eachGeneration = function (grid) {
  console.log("In eachGeneration()");
  grid = updateGrid(grid);
  return grid;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM has loaded");
  randomizeGrid();
  setInterval(function() {
    console.log("New generarion");
    grid = eachGeneration(grid);
    renderGrid();
  },2000);
});
