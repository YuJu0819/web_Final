import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  ROOM_QUERY,
  CARD_QUERY,
  PLACE_CARD,
  ACCOUNT_QUERY,
} from "../../../graphql";
import { useGame } from "../../../sign/containers/hooks/useGame";

const useRoom = () => useContext(RoomContext);

const RoomContext = createContext({
  roomNum: "",
  userNum: 0,
  mapArr: [[]],
  mapSize: [],
  handCard: [],
  cardID: "",
  cardArr: [[]],
  cardPos: [],
  cardProperty: [],
  hoverArr: [],
  ifLegal: true,
  ifPlace: false,
  ifPlaceRef: false,
  ifDrop: false,
  ifForceRef: false,
  score: [],
  turn: 10,
  deadline: 0,
  win: 0,
  open: false,
  startGame: () => {},
  chooseACard: () => {},
  addScore: () => {},
  updateMap: () => {},
  dropCard: () => {},
  forceToDrop: () => {},
  setIfForce: () => {},
});

const RoomProvider = (props) => {
  /*
    const LOCALSTORAGE_KEY = "save-me";
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
    const LOCALSTORAGE_NUMBER = "0000";
    const savedNumber = localStorage.getItem(LOCALSTORAGE_NUMBER);
*/
  //states******************************************************************************************************
  const { setUser: setGameUser } = useGame();
  //for room
  const [user, _setUser] = useState("");
  const userRef = useRef(user);
  const setUser = (value) => {
    userRef.current = value;
    _setUser(value);
  };

  const [roomNum, _setRoomNum] = useState("");
  const roomNumRef = useRef(roomNum);
  const setRoomNum = (value) => {
    roomNumRef.current = value;
    _setRoomNum(value);
  };

  //for map
  const [mapArr, setMapArr] = useState([[]]);
  const [mapSize, _setMapSize] = useState([]);
  const mapSizeRef = useRef(mapSize);
  const setMapSize = (value) => {
    mapSizeRef.current = value;
    _setMapSize(value);
  };

  //for hand
  const [handCard, setHandCard] = useState([]);

  //for card
  //ID(str)
  const [cardID, _setCardID] = useState("");
  const cardIDRef = useRef(cardID);
  const setCardID = (value) => {
    cardIDRef.current = value;
    _setCardID(value);
  };
  //5*5 array
  const [cardArr, _setCardArr] = useState([[]]);
  const cardArrRef = useRef(cardArr);
  const setCardArr = (value) => {
    cardArrRef.current = value;
    _setCardArr(value);
  };
  //(posR, posC)
  const [cardPos, _setCardPos] = useState([]);
  const cardPosRef = useRef(cardPos);
  const setCardPos = (value) => {
    cardPosRef.current = value;
    _setCardPos(value);
  };
  //(up(-), down(+), left(-), right(+), rotate(0,1,2,3))
  const [cardProperty, _setCardProperty] = useState([]);
  const cardPropertyRef = useRef(cardProperty);
  const setCardProperty = (value) => {
    cardPropertyRef.current = value;
    _setCardProperty(value);
  };
  //save hover position
  const [hoverArr, _setHoverArr] = useState([[]]);
  const hoverArrRef = useRef(hoverArr);
  const setHoverArr = (value) => {
    hoverArrRef.current = value;
    _setHoverArr(value);
  };
  //check if hover is legal
  const [ifLegal, _setIfLegal] = useState(true);
  const ifLegalRef = useRef(ifLegal);
  const setIfLegal = (value) => {
    ifLegalRef.current = value;
    _setIfLegal(value);
  };
  //check the user1 or user2
  const [userNum, _setUserNum] = useState(0);
  const userNumRef = useRef(userNum);
  const setUserNum = (value) => {
    userNumRef.current = value;
    _setUserNum(value);
  };
  //check if place
  const [ifPlace, _setIfPlace] = useState(false);
  const ifPlaceRef = useRef(ifPlace);
  const setIfPlace = (value) => {
    ifPlaceRef.current = value;
    _setIfPlace(value);
  };
  //check if drop card
  const [ifDrop, _setIfDrop] = useState(false);
  const ifDropeRef = useRef(ifDrop);
  const setIfDrop = (value) => {
    ifDropeRef.current = value;
    _setIfDrop(value);
  };
  //check if force drop card
  const [ifForce, _setIfForce] = useState(false);
  const ifForceRef = useRef(ifForce);
  const setIfForce = (value) => {
    ifForceRef.current = value;
    _setIfForce(value);
  };

  //for score
  const [score, setScore] = useState([1, 1]);
  //for turn
  const [turn, setTurn] = useState(10);
  //for time
  const [deadline, setDeadline] = useState(0);
  const set30 = () => {
    let time = Date.now();
    //console.log(time);
    time += 32 * 1000;
    //console.log(time.toString());
    setDeadline(time);
  };
  //for modal
  const [win, setWin] = useState(0);
  const [open, setOpen] = useState(false);

  //states******************************************************************************************************

  //grqphql*****************************************************************************************************
  const [getRoom, { data, loading, subscribeToMore, refetch }] =
    useLazyQuery(ROOM_QUERY);
  const [getUser] = useLazyQuery(ACCOUNT_QUERY);
  const [getCard] = useLazyQuery(CARD_QUERY);
  const [placeCard] = useMutation(PLACE_CARD);

  useEffect(() => {
    if (data) {
      refetch();
      //console.log("data", user, userNum);
      //for map
      if (user !== "") {
        if (userNum === 0) {
          if (data?.room) {
            console.log("check user");
            let row = data?.room.map.length;
            let column = data?.room.map[0].row.length;
            setMapSize([row, column]);
            setHoverArr(
              Array(row)
                .fill(0)
                .map((x) => Array(column).fill(0))
            );
            let playerNum = 2;
            if (data?.room.users[0].account === user) playerNum = 1;
            setUserNum(playerNum);
          }
        } else if (handCard.length === 0) {
          if (data?.room) {
            console.log("init map and handcard");
            set30();
            let arr = Array(mapSize[0])
              .fill(0)
              .map((x) => Array(mapSize[1]).fill(0));
            for (let i = 0; i < mapSize[0]; i++) {
              if (userNum === 1) {
                arr[i] = data?.room.map[i].row;
              } else if (userNum === 2) {
                for (let j = 0; j < mapSize[1]; j++) {
                  arr[mapSize[0] - 1 - i][mapSize[1] - 1 - j] =
                    (data?.room.map[i].row)[j];
                }
              }
            }
            setMapArr(arr);
            if (data?.room.users[userNum - 1] !== undefined) {
              setHandCard(data?.room.users[userNum - 1].handcard);
            }
            setTurn(data?.room.turn);
          }
        }
      }
    }
    //console.log("eff", data);
  }, [data, user, userNum]);
  //grqphql*****************************************************************************************************

  //export fuction**********************************************************************************************

  const startGame = async (roomNum, user) => {
    setRoomNum(roomNum);
    setUser(user.account);
    await getRoom({ variables: { id: roomNum } });
    console.log(roomNum);
    console.log(user.account);
  };

  const chooseACard = async (id) => {
    if (!ifPlace) {
      console.log("Choose a card with id:", id);
      setCardID(id);
      let arr5 = await getCardArr(id);
      decode(arr5);
    }
  };

  const addScore = (own_add, opp_add) => {
    let newScore = score;
    newScore[0] += own_add;
    newScore[1] += opp_add;
    setScore(newScore);
  };

  const updateMap = async () => {
    const new_room = await getRoom({ variables: { id: roomNum } });
    //console.log("useroom update", new_room.data.room);

    console.log("update map and handcard");
    //console.log(mapSizeRef.current, userNumRef.current);
    let arr = Array(mapSizeRef.current[0])
      .fill(0)
      .map((x) => Array(mapSizeRef.current[1]).fill(0));
    for (let i = 0; i < mapSizeRef.current[0]; i++) {
      if (userNumRef.current === 1) {
        arr[i] = new_room.data.room.map[i].row;
      } else if (userNumRef.current === 2) {
        for (let j = 0; j < mapSizeRef.current[1]; j++) {
          arr[mapSizeRef.current[0] - 1 - i][mapSizeRef.current[1] - 1 - j] =
            new_room.data.room.map[i].row[j];
        }
      }
    }
    //time reset
    set30();
    //game set
    setMapArr(arr);
    setCardID("");
    setHoverArr(
      Array(mapSizeRef.current[0])
        .fill(0)
        .map((x) => Array(mapSizeRef.current[1]).fill(0))
    );
    setHandCard(new_room.data.room.users[userNumRef.current - 1].handcard);
    //console.log(new_room.data.room.users[userNumRef.current-1].score);
    setScore([
      new_room.data.room.users[0].score,
      new_room.data.room.users[1].score,
    ]);
    setTurn(new_room.data.room.turn);
    setIfPlace(false);
    setIfDrop(false);
    //modal
    if (new_room.data.room.turn === 0) {
      setOpen(true);
      if (
        new_room.data.room.users[0].score > new_room.data.room.users[1].score
      ) {
        if (userNumRef.current === 1) setWin(1);
        else if (userNumRef.current === 2) setWin(2);
      } else if (
        new_room.data.room.users[0].score < new_room.data.room.users[1].score
      ) {
        if (userNumRef.current === 1) setWin(2);
        else if (userNumRef.current === 2) setWin(1);
      }
      const new_user = await getUser({ variables: { account: user } });
      console.log(new_user.data);
      //   setGameUser(new_user);
    }
  };

  const dropCard = async () => {
    if (cardIDRef.current === "") {
      console.log("not choose");
    } else {
      setIfPlace(true);
      setIfDrop(true);
      setHoverArr(
        Array(mapSizeRef.current[0])
          .fill(0)
          .map((x) => Array(mapSizeRef.current[1]).fill(0))
      );
      await placeCard({
        variables: {
          roomID: roomNumRef.current,
          userNum: userNumRef.current,
          id: cardIDRef.current,
          rotate: 8,
          pos: [10, 5],
        },
      });
    }
  };

  const forceToDrop = async () => {
    setIfForce(true);
    console.log("force");
    await placeCard({
      variables: {
        roomID: roomNumRef.current,
        userNum: userNumRef.current,
        id: handCard[0],
        rotate: 8,
        pos: [10, 5],
      },
    });
    updateMap();
  };

  //export fuction**********************************************************************************************

  //local function**********************************************************************************************

  //get card arr by id from backend
  const getCardArr = async (id) => {
    let shape = await getCard({ variables: { id: id } });
    console.log(shape.data.card);
    let arr = shape.data.card;
    return arr;
  };
  //decode 1d to 2d(5*5) and get boundary
  const decode = (arr5) => {
    let arr55 = Array(5)
      .fill(0)
      .map((x) => Array(5).fill(0));
    let arr4 = Array(5).fill(0);
    for (let i = 0; i < 5; i++) {
      var num = arr5[i];
      for (let j = 0; j < 5; j++) {
        const mod = num % 2;
        if (mod == 1) {
          arr55[i][j] = userNum;
          if (i - 2 < arr4[0]) arr4[0] = i - 2;
          if (i - 2 > arr4[1]) arr4[1] = i - 2;
          if (j - 2 < arr4[2]) arr4[2] = j - 2;
          if (j - 2 > arr4[3]) arr4[3] = j - 2;
        }
        num = Math.floor(num / 2);
      }
    }
    setCardArr(arr55);
    setCardProperty(arr4);
  };
  //await cardArr and cardProperty set
  useEffect(() => {
    if (cardArr[0].length !== 0 && cardProperty.length !== 0) {
      initPos();
    }
  }, [cardArr, cardProperty]);
  useEffect(() => {
    if (cardPos.length !== 0) {
      initHover();
    }
  }, [cardPos]);
  //init card position at left-down
  const initPos = () => {
    //console.log(cardPos);
    if (cardPos.length === 0) {
      const posR = mapSize[0] - 5 + 2 + (2 - cardProperty[1]);
      const posC = 2 - (2 + cardProperty[2]);
      setCardPos([posR, posC]);
    } else {
      //console.log(cardPos);
      let pos_1 = cardPos[0];
      let pos_2 = cardPos[1];
      let change = false;
      if (cardPos[0] < 2) {
        pos_1 = 2;
        change = true;
      }
      if (cardPos[0] > mapSize[0] - 3) {
        pos_1 = mapSize[0] - 3;
        change = true;
      }
      if (cardPos[1] < 2) {
        pos_2 = 2;
        change = true;
      }
      if (cardPos[1] > mapSize[1] - 3) {
        pos_2 = mapSize[1] - 3;
        change = true;
      }
      if (change) {
        setCardPos([pos_1, pos_2]);
      } else {
        initHover();
      }
    }
  };
  //set hover position and check legal
  const initHover = () => {
    //console.log("inithover");
    let arr = Array(mapSize[0])
      .fill(0)
      .map((x) => Array(mapSize[1]).fill(0));
    let legal = true;
    for (let i = cardProperty[0]; i <= cardProperty[1]; i++) {
      for (let j = cardProperty[2]; j <= cardProperty[3]; j++) {
        arr[cardPos[0] + i][cardPos[1] + j] = cardArr[i + 2][j + 2];
        if (
          arr[cardPos[0] + i][cardPos[1] + j] === userNum &&
          mapArr[cardPos[0] + i][cardPos[1] + j] > 0
        )
          legal = false;
      }
    }
    if (legal) {
      legal = checkLegal(arr);
    }
    setHoverArr(arr);
    setIfLegal(legal);
  };
  //check neighbor
  const checkLegal = (arr) => {
    for (let i = cardProperty[0]; i <= cardProperty[1]; i++) {
      for (let j = cardProperty[2]; j <= cardProperty[3]; j++) {
        let x = cardPos[0] + i;
        let y = cardPos[1] + j;
        //console.log(typeof(x))
        let neighbor = [[]];
        if (arr[x][y] > 0) {
          if (x === 0) {
            if (y === 0)
              neighbor = [
                [0, 1],
                [1, 0],
                [1, 1],
              ];
            else if (y === mapSize[1] - 1)
              neighbor = [
                [0, -1],
                [1, -1],
                [1, 0],
              ];
            else
              neighbor = [
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
              ];
          } else if (x === mapSize[0] - 1) {
            if (y === 0)
              neighbor = [
                [-1, 0],
                [-1, 1],
                [0, 1],
              ];
            else if (y === mapSize[1] - 1)
              neighbor = [
                [-1, -1],
                [-1, 0],
                [0, -1],
              ];
            else
              neighbor = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
              ];
          } else {
            if (y === 0)
              neighbor = [
                [-1, 0],
                [-1, 1],
                [0, 1],
                [1, 0],
                [1, 1],
              ];
            else if (y === mapSize[1] - 1)
              neighbor = [
                [-1, -1],
                [-1, 0],
                [0, -1],
                [1, -1],
                [1, 0],
              ];
            else
              neighbor = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
              ];
          }
          for (let i = 0; i < neighbor.length; i++) {
            let addx = neighbor[i][0];
            let addy = neighbor[i][1];
            if (mapArr[x + addx][y + addy] === arr[x][y]) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };
  //move hoverposition
  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);
  const detectKeyDown = (event) => {
    if (!ifPlaceRef.current) {
      const { key, keyCode } = event;
      //console.log("Clicked", key);
      if (keyCode >= 37 && keyCode <= 40) shift(key);
      if (keyCode === 82) rotate();
      if (keyCode === 13) place();
    }
  };
  const shift = (orient) => {
    const pos = cardPosRef.current;
    const size = mapSizeRef.current;
    const property = cardPropertyRef.current;
    if (orient === "ArrowRight") {
      if (pos[1] + 1 < size[1] - property[3]) setCardPos([pos[0], pos[1] + 1]);
      else console.log("edge");
    } else if (orient === "ArrowLeft") {
      if (pos[1] - 1 >= 0 - property[2]) setCardPos([pos[0], pos[1] - 1]);
      else console.log("edge");
    } else if (orient === "ArrowUp") {
      if (pos[0] - 1 >= 0 - property[0]) setCardPos([pos[0] - 1, pos[1]]);
      else console.log("edge");
    } else if (orient === "ArrowDown") {
      if (pos[0] + 1 < size[0] - property[1]) setCardPos([pos[0] + 1, pos[1]]);
      else console.log("edge");
    }
  };
  const rotate = () => {
    const property = cardPropertyRef.current;
    const oldArr = cardArrRef.current;
    const newArr = Array(5)
      .fill(0)
      .map((x) => Array(5).fill(0));
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        newArr[i][j] = oldArr[4 - j][i];
      }
    }
    //console.log(cardArrRef.current);
    //console.log(newArr);
    setCardArr(newArr);
    setCardProperty([
      property[2],
      property[3],
      -1 * property[1],
      -1 * property[0],
      (property[4] + 1) % 4,
    ]);
  };
  const place = async () => {
    if (ifLegalRef.current === false) {
      console.log("not legal place");
    } else if (ifPlaceRef.current === true) {
      console.log("you have place");
    } else if (cardIDRef.current === "") {
      console.log("not choose a card yet!");
    } else {
      setIfPlace(true);
      if (userNumRef.current === 1) {
        //console.log("do p1 mutation");
        await placeCard({
          variables: {
            roomID: roomNumRef.current,
            userNum: userNumRef.current,
            id: cardIDRef.current,
            rotate: cardPropertyRef.current[4],
            pos: cardPosRef.current,
          },
        });
      }
      if (userNumRef.current === 2) {
        let rotate = cardPropertyRef.current[4];
        let pos = cardPosRef.current;
        rotate = (rotate + 2) % 4;
        pos[0] = mapSizeRef.current[0] - 1 - pos[0];
        pos[1] = mapSizeRef.current[1] - 1 - pos[1];
        //console.log("do p2 mutation");
        await placeCard({
          variables: {
            roomID: roomNumRef.current,
            userNum: userNumRef.current,
            id: cardIDRef.current,
            rotate: rotate,
            pos: pos,
          },
        });
      }
      setCardArr([[]]);
      setCardPos([]);
      setCardProperty([]);
    }
  };

  //local function**********************************************************************************************

  return (
    <RoomContext.Provider
      value={{
        roomNum,
        userNum,
        mapArr,
        mapSize,
        handCard,
        cardID,
        cardArr,
        cardPos,
        cardProperty,
        hoverArr,
        ifLegal,
        ifPlace,
        ifPlaceRef,
        ifDrop,
        ifForceRef,
        score,
        turn,
        deadline,
        win,
        open,
        startGame,
        chooseACard,
        addScore,
        updateMap,
        dropCard,
        forceToDrop,
        setIfForce,
      }}
      {...props}
    />
  );
};

export { RoomProvider, useRoom };
