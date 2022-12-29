import Map from './Map'
import Deck from './Deck'
import Score from './Score'
import SideBar from './SideBar'
import './Board.css'

//background-image: url('img/background.jpg');
const Board = () => {
    return(
        <div id='Board'>
            <Deck/>
            <Score/>
            <Map/>
            <SideBar/>
        </div>
    )
}

export default Board;