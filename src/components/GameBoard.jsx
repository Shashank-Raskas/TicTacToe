import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({onSelectSquare, activePlayerSymbol}) {
    const [gameboard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            const updatedBoard =[...prevGameBoard.map(innerArray => [...innerArray])];   // changing values with reference as it objects
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;    //updating it in a immutable way
            return updatedBoard;

        });
        onSelectSquare();
    }
    return (
        <ol id='game-board'>
            {gameboard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => {handleSelectSquare(rowIndex,colIndex)}}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol >
    );
}