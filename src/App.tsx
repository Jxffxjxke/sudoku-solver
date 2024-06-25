import "../styling/App.css";
import SudokuBoard from "../components/Sudoku-Board.tsx";
import { useState, useEffect } from "react";

function App() {
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(""))
  );

  useEffect(() => {

    board.flat().forEach((item, index) => {
      if (!item.length) {
        const gridItem = document.querySelector(`.grid-item-${index}`);
        if (gridItem) {
          gridItem.style.backgroundColor = "green";
        }
      }
    });
  }, [board]);

  const clearBoard = () => {
    setBoard(Array.from({ length: 9 }, () => Array(9).fill("")));
  };

  const solveSudoku = (board: string[][]) => {
    if (!board || board.length !== 9 || board[0].length !== 9) {
      return;
    }

    function backtrack(): boolean {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === "") {
            for (let num = 1; num <= 9; num++) {
              if (notFilled(board, row, col, num.toString())) {
                board[row][col] = num.toString();

                if (backtrack()) {
                  return true;
                }

                board[row][col] = "";
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    function notFilled(
      board: string[][],
      row: number,
      col: number,
      num: string
    ): boolean {
      for (let i = 0; i < 9; i++) {
        if (
          board[row][i] === num ||
          board[i][col] === num ||
          board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
            3 * Math.floor(col / 3) + (i % 3)
          ] === num
        ) {
          return false;
        }
      }
      return true;
    }

    backtrack();
  };

  const solve = () => {
    const newBoard = board.map((row) => [...row]);
    solveSudoku(newBoard);
    setBoard(newBoard);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku Solver</h1>
      </header>
      <div className="grid-wrap">
        <SudokuBoard board={board} setBoard={setBoard} />
        <button className="grid-button" onClick={solve}>
          Solve
        </button>
        <button className="grid-button" onClick={clearBoard}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
