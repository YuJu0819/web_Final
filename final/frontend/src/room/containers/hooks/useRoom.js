import { createContext, useState, useContext, useEffect } from "react";
const client = new WebSocket('ws://localhost:4000');

const useRoom = () => useContext(RoomContext);

const RoomContext = createContext({
    mapArr: [],
    score: [],
    startGame: () => {},
    addScore: () => {},
});

const RoomProvider = (props) => {

    const [mapArr, setMapArr] = useState([[]]);
    const [score, setScore] = useState([0, 0]);

    const startGame = (row, column, pos_1, pos_2) => {
        let arr = Array(row).fill(0).map(x => Array(column).fill(0));
        arr[pos_1[0]][pos_1[1]] = 1;
        arr[pos_2[0]][pos_2[1]] = 2;
        console.log(arr);
        setMapArr(arr);
    };

    const addScore = (own_add, opp_add) => {
        let newScore = score;
        newScore[0] += own_add;
        newScore[1] += opp_add;
        setScore(newScore);
    }
    
    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "init": {
                break;
            }
            default: 
                break;
        }
    }

    

    return (
        <RoomContext.Provider
            value={{
                mapArr, score, setMapArr, setScore, startGame, addScore
            }}
            {...props}
        />
    );
};

export { RoomProvider, useRoom };