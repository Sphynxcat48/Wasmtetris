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
