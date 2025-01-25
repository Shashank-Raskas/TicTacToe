import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X')  //we are not using this as we are using the state in the game turns

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');   //stoped using this as we are using the state in the game turns
    setGameTurns(prevTurns => {    {/*getting the state of the game turns*/}
      let currentPlayer = 'X';
      
      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {   //if the first player is X then the next player is O
        currentPlayer = 'O';  
      }

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

  return (
    <main>
      <div id="game-container">
        <ol id='players' className="highlight-player">
          <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        {/* <Parent /> */}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />  {/*lifting up the state where if two components can use a common state in the other component*/}
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
