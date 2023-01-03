import Board from './Board';
import { useRoom } from './hooks/useRoom';
import { useState } from 'react';
import { USERS_IN_ROOM_SUBSCRIPTION, ROOM_QUERY } from '../../graphql';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useGame } from '../../sign/containers/hooks/useGame';
import { useEffect } from 'react';

function Room() {
  const { startGame } = useRoom();
  const [ifStart, setIfStart] = useState(false);
  const { roomNum } = useGame();
  const { data, subscribeToMore, refetch } = useQuery(ROOM_QUERY, {
    variables: { id: roomNum },
  });
  console.log(data);
  console.log(roomNum);
  useEffect(() => {
    refetch();
    subscribeToMore({
      document: USERS_IN_ROOM_SUBSCRIPTION,
      variables: { roomId: roomNum },
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData) {
          setIfStart(subscriptionData.data);
        }
        return prev;
      },
    });
  }, [subscribeToMore]);
  const start = () => {
    startGame(18, 9, [2, 4], [15, 4]);
    setIfStart(true);
  };

  return (
    <div>{ifStart ? <Board /> : <button onClick={start}>start</button>}</div>
  );
}

export default Room;
