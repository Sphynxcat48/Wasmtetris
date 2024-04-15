// Define the createShader function
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

// Define the createProgram function
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

// Set up attributes and uniforms required by the shaders
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);

// Clear the canvas
gl.clear(gl.COLOR_BUFFER_BIT);

// Initialize the game grid
const rows = 20; // Number of rows in the grid
const cols = 10; // Number of columns in the grid
const cellSize = 30; // Size of each cell in pixels
let grid = initializeGrid(rows, cols); // Initialize the game grid
grid[0][0] = 1;
grid[0][1] = 1;
grid[1][0] = 1;
grid[1][1] = 1;

// Render the grid
renderGrid(grid, cellSize);

// Function to initialize the grid
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

// Function to render the grid
function renderGrid(grid, cellSize) {
    // Render each filled cell of the grid
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 1) {
               renderFilledCell(i, j, cellSize);
            }
        }
    }
}

// Function to render a filled cell
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
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
