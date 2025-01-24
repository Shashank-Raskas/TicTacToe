
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({onSelectSquare}) {
    // const [gameboard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard =[...prevGameBoard.map(innerArray => [...innerArray])];   // changing values with reference as it objects
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;    //updating it in a immutable way
    //         return updatedBoard;

    //     });
    //     onSelectSquare();
    // }
    return (
        <ol id='game-board'>
            {gameboard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={onSelectSquare}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol >
    );
}