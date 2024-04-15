const canvas = document.getElementById("tetrCanvas");


// Get the WebGL rendering context
const gl = canvas.getContext("webgl");


// Check if WebGL is available on the current browser
if (!gl) {
  alert("WebGL is not supported on this browser.");
}


const rows = 20; // Number of rows in the grid
const cols = 10; // Number of columns in the grid
const cellSize = 30; // Size of each cell in pixels
let grid = initializeGrid(rows, cols); // Initialize the game grid

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}


function render() {
    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Render grid
    renderGrid(grid, cellSize);
renderFilledCell(x, y, cellSize);
    // Render Tetris pieces
    // You would need to implement logic for rendering active Tetris piece
    // and any other game elements

    requestAnimationFrame(render);
}

// Start the render loop
render();


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
               renderFilledCell(i, j, cellSize);
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

function renderFilledCell(x, y, cellSize) {
    // Calculate the coordinates of the cell in pixels
    const xPos = x * cellSize;
    const yPos = y * cellSize;

    // Define the vertices of the rectangle
    const vertices = [
        xPos, yPos,
        xPos + cellSize, yPos,
        xPos + cellSize, yPos + cellSize,
        xPos, yPos + cellSize
    ];

    // Create a buffer and bind it
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Assign the buffer to a_position attribute
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

