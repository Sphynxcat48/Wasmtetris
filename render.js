const canvas = document.getElementById("webglCanvas");


// Get the WebGL rendering context
const gl = canvas.getContext("webgl");


// Check if WebGL is available on the current browser
if (!gl) {
  alert("WebGL is not supported on this browser.");
}


// Set clear color to black, and clear the canvas
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

function initializeGrid(rows, cols) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0; // 0 represents empty cell
        }
    }
    return grid;
}

function renderGrid(grid, cellSize) {
    // Render each cell of the grid
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 1) {
                // Render filled cell
                // Use WebGL to draw a square at position (i * cellSize, j * cellSize) with dimensions cellSize x cellSize
            } else {
                // Render empty cell
                // Use WebGL to draw an empty square or simply leave it blank
            }
        }
    }
}


function renderPiece(piece, position, cellSize) {
    // Render each block of the piece
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
            if (piece[i][j] === 1) {
                // Render filled block
                // Use WebGL to draw a square at position ((i + position.x) * cellSize, (j + position.y) * cellSize) with dimensions cellSize x cellSize
            }
        }
    }
}


