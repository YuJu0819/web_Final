import styled from 'styled-components';
import Used from '../componets/Used';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  height: 90vh;
  width: 18vW;
  margin: auto;
  border-radius: 25px;
  background-color:  rgba(60, 70, 90, 0.4);
`;

let cardNum = [0,1,2,3]

const Score = () => {
    return(
        <Wrapper>
            <Used id = {cardNum[0]}/>
            <Used id = {cardNum[1]}/>
        </Wrapper>
    )
}

export default Score;