import './App.css';

const SYMBOL_X = 'X';
const SYMBOL_O = 'O';

function App() {
  const cells = [
    SYMBOL_O,
    SYMBOL_X,
    null,
    SYMBOL_O,
    null,
    SYMBOL_O,
    null,
    SYMBOL_X,
    null,
  ];
  const currentStep = SYMBOL_X;

  const getSymbolClassName = symbol => {
    if (symbol === SYMBOL_O) return 'symbol--o';
    if (symbol === SYMBOL_X) return 'symbol--x';
    return '';
  };

  const renderSymbol = symbol => {
    return (
      <span className={`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>
    );
  };

  return (
    <div className="game">
      <div className="game-info">Step: {renderSymbol(currentStep)}</div>
      <div className="game-field">
        {cells.map((symbol, index) => {
          return (
            <button key={index} className="cell">
              {symbol ? renderSymbol(symbol) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
