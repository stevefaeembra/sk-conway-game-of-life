/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/app.js":
/*!***************************!*\
  !*** ./client/src/app.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let grid = new Array(1000);\nconst density = 0.3;\nlet generation = 1;\n\n// rules\nconst rules = {\n  0 : {\n    // dead cells\n    0: 0,\n    1: 0,\n    2: 0,\n    3: 1,\n    4: 0,\n    5: 0,\n    6: 0,\n    7: 0,\n    8: 0\n  },\n  1 : {\n    // live cells\n    0: 0,\n    1: 0,\n    2: 1,\n    3: 1,\n    4: 0,\n    5: 0,\n    6: 0,\n    7: 0,\n    8: 0\n  }\n};\n\nconst randomizeGrid = function() {\n  for (var row=0; row<100; row ++) {\n    for (var col=0; col<100; col++) {\n      const index = (row*100)+col;\n      if (Math.random()>1.0-density) {\n        grid[index] = 1;\n      } else {\n        grid[index] = 0;\n      }\n    }\n  }\n};\n\nconst updateGrid = function(oldGrid) {\n\n  // apply game rules. We do this into a clone of the previous state of the world\n\n  let grid = oldGrid.slice(0);\n  let newGrid = grid.slice(0); // clone\n\n  for (var row=0; row<100; row ++) {\n\n    var up = row===0? 99 : row - 1;\n    var down = row===99? 0 : row + 1;\n\n    for (var col=0; col<100; col++) {\n\n      var left = col===0? 0 : col-1;\n      var right = col===99? 0 : col+1;\n\n      const index = (row*100)+col;\n\n      const neighbours = [\n        grid[(up*100)+left],\n        grid[(up*100)+col],\n        grid[(up*100)+right],\n        grid[(row*100)+left],\n        grid[(row*100)+right],\n        grid[(down*100)+left],\n        grid[(down*100)+col],\n        grid[(down*100)+right]\n      ];\n\n      let aliveNeighbours = 0;\n      neighbours.forEach((neighbour) => aliveNeighbours += neighbour);\n\n      // use lookup table\n      newGrid[index] = rules[grid[index]][aliveNeighbours];\n\n    }\n  }\n  return newGrid;\n}\n\nconst renderGrid = function() {\n\n  // render grid, this can take about a second so do as a promise\n\n  return new Promise((resolve,reject) => {\n    for (var row=0; row<100; row ++) {\n      for (var col=0; col<100; col++) {\n        const index = (row*100)+col;\n        const div = document.querySelector(`#cell_${index+1}`);\n        if (grid[index]===0) {\n          div.className = 'dead';\n        } else {\n          div.className = 'alive';\n        };\n      };\n    };\n    return resolve(\"Done!\");\n  });\n\n}\n\nconst eachGeneration = function (grid) {\n  grid = updateGrid(grid);\n  return grid;\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log(\"DOM has loaded\");\n  randomizeGrid();\n  setInterval(function() {\n    grid = eachGeneration(grid);\n    renderGrid();\n  },50);\n});\n\n\n//# sourceURL=webpack:///./client/src/app.js?");

/***/ })

/******/ });