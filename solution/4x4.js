// Encoded representation of 4x4.txt
const puzzleData = [
    { id: 1, sides: [1, 4, 3, 5] },
    { id: 2, sides: [0, 5, 3, 5] },
    { id: 3, sides: [1, 5, 3, 0] },
    { id: 4, sides: [5, 4, 5, 2] },
    { id: 5, sides: [1, 5, 0, 0] },
    { id: 6, sides: [0, 5, 2, 1] },
    { id: 7, sides: [1, 0, 4, 4] },
    { id: 8, sides: [2, 4, 4, 2] },
    { id: 9, sides: [4, 5, 0, 5] },
    { id: 10, sides: [3, 2, 1, 0] },
    { id: 11, sides: [4, 0, 0, 3] },
    { id: 12, sides: [3, 0, 0, 1] },
    { id: 13, sides: [5, 5, 1, 0] },
    { id: 14, sides: [5, 0, 0, 1] },
    { id: 15, sides: [0, 4, 2, 4] },
    { id: 16, sides: [4, 5, 1, 4] },
];

// Solutions for 4x4.txt
/* 

5 7 15 11
9 16 4 3
13 1 8 10
14 2 6 12

5 13 9 14
2 1 16 7
6 8 4 15
12 10 3 11

*/

// Dimensions of the puzzle
const width = 4;
const height = 4;

// Array to store unique solutions
let uniqueSolutions = [];

// Function to rotate a matrix 90 degrees
function rotate90(matrix) {
    const N = matrix.length - 1;
    let result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
    return result;
}

// unciton to generate all rotations of a matrix
function generateRotations(matrix) {
    let rotations = [matrix];
    let lastMatrix = matrix;
    for (let i = 1; i < 4; i++) {
        let rotated = rotate90(lastMatrix);
        rotations.push(rotated);
        lastMatrix = rotated;
    }
    return rotations;
}

// Function to check if a matrix is a rotation of any existing matrix
function isRotationOfAny(existingMatrices, newMatrix) {
    const matrixStr = JSON.stringify(newMatrix);

    for (let existing of existingMatrices) {
        for (let rotated of generateRotations(existing)) {
            if (JSON.stringify(rotated) === matrixStr) {
                return true;
            }
        }
    }
    return false;
}

// Function to convert a solution array to a matrix
function convertToMatrix(solution, width) {
    let matrix = [];
    for (let i = 0; i < solution.length; i += width) {
        matrix.push(solution.slice(i, i + width).map((piece) => piece.id));
    }
    return matrix;
}

// Function to rotate a piece
function rotatePiece(piece, rotation) {
    let rotatedSides = piece.sides.slice(rotation).concat(piece.sides.slice(0, rotation));
    return { id: piece.id, sides: rotatedSides };
}

// Function to check if a piece can be placed in a specific position
function isValidPlacement(solution, piece, width, height) {
    let position = solution.length;
    let row = Math.floor(position / width);
    let col = position % width;

    if (row > 0 && piece.sides[0] !== solution[position - width].sides[2]) return false;
    if (col > 0 && piece.sides[3] !== solution[position - 1].sides[1]) return false;
    if (row === 0 && piece.sides[0] !== 0) return false;
    if (row === height - 1 && piece.sides[2] !== 0) return false;
    if (col === 0 && piece.sides[3] !== 0) return false;
    if (col === width - 1 && piece.sides[1] !== 0) return false;

    return true;
}

// Recursive function to solve the puzzle
function solvePuzzle(pieces, width, height, solution = [], usedPieces = new Set()) {
    if (solution.length === pieces.length) {
        let matrix = convertToMatrix([...solution], width);

        if (!isRotationOfAny(uniqueSolutions, matrix)) {
            uniqueSolutions.push(matrix);
            console.log('Unique Solution:', matrix);
        }
        return;
    }

    for (let i = 0; i < pieces.length; i++) {
        if (usedPieces.has(pieces[i].id)) continue;

        for (let rotation = 0; rotation < 4; rotation++) {
            let rotatedPiece = rotatePiece(pieces[i], rotation);
            if (isValidPlacement(solution, rotatedPiece, width, height)) {
                solution.push(rotatedPiece);
                usedPieces.add(rotatedPiece.id);

                solvePuzzle(pieces, width, height, solution, usedPieces);

                solution.pop();
                usedPieces.delete(rotatedPiece.id);
            }
        }
    }
}

solvePuzzle(puzzleData, width, height);
