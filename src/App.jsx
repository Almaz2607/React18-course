import { useState } from 'react';
import './App.css';

const SYMBOL_X = 'X';
const SYMBOL_O = 'O';
const INITIAL_SYMBOL = SYMBOL_O;
const INITIAL_STATE = [null, null, null, null, null, null, null, null, null];

const computeWinner = (cells) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return [a, b, c];
    }
  }
};

function App() {
  const [cells, setCells] = useState(INITIAL_STATE);
  const [currentStep, setCurrentStep] = useState(INITIAL_SYMBOL);
  const [winnerSequence, setWinnerSequence] = useState();

  const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined;
  const isDraw = !winnerSequence && !cells.includes(null);

  const hanldeCellClick = (index) => {
    if (cells[index] || winnerSequence) return;

    const cellsCopy = cells.slice();
    cellsCopy[index] = currentStep;
    const winner = computeWinner(cellsCopy);

    setCells(cellsCopy);
    setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
    setWinnerSequence(winner);
  };

  const handleResetClick = () => {
    setCells(INITIAL_STATE);
    setCurrentStep(INITIAL_SYMBOL);
    setWinnerSequence(undefined);
  };

  return (
    <div className="game">
      <GameInfo
        isDraw={isDraw}
        winnerSymbol={winnerSymbol}
        currentStep={currentStep}
      />
      <div className="game-field">
        {cells.map((symbol, index) => (
          <GameCell
            symbol={symbol}
            isWinner={winnerSequence?.includes(index)}
            onClick={() => hanldeCellClick(index)}
          />
        ))}
      </div>
      <div className="game-control">
        <button type="button" className="reset" onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </div>
  );
}

function GameSymbol({ symbol }) {
  const getSymbolClassName = (symbol) => {
    if (symbol === SYMBOL_O) return 'symbol--o';
    if (symbol === SYMBOL_X) return 'symbol--x';
    return '';
  };

  return (
    <span className={`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>
  );
}

function GameInfo({ isDraw, winnerSymbol, currentStep }) {
  if (isDraw) {
    return <div className="game-info">Draw</div>;
  }

  if (winnerSymbol) {
    return (
      <div className="game-info">
        Winner: <GameSymbol symbol={winnerSymbol} />
      </div>
    );
  }

  return (
    <div className="game-info">
      Step: <GameSymbol symbol={currentStep} />
    </div>
  );
}

function GameCell({ symbol, isWinner, onClick }) {
  return (
    <button className={`cell ${isWinner ? 'cell--win' : ''}`} onClick={onClick}>
      <GameSymbol symbol={symbol} />
    </button>
  );
}

export default App;
