import React from "react";
import "../styling/App.css";

type Cell = string;
type ColIndex = number;

interface SudokuBoardProps {
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({ board, setBoard }) => {
  const handleChange = (row: number, col: number, value: string) => {
    if (/^[1-9]?$/.test(value)) {
      const newBoard = board.map((rowArr, rowIndex) =>
        rowIndex === row
          ? rowArr.map((cell: Cell, colIndex: ColIndex) =>
              colIndex === col ? value : cell
            )
          : rowArr
      );
      setBoard(newBoard);
    }
  };

  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell: Cell, colIndex: ColIndex) => (
            <input
              key={colIndex}
              type="text"
              value={cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              maxLength={1}
              className="sudoku-cell"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
