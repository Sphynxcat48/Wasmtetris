// not quite done yet
#include <iostream>
#include <vector>
#include <random>
#include <algorithm>
using namespace std;

vector<vector<int>> playfield(22, vector<int>(10, 0));
vector<string> tetrominoSequence;

int getRandomInt(int min, int max) {
  int randNum = rand()%(max-min + 1) + min;
    return randNum;
}

void generateSequence() {
    vector<char> sequence = {'I', 'J', 'L', 'O', 'S', 'T', 'Z'};

    while (!sequence.empty()) {
        int rand = getRandomInt(0, sequence.size() - 1);
        char name = sequence[rand];
        sequence.erase(sequence.begin() + rand);
        tetrominoSequence.push_back(string(1, name));
    }
}

struct Tetromino {
    string name;
    vector<vector<int>> matrix;
    int row;
    int col;
};

Tetromino getNextTetromino() {
    if (tetrominoSequence.empty()) {
        generateSequence();
    }

    string name = tetrominoSequence.back();
    tetrominoSequence.pop_back();
    vector<vector<int>> matrix = tetrominos[name];

    int col = playfield[0].size() / 2 - ceil(matrix[0].size() / 2.0);
    int row = (name == "I") ? -1 : -2;

    return {name, matrix, row, col};
}

vector<vector<int>> rotate(vector<vector<int>> matrix) {
    int N = matrix.size() - 1;
    vector<vector<int>> result(N + 1, vector<int>(N + 1, 0));

    for (int i = 0; i <= N; ++i) {
        for (int j = 0; j <= N; ++j) {
            result[i][j] = matrix[N - j][i];
        }
    }

    return result;
}

bool isValidMove(vector<vector<int>> matrix, int cellRow, int cellCol) {
    for (size_t row = 0; row < matrix.size(); ++row) {
        for (size_t col = 0; col < matrix[row].size(); ++col) {
            if (matrix[row][col] && (
                // outside the game bounds
                cellCol + col < 0 ||
                cellCol + col >= playfield[0].size() ||
                cellRow + row >= playfield.size() ||
                // collides with another piece
                playfield[cellRow + row][cellCol + col]
            )) {
                return false;
            }
        }
    }

    return true;
}

void placeTetromino(Tetromino tetromino) {
    for (size_t row = 0; row < tetromino.matrix.size(); ++row) {
        for (size_t col = 0; col < tetromino.matrix[row].size(); ++col) {
            if (tetromino.matrix[row][col]) {
                // game over if piece has any part offscreen
                if (tetromino.row + row < 0) {
                    // showGameOver();
                    return;
                }
                playfield[tetromino.row + row][tetromino.col + col] = 1;
            }
        }
    }

    // check for line clears starting from the bottom and working our way up
    for (int row = playfield.size() - 1; row >= 0; ) {
        if (all_of(playfield[row].begin(), playfield[row].end(), [](int cell) { return cell != 0; })) {
            // drop every row above this one
            for (int r = row; r >= 0; --r) {
                for (size_t c = 0; c < playfield[r].size(); ++c) {
                    playfield[r][c] = (r > 0) ? playfield[r - 1][c] : 0;
                }
            }
        }
        else {
            --row;
        }
    }
}

int main() {
    Tetromino tetromino = getNextTetromino();

    // Game Loop
    while (true) {
        // place piece if it runs into anything
        if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
            tetromino.row--;
            placeTetromino(tetromino);
        }

        if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
            tetromino.row = tetromino.row - 1;
            placeTetromino(tetromino);
            return 0;
        }

    }

    return 0;
}


