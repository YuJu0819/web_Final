import AccountModel from "../models/account";

const Mutation = {
  createAccount: async (parent, { account, password }) => {
    console.log(account);
    let existing = await AccountModel.findOne({ account: account });
    if (existing) return existing;
    let tmp = await new AccountModel({
      account: account,
      password: password,
    }).save();
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
};

export default Mutation;
