import AccountModel from "../models/account";
import CharacterModel from "../models/character";
import RoomModel from "../models/room";
import CardModel from "../models/card";
import bcrypt from "bcrypt";
const saltRound = 10;
const Mutation = {

  createAccount: async (parent, { account, password, name }) => {
    //console.log(account);
    const hash = bcrypt.hashSync(password, saltRound);
    let existing = await AccountModel.findOne({ account: account });
    if (existing) {
      //console.log(existing.name);
      return null;
    }
    let tmp = await new AccountModel({
      account: account,
      password: hash,
      name: name,
    }).save();
    //console.log(tmp);
    return tmp;
  },

  signAccount: async (parent, { account, password }) => {
    let tmp = await AccountModel.findOne({ account: account });
    let same;
    if (tmp) same = bcrypt.compareSync(password, tmp.password);
    //console.log(same);
    // let existing = await AccountModel.findOne({
    //   $and: [{ account: account }, { password: hash }],
    // });
    let existing = tmp;
    if (same) {
      return existing;
    }
    return null;
  },

  selectCharacter: async (parent, { character, account }) =>
    // { CharacterModel }
    {
      let existing = await CharacterModel.findOne({ id: character });
      let tmp = await AccountModel.updateOne(
        { account: account },
        { character: character }
      );
      let output = await AccountModel.findOne({ account: account });
      return output;
  },

  createRoom: async (parent, { id, user }, { RoomModel, CharacterModel }) => {
    let tmp = await CharacterModel.findOne({ id: user.character });
    //console.log(tmp, user.character);

    let row = 23;
    let column = 11;
    let pos_1 = [19, 5];
    let pos_2 =  [3, 5];
    let arr = Array(row).fill(0).map(x => Array(column).fill(0));
    arr[pos_1[0]][pos_1[1]] = 1;
    arr[pos_2[0]][pos_2[1]] = 2;

    let mapArr = Array(row).fill(0);
    for(let i=0;i<row;i++){
      mapArr[i] = {row: arr[i]}
    }
    //console.log(typeof(mapArr))
    //console.log((mapArr[0].row))
    let testArray = tmp.cards;
    testArray.sort(() => Math.random()>0.5?-1:1);

    let new_room = await new RoomModel({
      id: id,
      users: [
        {
          account: user.account,
          character: user.character,
          handcard: testArray,
          score: 1,
          used : {
            cardid: -1,
            rotate: -1,
            position: [-1, -1],
          }
        },
      ],
      map: mapArr,
      turn: 10,
      timer: 30,
    }).save();
    return new_room;
  },

  addUserToRoom: async (
    parent,
    { roomID, userAccount },
    { RoomModel, CharacterModel, pubsub }
  ) => {
    const user = await AccountModel.findOne({ account: userAccount });
    const userCard = await CharacterModel.findOne({ id: user.character });

    const room = await RoomModel.findOne({ id: roomID });
    //console.log(room, userCard);
    let testArray = userCard.cards;
    testArray.sort(() => Math.random()>0.5?-1:1);
    const output = await RoomModel.updateOne(
      { id: roomID },
      {
        users: [
          ...room.users,
          {
            account: user.account,
            character: user.character,
            handcard: testArray,
            score: 1,
            used : {
              cardid: -1,
              rotate: -1,
              position: [-1, -1],
            }
          },
        ],
      }
    );

    console.log("user publish");
    pubsub.publish(`usersIn${roomID}`, {
      usersInRoom: true,
    });

    return output;
  },

  addRoomToUser: async (parent, { roomID, userAccount }, { RoomModel }) => {
    const user = await AccountModel.findOne({ account: userAccount });

    const room = await RoomModel.findOne({ id: roomID });

    await AccountModel.updateOne(
      { account: user.account },
      { roomnum: roomID }
    );
    return user;
  },

  placeCard: async (parent, { roomID, userNum, id, rotate, pos }, {pubsub}) => {

    const room = await RoomModel.findOne({ id: roomID });

    if(userNum===1){
      console.log("update player 1");
      await RoomModel.updateOne(
      { id: roomID },
      {
        users: [
          {
            account: room.users[0].account,
            character: room.users[0].character,
            handcard: room.users[0].handcard,
            score: room.users[0].score,
            used : {
              cardid: id,
              rotate: rotate,
              position: pos,
            }
          },
          room.users[1],
        ],
      }
      );
    }else if(userNum===2){
      console.log("update player 2");
      await RoomModel.updateOne(
        { id: roomID },
        {
          users: [
            room.users[0],
            {
              account: room.users[1].account,
              character: room.users[1].character,
              handcard: room.users[1].handcard,
              score: room.users[1].score,
              used : {
                cardid: id,
                rotate: rotate,
                position: pos,
              }
            },
          ],
        }
        );
    }

    const new_room = await RoomModel.findOne({ id: roomID });

    //console.log("room", new_room.users);
    let ansarr = [];
    let arr = [[]];
    let score = [];

    if(new_room.users[0].used.cardid > 0 && new_room.users[1].used.cardid > 0){
      //console.log("two player all place card!")
      ansarr = await updateMap(new_room.map, new_room.users[0].used, new_room.users[1].used,
                            new_room.users[0].score, new_room.users[1].score);
      arr = ansarr[0];
      score = [ansarr[1], ansarr[2]];
      //console.log("arrrra", arr);
    }else{
      //console.log("only player",userNum,"place card!")
      return null;
    }

    let row = 23;
    let mapArr = Array(row).fill(0);
    for(let i=0;i<row;i++){
      mapArr[i] = {row: arr[i]}
    }

    await RoomModel.updateOne(
      { id: roomID },
      {
        users: [
          {
            account: new_room.users[0].account,
            character: new_room.users[0].character,
            handcard: new_room.users[0].handcard.filter(x => x !== new_room.users[0].used.cardid),
            score: score[0],
            used : {
              cardid: -1,
              rotate: -1,
              position: [-1, -1],
            }
          },
          {
            account: new_room.users[1].account,
            character: new_room.users[1].character,
            handcard: new_room.users[1].handcard.filter(x => x !== new_room.users[1].used.cardid),
            score: score[1],
            used : {
              cardid: -1,
              rotate: -1,
              position: [-1, -1],
            }
          },
        ],
        map: mapArr,
        turn: (new_room.turn-1),
      }
    );

    const new_room2 = await RoomModel.findOne({ id: roomID });

    if(new_room2.turn === '0'){
      gameOver(roomID);
    }

    //console.log("room publish");
    pubsub.publish(`RoomUp${roomID}`, {
      RoomUpdate: new_room2,
    });

    return new_room2;
  },
};

const updateMap = async(oldMap, used1, used2, score_1, score_2) => {
  let row = 23;
  let column = 11;
  let arr = Array(row).fill(0).map(x => Array(column).fill(0));
  let card1 = await CardModel.findOne({ id: used1.cardid });
  let card2 = await CardModel.findOne({ id: used2.cardid });
  let re1 = decode(card1.shape, used1.rotate, 1);
  let re2 = decode(card2.shape, used2.rotate, 2);
  let arr551 = re1[0];
  let property1 = re1[1];
  let arr552 = re2[0];
  let property2 = re2[1]; 
  let size1 = card1.size;
  let size2 = card2.size;
  let pos1 = used1.position;
  let pos2 = used2.position;
  let score1 = score_1;
  let score2 = score_2;

  for(let i=0;i<row;i++){
    for(let j=0;j<column;j++){
      arr[i][j] = oldMap[i].row[j];
    }
  }

  //console.log(arr);

  for(let i=property1[0];i<=property1[1];i++){
    for(let j=property1[2];j<=property1[3];j++){
      if(arr551[i+2][j+2] === 1){
        arr[pos1[0]+i][pos1[1]+j] = arr551[i+2][j+2]
        score1 += 1;
      }
    }
  }

  if(size1 > size2){
    for(let i=property2[0];i<=property2[1];i++){
      for(let j=property2[2];j<=property2[3];j++){
        if(arr552[i+2][j+2] === 2){
          if(arr[pos2[0]+i][pos2[1]+j] === 1) score1 -= 1;
          arr[pos2[0]+i][pos2[1]+j] = arr552[i+2][j+2]
          score2 += 1;
        }
      }
    }
  }else if(size1 === size2){
    for(let i=property2[0];i<=property2[1];i++){
      for(let j=property2[2];j<=property2[3];j++){
        if(arr552[i+2][j+2] === 2){
          if(arr[pos2[0]+i][pos2[1]+j] === 1){
            arr[pos2[0]+i][pos2[1]+j] = 3;
            score1 -= 1;
          }
          if(arr[pos2[0]+i][pos2[1]+j] === 0){
            arr[pos2[0]+i][pos2[1]+j] = 2;
            score2 += 1;
          }
        } 
      }
    }
  }else if(size1 < size2){
    for(let i=property2[0];i<=property2[1];i++){
      for(let j=property2[2];j<=property2[3];j++){
        if(arr552[i+2][j+2] === 2){
          if(arr552[i+2][j+2] === 2){
            if(arr[pos2[0]+i][pos2[1]+j] === 0){
              arr[pos2[0]+i][pos2[1]+j] = 2;
              score2 += 1;
            }
          } 
        } 
      }
    }
  }
  

  return [arr, score1, score2];
}

const decode = (arr5, rotate, userNum) => {
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
   
  let oldArr = arr55;
  let newArr = Array(5).fill(0).map(x => Array(5).fill(0));
  for(let k=0;k<rotate;k++){
    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
            newArr[i][j] = oldArr[4-j][i];
        }
    }
    oldArr = newArr;
    newArr = Array(5).fill(0).map(x => Array(5).fill(0));
    arr4 = [arr4[2],arr4[3],(-1*arr4[1]),(-1*arr4[0])]
  }
  arr55 = oldArr;

  //console.log("card decode" ,arr55, arr4);

  return [arr55, arr4]
}

const gameOver = (roomID) => {
  console.log("gameOver");
}

export default Mutation;
