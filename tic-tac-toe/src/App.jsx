import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board({ setGameMode, gameMode, playerChoice, setPlayerChoice }) {
  const [xIsNext, setXIsNext] = useState(true);
  const [PlayerIsNext, setPlayerIsNext] = useState(playerChoice === "X" ? true : false);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function computerChoice(choice) {
    const availableSquares = squares
      .map((square, i) => (square === null ? i : null))
      .filter(i => i !== null);
      const index = availableSquares[Math.floor(Math.random() * availableSquares.length)];
      setSquares(prevSquares => {
        const nextSquares = [...prevSquares];
        nextSquares[index] = choice;
        return nextSquares;
      });
  }
  if(!PlayerIsNext && gameMode == "player-vs-computer"){
    computerChoice(playerChoice !== "X" ? "X" : "O");
    setPlayerIsNext(true);
  }
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (gameMode === "player-vs-player") {
      nextSquares[i] = xIsNext ? "X" : "O";
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    }

    if (gameMode === "player-vs-computer") {
      if (PlayerIsNext) {
        nextSquares[i] = playerChoice;
        setSquares(nextSquares);
        setTimeout(() => {
          if (!calculateWinner(nextSquares)) {
            computerChoice(playerChoice !== "X" ? "X" : "O");
          }
        }, 500);
      }
    }
  }

  const winner = calculateWinner(squares);
  let status;

  if (gameMode === "player-vs-player") {
    if (winner) {
      status = "Winner: " + winner;
    } else if (!squares.includes(null)) {
      status = "It's a draw!";
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  if (gameMode === "player-vs-computer") {
    if (winner) {
      if(playerChoice == winner)status = "Winner: Player";
      else status = "Winner: Computer";
    } else if (!squares.includes(null)) {
      status = "It's a draw!";
    } else {
      status = "Your symbol: " + playerChoice;
    }
  }

  function endPanel() {
    if (winner || !squares.includes(null)) {
      return (
        <div className="buttons">
          <div className="button" onClick={() => {
            setSquares(Array(9).fill(null));
            setXIsNext(true);
            setPlayerChoice(null);
          }}>
            play-again
          </div>
          <div className="button" onClick={() => setGameMode("menu")}>
            menu
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      {endPanel()}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
