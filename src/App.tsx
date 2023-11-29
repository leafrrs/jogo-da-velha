
import { useEffect, useState } from 'react'
import './App.scss'

const winningCombinations = [
  {indexes: [0, 1, 2], orientation:'horizontal'},
  {indexes: [3, 4, 5], orientation:'horizontal'},
  {indexes: [6, 7, 8], orientation:'horizontal'},
  {indexes: [0, 3, 6], orientation:'vertical'},
  {indexes: [1, 4, 7], orientation:'vertical'},
  {indexes: [2, 5, 8], orientation:'vertical'},
  {indexes: [0, 4, 8], orientation:'diagonal-1'},
  {indexes: [2, 4, 6], orientation:'diagonal-2'},
];

function App() {

  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [turn, setTurn] = useState(1)
  const [winnerCombo, setWinnerCombo] = useState(null)

  const handleClick = (clickedIndex: any) => {
    console.log(clickedIndex);

    if (gameData[clickedIndex] !== 0) {
      return
    }
    if (winnerCombo) {
      return;
    }

    setGameData((prev) => {
      const newGameData = [...prev]
      newGameData[clickedIndex] = turn;
      return newGameData
    });

    setTurn((prev) => (prev === 1 ? 2 : 1));
  };

  useEffect(() => {
    if (winnerCombo) {
      alert(`O jogador ${turn === 1 ? 2 : 1} venceu!`);
    }
  }, [winnerCombo]);

  const checkGameOver = () => {
    if (gameData.every((item) => item !== 0)) {
      alert('Velha!');
    }
  }
 

  const checkWinner = () => {
    let winner = null;

    for (let combinations of winningCombinations) {
     const { indexes } = combinations;
    if (
      gameData[indexes[0]] === 1 &&
      gameData[indexes[1]] === 1 &&
      gameData[indexes[2]] === 1
    ) {
      winner = 'player 1';
    }

    if (
      gameData[indexes[0]] === 2 &&
      gameData[indexes[1]] === 2 &&
      gameData[indexes[2]] === 2
    ) {
      winner = 'player 2';
    }
    if(winner) {
      setWinnerCombo(combinations);
      break;
    }
  }

  console.log(winner);
};

useEffect(() => {
  checkWinner();
  checkGameOver();
}, [gameData]);

  return (
    <>
      <div className="board-game">
        {gameData.map((value, index) => (
          
          <span key={index}
           onClick={() => { handleClick(index); }}
           className={
            winnerCombo?.indexes.includes(index)
              ? winnerCombo.orientation
              : undefined
            }>
            <abbr title="">{index}</abbr>
            {value === 1 && '❌'}
            {value === 2 && '⭕'}
            </span>
        ))}


      </div>
    </>
  )
}

export default App
