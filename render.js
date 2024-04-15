// Get the WebGL rendering context
const canvas = document.getElementById("tetrCanvas");
const gl = canvas.getContext("webgl");

// Check if WebGL is available on the current browser
if (!gl) {
  alert("WebGL is not supported on this browser.");
}

// Define the shaders as strings
const vertexShaderSource = `
    attribute vec2 a_position;

    void main() {
        gl_Position = vec4(a_position, 0, 1);
    }
`;

const fragmentShaderSource = `
    precision mediump float;

    uniform vec4 u_color;

    void main() {
        gl_FragColor = u_color;
    }
`;

// Create the shaders
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

// Create the shader program
const program = createProgram(gl, vertexShader, fragmentShader);

// Use the shader program
gl.useProgram(program);

// Set up any attributes and uniforms required by the shaders
// For example, get attribute and uniform locations and set attribute pointers and uniform values
// Example:
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);

// Clear the canvas
gl.clear(gl.COLOR_BUFFER_BIT);

// Render grid
renderGrid(grid, cellSize);

function render() {
    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Render grid
    renderGrid(grid, cellSize);

    // Render Tetris pieces
    // renderPiece(piece, position, cellSize);

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

