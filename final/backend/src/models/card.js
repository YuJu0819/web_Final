import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  id: {
    type: Number,
  },
  shape: [
    {
      type: Number,
    },
  ],
  size: {
    type: Number,
  },
});
const CardModel = mongoose.model("card", CardSchema);

export default CardModel;
