import styled from 'styled-components';
import Card from '../componets/Card';
import Button from '../componets/Button';
import { useRoom } from './hooks/useRoom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-evenly;
  justify-content: center;
  margin: auto;
  height: 90vh;
  width: 30vW;
  border-radius: 5vh;
  flex-wrap: wrap;
  background-color:  rgba(60, 70, 90, 0.4);
`;

let deck1 = [
    //row1-5, id 
    [ 0, 4,14, 4, 0, 0],//十字
    [ 0, 2, 2,14, 0, 1],//L
    [ 0,10, 4,10, 0, 2],//X
    [ 0,14, 4,14, 0, 3],//口字
]

let cardNum = [0,1,2,3]

const Deck = () => {

    const {chooseACard} = useRoom();

    return(
        <Wrapper>
            <Card id = {cardNum[0]} chooseACard = {chooseACard}/>
            <Card id = {cardNum[1]} chooseACard = {chooseACard}/>
            <Card id = {cardNum[2]} chooseACard = {chooseACard}/>
            <Card id = {cardNum[3]} chooseACard = {chooseACard}/>
            <Button id = {'skip'}/>
            <Button id = {'skill'}/>
        </Wrapper>
    )
}

export default Deck;