import styled from 'styled-components';
import { useEffect } from 'react';
import { useRoom } from './hooks/useRoom';
import { Timer } from './hooks/useTimer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-evenly;
  justify-content: center;
  height: 90vh;
  width: 10vw;
  margin: auto;
  flex-wrap: wrap;
  border-radius: 10vh;
  background-color: rgba(30, 35, 45, 0.6);;
`;

const ScoreWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 15%;
    width: 10vw;
    margin: auto;
    font-size: 3vw;
    font-family: 'Futura';
    font-weight: 900;
    color: white;
    flex-wrap: wrap;
`;

const ScoreWrapper2 = styled.div`
    display: flex;
    flex-direction: row;
    align-content: space-between;
    justify-content: center;
    height: 15%;
    width: 10vw;
    margin: auto;
    font-size: 3vw;
    font-family: 'Futura';
    font-weight: 900;
    color: white;
    flex-wrap: wrap;
`;

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
//  border: 1px solid gold; 

const Score = () => {
    const { score, turn, userNum, deadline} = useRoom();

    if(userNum === 1){
        return(
            <Wrapper>
                <ScoreWrapper2>
                    <TurnWrapper>Left :</TurnWrapper>
                    <TurnWrapper>{turn}</TurnWrapper>
                    <TurnWrapper>Turns</TurnWrapper>
                </ScoreWrapper2>
                <ScoreWrapper>
                    {score[1]}p
                </ScoreWrapper>
                <ScoreWrapper>
                V.S.
                </ScoreWrapper>
                <ScoreWrapper>
                    {score[0]}p
                </ScoreWrapper>
                <ScoreWrapper2>
                    <TurnWrapper>Left :</TurnWrapper>
                    <Timer deadline={deadline}/>
                    <TurnWrapper>Second</TurnWrapper>
                </ScoreWrapper2>
            </Wrapper>
        )
    }else if(userNum === 2){
        return(
            <Wrapper>
                <ScoreWrapper2>
                    <TurnWrapper>Left :</TurnWrapper>
                    <TurnWrapper>{turn}</TurnWrapper>
                    <TurnWrapper>Turns</TurnWrapper>
                </ScoreWrapper2>
                <ScoreWrapper>
                    {score[0]}p
                </ScoreWrapper>
                <ScoreWrapper>
                V.S.
                </ScoreWrapper>
                <ScoreWrapper>
                    {score[1]}p
                </ScoreWrapper>
                <ScoreWrapper2>
                    <TurnWrapper>Left :</TurnWrapper>
                    <Timer deadline={deadline}/>
                    <TurnWrapper>Second</TurnWrapper>
                </ScoreWrapper2>
            </Wrapper>
        )
    }
    
    
}

export default Score;