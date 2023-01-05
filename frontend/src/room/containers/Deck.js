import styled from 'styled-components';
import Card from '../componets/Card';
import Button from '../componets/Button';
import { useRoom } from './hooks/useRoom';
import { useEffect } from 'react';

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


const Deck = () => {

    const {chooseACard, handCard} = useRoom();

    return(
        handCard.length < 4 ? <div>loading...</div> :
        <Wrapper>
            <Card id = {handCard[0]} chooseACard = {chooseACard}/>
            <Card id = {handCard[1]} chooseACard = {chooseACard}/>
            <Card id = {handCard[2]} chooseACard = {chooseACard}/>
            <Card id = {handCard[3]} chooseACard = {chooseACard}/>
            <Button id = {'drop'}/>
            
        </Wrapper>
    )
}

export default Deck;