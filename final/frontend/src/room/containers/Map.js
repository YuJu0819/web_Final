import { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Cell from '../componets/Cell';
import { useRoom } from './hooks/useRoom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto; 
`;

const Map = () => {

    const { mapArr, hoverArr, ifLegal } = useRoom();

    //在Map上移動卡片
    
        //處理移動(Map)
            //判斷邊界(Map)
            //判斷能不能放(重疊與接壤)(Map or Backend)
                //及時render該卡片狀態(哪些格子重疊，或沒有格子接壤，或可放置)
                    //只需要暫時更新(Cell)
        //確定放置後處理回合結算
            //回傳選擇的卡片、放置的位置
    //回合結算
        //檢查是否有重疊放置
            //依特定規則決定重疊方塊處置(Map)
        //更新(MapArr),(Cell)
    return(
        <Wrapper>
            {
            mapArr.length === 1 ? <div>loading map...</div> :
            mapArr.map((row, index) => {
                let indexOut = index;
                return (
                    <div id={indexOut} style={{display:'flex'}} key={indexOut}>
                        {row.map((e, index) => {
                            return(
                                <Cell
                                x = {indexOut}
                                y = {index}
                                value = {e}
                                hover = {hoverArr[indexOut][index]}
                                legal = {ifLegal}
                                key={indexOut+'_'+index}
                                />
                            )
                        }
                    )}
                    </div>
                )
            })
            }
        </Wrapper>
            
    );
};

export default Map;

/*
const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 350px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const Scroll = styled.div`
    width: 100%;
    height: 250px;
    overflow: auto;
`;
*/