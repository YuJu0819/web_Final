import AccountModel from "../models/account";

const Mutation = {
  createAccount: async (parent, { account, password, name }) => {
    console.log(account);
    let existing = await AccountModel.findOne({ account: account });
    if (existing) {
      console.log(existing.name);
      return null;
    }
    let tmp = await new AccountModel({
      account: account,
      password: password,
      name: name,
    }).save();
    console.log(tmp);
    return tmp;
  },
  signAccount: async (parent, { account, password }) => {
    let existing = await AccountModel.findOne({
      $and: [{ account: account }, { password: password }],
    });
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
