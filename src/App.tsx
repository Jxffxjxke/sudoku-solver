import "../styling/App.css";
import SudokuBoard from "../components/Sudoku-Board.tsx";
import { useState } from "react";

function App() {
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(""))
  );

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
        <text>Sudoku Solver</text>
      </header>
      <div className="grid-wrap">
        <SudokuBoard board={board} setBoard={setBoard} />
        <div id="btn-wrapper">
          <button className="btn" onClick={solve}>
            Solve
          </button>
          <button className="btn" onClick={clearBoard}>
            Clear
          </button>
        </div>
      </div>
      <footer className="App-footer">
        <button
          className="btn github"
          onClick={() => {
            window.open("https://github.com/jxffxjxke");
          }}
        >
          <svg
            width="40"
            height="40"
            fill="#0092E4"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            id="github"
          >
            <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path>
          </svg>
        </button>
      </footer>
    </div>
  );
}

export default App;
