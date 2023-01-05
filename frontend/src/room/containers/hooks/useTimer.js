import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useRoom } from "./useRoom";

const SECOND = 1000;

const TurnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 8vw;
    height: 30%;
    margin: auto;
    font-size: 2vw;
    font-family: 'Futura';
    font-weight: 900;
    color: white;
`;


const Timer = ({ deadline = new Date().toString() }) => {
    const parsedDeadline = deadline;
    //console.log(parsedDeadline);
    //console.log(deadline);
    const [time, setTime] = useState(30*1000);
    const {forceToDrop, ifForceRef, setIfForce, ifPlace, ifPlaceRef} = useRoom();
    //console.log(time);

    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            1000,
        );
        return () => clearInterval(interval);
    }, [parsedDeadline]);

    if(Math.floor((time / SECOND) > 5)){
        if(ifForceRef.current === true){
            setIfForce(false);
        }
    }

    if(Math.floor((time / SECOND) < 0)){
        if(ifForceRef.current === false){
            forceToDrop();
        }
        return (
            <TurnWrapper>
                {0}
            </TurnWrapper>
        );
    }

    return (
        <TurnWrapper>
            {`${Math.floor((time / SECOND) % 60)}`.padStart(2, "0")}
        </TurnWrapper>
    );
};

export { Timer } 