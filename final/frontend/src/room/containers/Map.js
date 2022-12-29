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
/*
let MapArr = [];
let HoverArr = [];
for(let i=0;i<17;i++){
    MapArr[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    HoverArr[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

let blueArr = [[1, 2],[1, 3],[1, 4],[2, 4],[3, 4]]
let yellowArr = [[13, 4],[14, 3],[14, 4],[14, 5],[15, 4]]
let BHoverArr = [[3, 4],[4, 3],[4, 4],[4, 5],[5, 4]]
let YHoverArr = [[11, 2],[11, 3],[11, 4],[12, 4],[13, 4]]
let IHoverArr = [[7, 3],[7, 5],[8, 4],[9, 3],[9, 5]]
blueArr.forEach((pos)=>{MapArr[pos[0]][pos[1]] = 2})
yellowArr.forEach((pos)=>{MapArr[pos[0]][pos[1]] = 1})
BHoverArr.forEach((pos)=>{HoverArr[pos[0]][pos[1]] = 2})
YHoverArr.forEach((pos)=>{HoverArr[pos[0]][pos[1]] = 1})
IHoverArr.forEach((pos)=>{HoverArr[pos[0]][pos[1]] = 1})
*/

const Map = () => {
    const { mapArr } = useRoom();
    //回合開始
    //選擇一張卡片或跳過(Card)
    //卡片選定後解碼出卡片矩陣(Map)
    //在Map上移動卡片
        //處理移動(Map)
            //判斷邊界(Map)
            //判斷能不能放(重疊與接壤)(Map or Backend)
                let ifLegal = false;
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
            {mapArr.map((row, index) => {
                let indexOut = index;
                return (
                    <div id={indexOut} style={{display:'flex'}}>
                        {row.map((e, index) => {
                            return(
                                <Cell
                                x = {indexOut}
                                y = {index}
                                value = {e}
                                hover = {0}
                                legal = {ifLegal}
                                />
                            )
                        }
                    )}
                    </div>
                )
            })}
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