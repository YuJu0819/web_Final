import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM

const RoomShema = new Schema({
  id: {
    type: String,
    require: [true, "id required"],
  },
  users: [
    {
      account: { type: String },
      character: { type: String },
      handcard: [{ type: Number }],
      score: { type: Number },
      used: {
        cardid: { type: Number },
        rotate: { type: Number },
        position: [{ type: Number }],
      },
    },
  ],
  turn: {
    type: String,
  },
  map: [
    {
      row: [{ type: Number }],
    },
  ],
  timer: {
    type: Number,
  },
});

const RoomModel = mongoose.model("room", RoomShema);
export default RoomModel;
