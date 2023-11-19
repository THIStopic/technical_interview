// Representación codificada del archivo 5x5.txt
const puzzleData = [
    { id: 1, sides: [7, 3, 9, 2] },
    { id: 2, sides: [10, 3, 7, 3] },
    { id: 3, sides: [8, 10, 9, 10] },
    { id: 4, sides: [0, 0, 10, 3] },
    { id: 5, sides: [1, 8, 10, 4] },
    { id: 6, sides: [8, 10, 5, 6] },
    { id: 7, sides: [10, 8, 2, 0] },
    { id: 8, sides: [3, 1, 7, 1] },
    { id: 9, sides: [2, 2, 2, 0] },
    { id: 10, sides: [3, 9, 5, 7] },
    { id: 11, sides: [9, 0, 4, 3] },
    { id: 12, sides: [9, 4, 10, 0] },
    { id: 13, sides: [0, 8, 7, 9] },
    { id: 14, sides: [9, 4, 8, 4] },
    { id: 15, sides: [5, 9, 0, 3] },
    { id: 16, sides: [0, 7, 4, 10] },
    { id: 17, sides: [7, 3, 6, 0] },
    { id: 18, sides: [10, 3, 0, 5] },
    { id: 19, sides: [10, 0, 8, 8] },
    { id: 20, sides: [3, 10, 3, 4] },
    { id: 21, sides: [2, 1, 2, 3] },
    { id: 22, sides: [5, 0, 10, 7] },
    { id: 23, sides: [8, 5, 8, 8] },
    { id: 24, sides: [6, 9, 6, 1] },
    { id: 25, sides: [10, 8, 9, 1] },
    { id: 26, sides: [8, 3, 4, 8] },
    { id: 27, sides: [8, 3, 5, 3] },
    { id: 28, sides: [4, 4, 0, 10] },
    { id: 29, sides: [6, 10, 2, 4] },
    { id: 30, sides: [8, 8, 1, 2] },
    { id: 31, sides: [4, 9, 8, 6] },
    { id: 32, sides: [7, 10, 6, 7] },
    { id: 33, sides: [1, 7, 0, 9] },
    { id: 34, sides: [4, 8, 0, 9] },
    { id: 35, sides: [9, 4, 5, 2] },
    { id: 36, sides: [9, 9, 8, 1] },
    { id: 37, sides: [0, 10, 9, 2] },
    { id: 38, sides: [2, 3, 3, 4] },
    { id: 39, sides: [0, 2, 4, 4] },
    { id: 40, sides: [8, 1, 4, 6] },
    { id: 41, sides: [6, 9, 8, 0] },
    { id: 42, sides: [7, 1, 3, 4] },
    { id: 43, sides: [10, 7, 4, 10] },
    { id: 44, sides: [9, 4, 6, 10] },
    { id: 45, sides: [10, 6, 4, 3] },
    { id: 46, sides: [3, 7, 3, 10] },
    { id: 47, sides: [2, 6, 0, 8] },
    { id: 48, sides: [10, 0, 10, 10] },
    { id: 49, sides: [5, 2, 9, 9] },
    { id: 50, sides: [7, 1, 4, 10] },
    { id: 51, sides: [4, 8, 1, 4] },
    { id: 52, sides: [4, 2, 9, 0] },
    { id: 53, sides: [8, 0, 9, 1] },
    { id: 54, sides: [0, 9, 10, 0] },
    { id: 55, sides: [1, 4, 0, 3] },
    { id: 56, sides: [4, 1, 6, 5] },
    { id: 57, sides: [0, 6, 9, 0] },
    { id: 58, sides: [5, 4, 4, 3] },
    { id: 59, sides: [10, 8, 0, 8] },
    { id: 60, sides: [0, 0, 2, 10] },
    { id: 61, sides: [7, 2, 5, 8] },
    { id: 62, sides: [5, 7, 5, 4] },
    { id: 63, sides: [4, 9, 7, 0] },
    { id: 64, sides: [10, 10, 2, 2] },
];

// Solutions for 8x8.txt
/* 

4 12 52 55 18 22 48 60
15 62 35 25 43 32 64 9
33 8 40 6 5 56 49 37
17 38 26 23 30 50 44 16
41 1 2 3 29 42 24 63
59 46 10 36 31 20 45 39
47 21 61 51 14 58 27 7
57 53 13 34 19 28 11 54

4 12 52 55 18 22 48 60
15 62 35 25 43 32 64 9
33 8 40 6 5 56 49 37
17 38 26 23 30 50 44 16
41 1 46 3 29 42 24 63
59 2 10 36 31 20 45 39
47 21 61 51 14 58 27 7
57 53 13 34 19 28 11 54

*/

const width = 8;
const height = 8;

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