import styled from 'styled-components';
import { useRoom } from "../containers/hooks/useRoom"

const Wrapper = styled.div`
  display: flex;
  height: 4vh;
  width: 4vh;
  margin: auto;
`;

const Cell = ({x, y, value, hover, legal}) => {
    const { userNum } = useRoom();

    let link = require('../img/block0.jpg');
    //let opacity = false;
    if(userNum === 1){
        if(value === 1) link = require('../img/block1.jpg');
        if(value === 2) link = require('../img/block2.jpg');
        if(value === 3) link = require('../img/block3.jpg');

        if(hover === 1||hover === 2){
            if(!legal){
                link = require('../img/block4.jpg');
                if(value === 1) link = require('../img/block13.jpg');
                if(value === 2) link = require('../img/block23.jpg');
                if(value === 3) link = require('../img/block3.jpg');
            }else if (legal){
                link = require('../img/block11.jpg');
            }
        }
    }else if(userNum === 2){
        if(value === 1) link = require('../img/block2.jpg');
        if(value === 2) link = require('../img/block1.jpg');
        if(value === 3) link = require('../img/block3.jpg');

        if(hover === 1||hover === 2){
            if(!legal){
                link = require('../img/block4.jpg');
                if(value === 1) link = require('../img/block23.jpg');
                if(value === 2) link = require('../img/block13.jpg');
                if(value === 3) link = require('../img/block3.jpg');
            }else if (legal){
                link = require('../img/block11.jpg');
            }
        }
    }
     
    return(
        <Wrapper>
            <div>
                <img src={link} style={{height: '4vh', width: '4vh', opacity: '1'}}/>
            </div>
        </Wrapper>
    );
};

export default Cell;