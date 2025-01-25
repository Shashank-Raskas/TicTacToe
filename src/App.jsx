import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";
import { useState } from "react";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [hasWinner,setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState('X')  //we are not using this as we are using the state in the game turns

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])]; //deep copy of the initialGameBoard so initilGameBoard is not mutated and gameboard is a new array with new memory location and values

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thridSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thridSquareSymbol){
      winner = firstSquareSymbol;
    }
  }
  
  const hasDraw = gameTurns.length === 9 && !winner;
  
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');   //stoped using this as we are using the state in the game turns
    setGameTurns(prevTurns => {
      {/*getting the state of the game turns*/ }
      const currentPlayer = deriveActivePlayer(prevTurns); //reusing the deriveActivePlayer function to get the current player

      const updateTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, // currrent turn data
      ...prevTurns,  //spread operator to get the all the previous turns, prevTurns contains all the moves made so far in the game (from previous turns).
      ];
      return updateTurns;
    });
  }

  // function Parent() {
  //   const [count, setCount] = useState(0);

  //   return (
  //     <div>
  //       <ChildA count={count} setCount={setCount} />
  //       <ChildB count={count} setCount={setCount} />  //!this is called lifting up the state where if two components can use a common state in the other component
  //     </div>
  //   );
  // }

  // function ChildA({ count, setCount }) {
  //   return (
  //     <div>
  //       <p>Child A: {count}</p>
  //       <button onClick={() => setCount(count + 1)}>Increment A</button>
  //     </div>
  //   );
  // }

  // function ChildB({ count, setCount }) {
  //   return (
  //     <div>
  //       <p>Child B: {count}</p>
  //       <button onClick={() => setCount(count + 1)}>Increment B</button>
  //     </div>
  //   );
  // }
  
  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id='players' className="highlight-player">
          <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        {/* <Parent /> */}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />  {/*lifting up the state where if two components can use a common state in the other component*/}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
