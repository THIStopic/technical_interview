// Representación codificada del archivo 5x5.txt
const puzzleData = [
    { id: 1, sides: [9, 6, 5, 0] },
    { id: 2, sides: [1, 6, 10, 2] },
    { id: 3, sides: [0, 2, 3, 0] },
    { id: 4, sides: [3, 4, 9, 1] },
    { id: 5, sides: [9, 0, 4, 4] },
    { id: 6, sides: [8, 9, 2, 3] },
    { id: 7, sides: [0, 0, 7, 6] },
    { id: 8, sides: [3, 10, 6, 5] },
    { id: 9, sides: [4, 8, 4, 5] },
    { id: 10, sides: [9, 7, 0, 0] },
    { id: 11, sides: [3, 9, 1, 4] },
    { id: 12, sides: [2, 4, 0, 8] },
    { id: 13, sides: [8, 9, 0, 7] },
    { id: 14, sides: [2, 4, 5, 2] },
    { id: 15, sides: [0, 3, 10, 7] },
    { id: 16, sides: [7, 2, 10, 6] },
    { id: 17, sides: [9, 0, 4, 9] },
    { id: 18, sides: [4, 0, 3, 3] },
    { id: 19, sides: [3, 10, 8, 0] },
    { id: 20, sides: [2, 0, 7, 8] },
    { id: 21, sides: [10, 3, 0, 4] },
    { id: 22, sides: [0, 9, 1, 7] },
    { id: 23, sides: [9, 5, 9, 7] },
    { id: 24, sides: [0, 6, 3, 4] },
    { id: 25, sides: [5, 3, 0, 0] },
];

// Solutions for 5x5.txt
/* 

3 20 22 13 10
18 6 11 9 5
21 2 4 14 12
15 8 23 16 19
7 24 17 1 25

*/

const width = 5;
const height = 5;

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
