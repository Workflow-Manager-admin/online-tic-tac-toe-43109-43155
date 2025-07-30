import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main App component for Tic Tac Toe game.
 * Renders a centered game board, player indicators, win/tie display, and restart controls, using minimalistic light theme and specified primary/secondary/accent colors.
 */
function App() {
  // Board state: 9 squares, null = empty, 'X' or 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  // Player: true = X, false = O
  const [isXNext, setIsXNext] = useState(true);
  // Game result: null = ongoing, 'X' or 'O' win, 'Tie' = tie
  const winner = calculateWinner(board);
  const isTie = !winner && board.every(Boolean);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    // Ignore clicks if there is a winner or square is filled
    if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  // Helpers for status
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isTie) {
    status = "It's a tie!";
  } else {
    status = `Next: ${isXNext ? 'X' : 'O'}`;
  }

  // Board rendering
  const renderSquare = idx => (
    <button
      className="ttt-square"
      style={{
        color: board[idx] === 'X' ? 'var(--primary)' : (board[idx] === 'O' ? 'var(--secondary)' : undefined)
      }}
      onClick={() => handleSquareClick(idx)}
      aria-label={`cell ${idx + 1}: ${board[idx] ? board[idx] : 'empty'}`}
      key={idx}
      disabled={!!board[idx] || !!winner}
    >
      {board[idx]}
    </button>
  );

  return (
    <div className="ttt-app-bg">
      <main className="ttt-main-container">
        {/* Player indicators */}
        <div className="ttt-player-indicator" aria-label="Current player">
          <span
            className={`ttt-player-label${isXNext && !winner && !isTie ? ' ttt-active' : ''}`}
            style={{ color: 'var(--primary)' }}
          >
            X
          </span>
          <span className="ttt-vs" aria-hidden="true">vs</span>
          <span
            className={`ttt-player-label${!isXNext && !winner && !isTie ? ' ttt-active' : ''}`}
            style={{ color: 'var(--secondary)' }}
          >
            O
          </span>
        </div>

        {/* Game board */}
        <div className="ttt-board-container">
          <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="ttt-board-row" role="row">
                  {Array(3)
                    .fill(0)
                    .map((_, j) => renderSquare(i * 3 + j))}
                </div>
              ))}
          </div>
        </div>

        {/* Status and controls */}
        <div className="ttt-status-controls">
          <div className="ttt-status-text">
            {status}
          </div>
          <button className="ttt-restart-btn" onClick={restartGame} aria-label="Restart game">
            Restart
          </button>
        </div>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
/**
 * Calculate the game's winner.
 * @param {Array<string|null>} squares - Board state.
 * @returns {'X'|'O'|null} Winner or null.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default App;
