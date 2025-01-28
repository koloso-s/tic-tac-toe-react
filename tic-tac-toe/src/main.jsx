import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Board from './App.jsx';
import Menu from './Menu.jsx';

function Main() {
  const [gameMode, setGameMode] = useState("menu"); 

  function renderSwitch(mode) {
    switch (mode) {
      case 'player-vs-player':
        return <Board />;
      case 'menu':
      default:
        return <Menu setGameMode={setGameMode} />;
    }
  }

  return (
    <StrictMode>
      {renderSwitch(gameMode)}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
