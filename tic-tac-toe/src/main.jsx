import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Board from './App.jsx';
import Menu from './Menu.jsx';

function Main() {
  const [gameMode, setGameMode] = useState("menu"); 
  const [playerChoice, setPlayerChoice] = useState(null);

  function renderSwitch(mode) {
    switch (mode) {
      case 'player-vs-player':
        return <Board setGameMode={setGameMode} gameMode={mode}/>;
      case 'player-vs-computer':
        if (!playerChoice) {
          return (
            <>
              <h1>Choose option</h1>
              <div className="buttons">
                <div className="button" onClick={() => setPlayerChoice("X")}>X</div>
                <div className="button" onClick={() => setPlayerChoice("O")}>O</div>
              </div>
            </>
          );
        } else {
          return <Board setGameMode={setGameMode} gameMode={mode} playerChoice={playerChoice} setPlayerChoice={setPlayerChoice}/>;
        }
      case 'menu':
      default:
        return <Menu setGameMode={setGameMode} setPlayerChoice={setPlayerChoice} />;
    }
  }

  return (
    <StrictMode>
      {renderSwitch(gameMode)}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
