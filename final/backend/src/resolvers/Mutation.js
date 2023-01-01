import AccountModel from "../models/account";
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
    if (existing) {
      return existing;
    }
    return null;
  },
  selectCharacter: async (
    parent,
    { character, account },
    { CharacterModel }
  ) => {
    let existing = await CharacterModel.findOne({ id: character });
    let tmp = await AccountModel.updateOne(
      { account: account },
      { character: character }
    );
    let output = await AccountModel.findOne({ account: account });
    return output;
  },
};

export default Mutation;
