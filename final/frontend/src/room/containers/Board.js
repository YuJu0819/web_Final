import './Board.css'
import { useState } from 'react'
import Map from './Map'
import Deck from './Deck'
import Score from './Score'
import SideBar from './SideBar'
import { useEffect } from 'react'

//background-image: url('img/background.jpg');
const Board = () => {

    const[chooseCard, setChooseCard] = useState('-1');
    const[chooseArr, setChooseArr] = useState([0, 0, 0, 0, 0, 0]);

    return(
        <div id='Board'>
            <Deck/>
            <Score/>
            <Map chooseCard = {chooseCard} chooseArr = {chooseArr} setChooseArr = {setChooseArr}/>
            <SideBar/>
        </div>
    )
}

export default Board;