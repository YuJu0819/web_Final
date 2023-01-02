import AccountModel from "../models/account";
import CharacterModel from "../models/character";
import bcrypt from "bcrypt";
const saltRound = 10;
const Mutation = {
  createAccount: async (parent, { account, password, name }) => {
    console.log(account);
    const hash = bcrypt.hashSync(password, saltRound);
    let existing = await AccountModel.findOne({ account: account });
    if (existing) {
      console.log(existing.name);
      return null;
    }
    let tmp = await new AccountModel({
      account: account,
      password: hash,
      name: name,
    }).save();
    console.log(tmp);
    return tmp;
  },
  signAccount: async (parent, { account, password }) => {
    let tmp = await AccountModel.findOne({ account: account });
    let same;
    if (tmp) same = bcrypt.compareSync(password, tmp.password);
    console.log(same);
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
    console.log(tmp, user.character);
    let new_room = await new RoomModel({
      id: id,
      users: [
        {
          account: user.account,
          character: user.character,
          handcard: tmp.cards,
          score: user.score,
        },
      ],
      turn: 10,
      timer: 30,
    }).save();
    return new_room;
  },
  addUserToRoom: async (
    parent,
    { roomID, userAccount },
    { RoomModel, CharacterModel }
  ) => {
    const user = await AccountModel.findOne({ account: userAccount });
    const userCard = await CharacterModel.findOne({ id: user.character });

    const room = await RoomModel.findOne({ id: roomID });
    console.log(room, userCard);
    await RoomModel.updateOne(
      { id: roomID },
      {
        users: [
          ...room.users,
          {
            account: user.account,
            character: user.character,
            handcard: userCard.cards,
            score: 0,
          },
        ],
      }
    );
    return room;
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
};

export default Mutation;
