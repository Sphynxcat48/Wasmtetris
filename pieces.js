// Define the Tetris piece classes
class TetrisPiece {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
        this.rotationIndex = 0;
    }

    rotateClockwise() {
        this.rotationIndex = (this.rotationIndex + 1) % 4;
    }

    rotateCounterClockwise() {
        this.rotationIndex = (this.rotationIndex - 1 + 4) % 4;
    }

    getCurrentShape() {
        return this.shape[this.rotationIndex];
    }
}

// Define the Tetris piece subclasses
class LPiece extends TetrisPiece {
    constructor() {
        const shape = [
            [[1, 0],
             [1, 0],
             [1, 1]],
            [[1, 1, 1],
             [1, 0, 0]],
            [[1, 1],
             [0, 1],
             [0, 1]],
            [[0, 0, 1],
             [1, 1, 1]]
        ];
        const color = [1, 0.647, 0, 1]; // orange
        super(shape, color);
    }
}

class SPiece extends TetrisPiece {
    constructor() {
        const shape = [
            [[0, 1, 1],
             [1, 1, 0]],
            [[1, 0],
             [1, 1],
             [0, 1]]
        ];
        const color = [0, 1, 0, 1]; // green
        super(shape, color);
    }
}

class ZPiece extends TetrisPiece {
    constructor() {
        const shape = [
            [[1, 1, 0],
             [0, 1, 1]],
            [[0, 1],
             [1, 1],
             [1, 0]]
        ];
        const color = [1, 0, 0, 1]; // red
        super(shape, color);
    }
}

class TPiece extends TetrisPiece {
    constructor() {
        const shape = [
            [[0, 1, 0],
             [1, 1, 1]],
            [[1, 0],
             [1, 1],
             [1, 0]],
            [[1, 1, 1],
             [0, 1, 0]],
            [[0, 1],
             [1, 1],
             [0, 1]]
        ];
        const color = [0.541, 0.169, 0.886, 1]; // purple
        super(shape, color);
    }
}

class IPiece extends TetrisPiece {
    constructor() {
        const shape = [
            [[1],
             [1],
             [1],
             [1]],
            [[1, 1, 1, 1]]
        ];
        const color = [0, 1, 1, 1]; // cyan
        super(shape, color);
    }
}

class OPiece extends TetrisPiece {
    constructor() {
        const shape = [
            [[1, 1],
             [1, 1]]
        ];
        const color = [1, 1, 0, 1]; // yellow
        super(shape, color);
    }
}

class JPiece extends TetrisPiece {
    constructor() {
        const shape = [
            [[0, 1],
             [0, 1],
             [1, 1]],
            [[1, 0, 0],
             [1, 1, 1]],
            [[1, 1],
             [1, 0],
             [1, 0]],
            [[1, 1, 1],
             [0, 0, 1]]
        ];
        const color = [0, 0, 1, 1]; // blue
        super(shape, color);
    }
}
