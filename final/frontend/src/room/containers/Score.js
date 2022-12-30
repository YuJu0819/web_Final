import styled from 'styled-components';
import { useRoom } from './hooks/useRoom';

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
    font-size: 4vw;
    font-family: 'Futura';
    font-weight: 900;
    color: white;
`;
//  border: 1px solid gold; 

const Score = () => {
    const { score } = useRoom();
    
    return(
        <Wrapper>
            <ScoreWrapper>
                {score[0]}
            </ScoreWrapper>
            <ScoreWrapper>
               V.S.
            </ScoreWrapper>
            <ScoreWrapper>
                {score[1]}
            </ScoreWrapper>
        </Wrapper>
    )
}

export default Score;