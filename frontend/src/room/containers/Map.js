import { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Cell from '../componets/Cell';
import { useRoom } from './hooks/useRoom';
import { useQuery } from "@apollo/client";
import { ROOM_QUERY, ROOM_UPDATE_SUBSCRIPTION } from "../../graphql"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto; 
`;



const Map = () => {

    const { mapArr, hoverArr, ifLegal, roomNum, updateMap } = useRoom();

    const { data, subscribeToMore, refetch } = useQuery(ROOM_QUERY, {
        variables: { id: roomNum },
    });
    useEffect(() => {
        refetch();
        //getRoom({variables : {id: roomNum}});
        subscribeToMore({
            document: ROOM_UPDATE_SUBSCRIPTION,
            variables: { roomId: roomNum },
            updateQuery: (prev, { subscriptionData }) => {
            if (subscriptionData) {
                //   setIfStart(subscriptionData.data)
                updateMap();
                //console.log(subscriptionData);
                //console.log("update room");
            }
            return prev;
            },
        });
    }, [subscribeToMore]);

    return(
        <Wrapper>
            {
            mapArr.length === 1 ? <div>loading map...</div> :
            mapArr.map((row, index) => {
                let indexOut = index;
                return (
                    <div id={indexOut} style={{display:'flex'}} key={indexOut}>
                        {row.map((e, index) => {
                            return(
                                <Cell
                                x = {indexOut}
                                y = {index}
                                value = {e}
                                hover = {hoverArr[indexOut][index]}
                                legal = {ifLegal}
                                key={indexOut+'_'+index}
                                />
                            )
                        }
                    )}
                    </div>
                )
            })
            }
        </Wrapper>
            
    );
};

export default Map;

/*
const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 350px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const Scroll = styled.div`
    width: 100%;
    height: 250px;
    overflow: auto;
`;
*/