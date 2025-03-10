import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";
import { useState } from "react";

const PLAYERS ={
  X : 'Player 1',
  O : 'Player 2'
}

const INITIAL_GAME_BOARD = [
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

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thridSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thridSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]; //deep copy of the initialGameBoard so initilGameBoard is not mutated and gameboard is a new array with new memory location and values

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner,setHasWinner] = useState(false); //we are not using this as we are using the winner to determine the winner
  // const [activePlayer, setActivePlayer] = useState('X')  //we are not using this as we are using the state in the game turns

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
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

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,            //spread operator to get the previous players
        [symbol]: newName,   //changing the name of the player
      };
    }
    );
  }

  return (
    <main>
      <div id="game-container">
        <ol id='players' className="highlight-player">
          <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
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
