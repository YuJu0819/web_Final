import styled from 'styled-components';
import Used from '../componets/Used';
import { useRoom } from './hooks/useRoom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 90vh;
  width: 18vW;
  margin: auto;
  border-radius: 25px;
  background-color:  rgba(60, 70, 90, 0.4);
  flex-wrap: wrap;
`;

const ScoreWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40%;
    width: 90%;
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
    align-items: center;
    justify-content: center;
    height: 25%;
    width: 90%;
    margin: auto;
    font-size: 1.8vw;
    font-family: 'Futura';
    font-weight: 900;
    color: white;
    flex-wrap: wrap;
`;

const ScoreWrapper3 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 25%;
    width: 90%;
    margin: auto;
    font-size: 2.5vw;
    font-family: 'Futura';
    font-weight: 900;
    color: white;
    flex-wrap: wrap;
`;

const Score = () => {

    const { cardID, ifPlace } = useRoom();

    if(cardID === ''){
        return(
            <Wrapper>
                <ScoreWrapper>
                    You haven't chosen a card!
                </ScoreWrapper>
            </Wrapper>
        )
    }else if(ifPlace){
        return(
            <Wrapper>
                <ScoreWrapper2>
                    You have chosen the card {`NO.${cardID}`} :
                </ScoreWrapper2>
                <Used id = {cardID}/>
                <ScoreWrapper3>
                    Waiting for opponent...
                </ScoreWrapper3>
            </Wrapper>
        )
    }else{
        return(
            <Wrapper>
                <ScoreWrapper>
                    You have selected the card:
                </ScoreWrapper>
                <Used id = {cardID}/>
            </Wrapper>
        )
    }
}

export default Score;