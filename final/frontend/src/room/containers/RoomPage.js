import Board from './Board';
import { useRoom } from './hooks/useRoom'
import { useState } from 'react'

function Room() {
  const { startGame } = useRoom();
  const [ifStart, setIfStart] = useState(false);
  const start = () => {
    startGame(23, 11, [19, 5], [3, 5]);
    setIfStart(true);
  }

  return (
    <div>
      {ifStart ? <Board/> : <button onClick={start}>start</button>}
    </div>
  );
}

export default Room;
