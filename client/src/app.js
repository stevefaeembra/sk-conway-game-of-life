let grid = new Array(1000);
const density = 0.3;


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
}

const renderGrid = function() {

  // render grid, this can take about a second so do as a promise

  return new Promise((resolve,reject) => {
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
    return resolve("Done!");
  });

}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM has loaded");
  randomizeGrid();
  renderGrid().then((done) => {
    console.log("Grid refreshed!");
  });
});
