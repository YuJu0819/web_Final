const Query = {
  user: async (parent, { account }, { AccountModel }) => {
    let existing = await AccountModel.findOne({ account: account });
    if (existing) {
      return existing;
    }
    return null;
  },
};

export default Query;
