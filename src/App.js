import React, { useState } from "react";
import Board from "./components/Board";
import History from "./History";
import './components/root.scss';
import { calculateWinner } from "./Winner";

const App = () => {
  const [history, sethistory] = useState([
    {board: Array(9).fill(null), isXnext: true}
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const winner = calculateWinner(current.board);

  const message = winner 
  ? `Winner is ${winner}` 
  : `Next Player is ${current.isXnext ? 'X' : '0'}`;

  const handleSquare = (position) => {
    if (current.board[position] || winner) {
      return;
    }
    sethistory((prev) => {

      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXnext ? 'X' : '0';
        }
        return square;
      });

      return prev.concat({board: newBoard, isXnext: !last.isXnext});
    });

    setCurrentMove( prev =>  prev+1);
  };

const moveTo = (move) => {
  setCurrentMove(move);
}
  return (
    <>
      <h1>Tic Tac Toe Game</h1>
      <h2>{message}</h2>
      <Board board={current.board} handleSquare={handleSquare} />
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </>
  )
};

export default App;
