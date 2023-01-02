const Query = {
  user: async (parent, { account }, { AccountModel }) => {
    let existing = await AccountModel.findOne({ account: account });
    if (existing) {
      return existing;
    }
    return null;
  },
  cards: async (parent, { character }, { CharacterModel }) => {
    const existing = await CharacterModel.findOne({ id: character });
    if (existing) return existing.cards;
    return null;
  },
  skill: async (parent, { character }, { CharacterModel }) => {
    const existing = await CharacterModel.findOne({ id: character });
    if (existing) return existing.skill;
    return null;
  },
  room: async (parent, { id }, { RoomModel }) => {
    const existing = await RoomModel.findOne({ id: id });
    if (existing) return existing;
    return null;
  },
};

export default Query;
