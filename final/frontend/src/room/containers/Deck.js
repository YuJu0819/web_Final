import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 30vW;
  margin: auto;
  border: 1px solid gold; 
`;

let deck1 = [
    //row1-5, id 
    [ 0, 4,14, 4, 0, 0],//十字
    [ 0, 2, 2,14, 0, 1],//L
    [ 0,10, 4,10, 0, 2],//X
    [ 0,14, 4,14, 0, 3],//口字
]

const Deck = () => {
    const decodecard = (arr) => {
        //card size 5*5
    }
    return(
        <Wrapper>
            
        </Wrapper>
    )
}

export default Deck;