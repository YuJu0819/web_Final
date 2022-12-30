import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  id: {
    type: String,
  },
  cards: [
    {
      type: Number,
    },
  ],
  skill: {
    type: String,
  },
});

const CharacterModel = mongoose.model('character', CharacterSchema);

export default CharacterModel;
