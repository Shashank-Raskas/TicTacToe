export default function GameOver({winner, onRestart}) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            <p>{winner ? `${winner} Won!` : 'Game Draw!!'}</p>
            <p>
                <button onClick={onRestart}>Play Again</button>
            </p>
        </div>
    );
}