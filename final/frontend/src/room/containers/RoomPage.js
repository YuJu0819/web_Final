import Board from './Board';
import { useRoom } from './hooks/useRoom'
import { useState } from 'react'

function Room() {
  const { startGame } = useRoom();
  const [ifStart, setIfStart] = useState(false);
  const start = () => {
    startGame(18, 9, [2, 4], [15, 4]);
    setIfStart(true);
  }

  return (
    <div>
      {ifStart ? <Board/> : <button onClick={start}>start</button>}
    </div>
  );
}

export default Room;
