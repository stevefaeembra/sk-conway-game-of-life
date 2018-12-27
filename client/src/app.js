let grid = new Array(1000);

const randomizeGrid = function() {
  for (var row=0; row<100; row ++) {
    for (var col=0; col<100; col++) {
      const index = (row*100)+col;
      if (Math.random()>.95) {
        grid[index] = 1;
      } else {
        grid[index] = 0;
      }
    }
  }
}

const renderGrid = function() {
  for (var row=0; row<100; row ++) {
    for (var col=0; col<100; col++) {
      const index = (row*100)+col;
      const div = document.querySelector(`.cell_${index+1}`);
      if (grid[index]===0) {
        div.className = 'dead';
      } else {
        div.className = 'alive';
      };
    };
  };
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM has loaded");
  randomizeGrid();
  renderGrid();
});
