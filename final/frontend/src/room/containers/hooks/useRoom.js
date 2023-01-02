import { createContext, useState, useContext, useEffect, useCallback, useRef } from "react";

const useRoom = () => useContext(RoomContext);

const RoomContext = createContext({
    mapArr: [[]],
    mapSize: [],
    cardID: '',
    cardArr: [[]],
    cardPos: [],
    cardProperty: [],
    hoverArr: [],
    ifLegal: true,
    score: [],
    startGame: () => {},
    chooseACard: () => {},
    addScore: () => {},
});

const RoomProvider = (props) => {

    //states******************************************************************************************************
    
    //for map
    const [mapArr, setMapArr] = useState([[]]);
    const [mapSize, _setMapSize] = useState([]);
    const mapSizeRef = useRef(mapSize);
    const setMapSize = (value) => {
        mapSizeRef.current = value;
        _setMapSize(value);
    }

    //for card
    //ID(str)
    const [cardID, setCardID] = useState('');
    //5*5 array
    const [cardArr, _setCardArr] = useState([[]]);
    const cardArrRef = useRef(cardArr);
    const setCardArr = (value) => {
        cardArrRef.current = value;
        _setCardArr(value);
    }
    //(posR, posC)
    const [cardPos, _setCardPos] = useState([]);
    const cardPosRef = useRef(cardPos);
    const setCardPos = (value) => {
        cardPosRef.current = value;
        _setCardPos(value);
    }
    //(up(-), down(+), left(-), right(+))
    const [cardProperty, _setCardProperty] = useState([]);
    const cardPropertyRef = useRef(cardProperty);
    const setCardProperty = (value) => {
        cardPropertyRef.current = value;
        _setCardProperty(value);
    }
    //save hover position
    const [hoverArr, _setHoverArr] = useState([[]]);
    const hoverArrRef = useRef(hoverArr);
    const setHoverArr = (value) => {
        hoverArrRef.current = value;
        _setHoverArr(value);
    }
    //check if hover is legal
    const [ifLegal, setIfLegal] = useState(true);
    //check the user1 or user2
    const [userNum, setUserNum] = useState(2);

    //for score
    const [score, setScore] = useState([0, 0]);

    //states******************************************************************************************************
 
    //export fuction**********************************************************************************************

    const startGame = (row, column, pos_1, pos_2) => {
        let arr = Array(row).fill(0).map(x => Array(column).fill(0));
        arr[pos_1[0]][pos_1[1]] = 1;
        arr[pos_2[0]][pos_2[1]] = 2;
        setMapArr(arr);
        setMapSize([row, column]);
        setHoverArr(Array(row).fill(0).map(x => Array(column).fill(0)));
    }

    const chooseACard = async(id) => {
        console.log("Choose a card with id:", id);
        setCardID(id);
        let arr5 = await getCardArr(id);
        decode(arr5);
    }

    const addScore = (own_add, opp_add) => {
        let newScore = score;
        newScore[0] += own_add;
        newScore[1] += opp_add;
        setScore(newScore);
    }

    //export fuction**********************************************************************************************

    //local function**********************************************************************************************
    
    //get card arr[0,28,15,28,0] by id from backend
    //not yet ***********************************************
    const getCardArr = (id) => {
        let arr = [0, 28, 15, 28, 0]
        if(id === 2) arr = [0, 14, 8, 8, 0]
        return arr
    }
    //decode 1d to 2d(5*5) and get boundary
    const decode = (arr5) => {
        let arr55 = Array(5).fill(0).map(x => Array(5).fill(0));
        let arr4 = Array(4).fill(0);
        for(let i=0;i<5;i++){
            var num = arr5[i];
            for(let j=0;j<5;j++){
                const mod = num%2;
                if(mod == 1){
                    arr55[i][j] = userNum;
                    if((i-2) < arr4[0]) arr4[0] = (i-2);
                    if((i-2) > arr4[1]) arr4[1] = (i-2);
                    if((j-2) < arr4[2]) arr4[2] = (j-2);
                    if((j-2) > arr4[3]) arr4[3] = (j-2);
                }
                num = Math.floor(num/2);
            }
        }
        setCardArr(arr55);
        setCardProperty(arr4);
    }
    //await cardArr and cardProperty set
    useEffect(() => {
        if(cardArr[0].length !== 0 && cardProperty.length !== 0){
            initPos();
        }
    },[cardArr, cardProperty])
    useEffect(() => {
        if(cardPos.length !== 0){
            initHover();
        }
    },[cardPos])
    //init card position at left-down
    const initPos = () => {
        //console.log(cardPos);
        if(cardPos.length === 0){
            const posR = (mapSize[0]-5)+2+(2-cardProperty[1]);
            const posC = 2-(2+cardProperty[2]);
            setCardPos([posR, posC]);
        }else{
            //console.log(cardPos);
            let pos_1 = cardPos[0];
            let pos_2 = cardPos[1];
            let change = false;
            if(cardPos[0] < 2){
                pos_1 = 2;
                change = true;
            }
            if(cardPos[0] > mapSize[0] - 3){
                pos_1 = mapSize[0] - 3;
                change = true;
            }
            if(cardPos[1] < 2){
                pos_2 = 2;
                change = true;
            }
            if(cardPos[1] > mapSize[1] - 3){
                pos_2 = mapSize[1] - 3;
                change = true;
            }
            if(change){
                setCardPos([pos_1, pos_2]);
            }else{
                initHover(); 
            }
        }
    }
    //set hover position and check legal
    const initHover = () => {
        //console.log("inithover");
        let arr = Array(mapSize[0]).fill(0).map(x => Array(mapSize[1]).fill(0));
        let legal = true;
        for(let i=cardProperty[0];i<=cardProperty[1];i++){
            for(let j=cardProperty[2];j<=cardProperty[3];j++){
                arr[cardPos[0]+i][cardPos[1]+j] = cardArr[i+2][j+2]
                if(arr[cardPos[0]+i][cardPos[1]+j] === userNum && 
                   mapArr[cardPos[0]+i][cardPos[1]+j] > 0)
                   legal = false;
            }
        }
        if(legal){
            legal = checkLegal(arr);
        }
        setHoverArr(arr);
        setIfLegal(legal);
    }
    //check neighbor 
    const checkLegal = (arr) => {
        for(let i=cardProperty[0];i<=cardProperty[1];i++){
            for(let j=cardProperty[2];j<=cardProperty[3];j++){
                let x = cardPos[0]+i;
                let y = cardPos[1]+j;
                //console.log(typeof(x))
                let neighbor = [[]];
                if(arr[x][y] > 0){
                    if(x === 0){
                        if(y === 0) neighbor = [[0,1], [1,0], [1,1]]
                        else if (y === (mapSize[1] - 1)) neighbor = [[0,-1], [1,-1], [1,0]]
                        else neighbor = [[0,-1], [0,1], [1,-1], [1,0], [1,1]]
                    }else if (x === (mapSize[0] - 1)){
                        if(y === 0) neighbor = [[-1,0], [-1,1], [0,1]]
                        else if (y === (mapSize[1] - 1)) neighbor = [[-1,-1], [-1,0], [0,-1]]
                        else neighbor = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1]]
                    }else {
                        if(y === 0) neighbor = [[-1,0], [-1,1], [0,1], [1,0], [1,1]]
                        else if (y === (mapSize[1] - 1)) neighbor = [[-1,-1], [-1,0], [0,-1], [1,-1], [1,0]]
                        else neighbor = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]
                    }
                    for(let i=0;i<neighbor.length;i++){
                        let addx = neighbor[i][0]
                        let addy = neighbor[i][1]
                        if(mapArr[x+addx][y+addy] === arr[x][y]){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    //move hoverposition
    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
    },[])
    const detectKeyDown = (event) => {
        const { key, keyCode } = event;
        //console.log("Clicked", key);
        if(keyCode >= 37 && keyCode <= 40) shift(key);
        if(keyCode === 82) rotate();
    }
    const shift = (orient) => {
        const pos = cardPosRef.current;
        const size = mapSizeRef.current;
        const property = cardPropertyRef.current;
        if(orient === 'ArrowRight'){
            if(pos[1] + 1 < (size[1] - property[3]))
            setCardPos([pos[0], (pos[1] + 1)]);
            else console.log("edge")
        }else if(orient === 'ArrowLeft'){
            if(pos[1] - 1 >= (0 - property[2]))
            setCardPos([pos[0], (pos[1] - 1)]);
            else console.log("edge")
        }else if(orient === 'ArrowUp'){
            if(pos[0] - 1 >= (0 - property[0]))
            setCardPos([(pos[0] - 1), pos[1]]);
            else console.log("edge")
        }else if(orient === 'ArrowDown'){
            if(pos[0] + 1 < (size[0] - property[1]))
            setCardPos([(pos[0] + 1), pos[1]]);
            else console.log("edge")
        }
    }
    const rotate = () => {
        const property = cardPropertyRef.current;
        const oldArr = cardArrRef.current;
        const newArr = Array(5).fill(0).map(x => Array(5).fill(0));
        for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
                newArr[i][j] = oldArr[4-j][i];
            }
        }
        //console.log(cardArrRef.current);
        //console.log(newArr);
        setCardArr(newArr);
        setCardProperty([property[2],property[3],(-1*property[1]),(-1*property[0])]);
    }

    //local function**********************************************************************************************

    return (
        <RoomContext.Provider
            value={{
                mapArr, mapSize,
                cardID, cardArr, cardPos, cardProperty, hoverArr, ifLegal,
                score, 
                startGame, chooseACard, addScore
            }}
            {...props}
        />
    );
};

export { RoomProvider, useRoom };