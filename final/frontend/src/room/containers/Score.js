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
  border: 1px solid gold; 
  flex-wrap: wrap;
`;

const ScoreWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 15%;
    width: 10vw;
    margin: auto;
    border: 1px solid gold;
    font-size: 10vh;
    font-family: 'Futura';
    font-weight: 900;
    color: white;
`

const Score = () => {
    const { score } = useRoom();
    
    return(
        <Wrapper>
            <ScoreWrapper>
                {score[0]}
            </ScoreWrapper>
            <ScoreWrapper>
                {score[1]}
            </ScoreWrapper>
        </Wrapper>
    )
}

export default Score;