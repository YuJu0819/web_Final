import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const AccountSchema = new Schema({
  account: {
    type: String,
    required: [true, "Name field is required."],
  },
  password: {
    type: String,
    required: [true, "Body field is required."],
  },
  name: {
    type: String,
    required: [true, "Name field is required."],
  },
  winlose: [
    {
      type: Boolean,
    },
  ],
  character: {
    type: String,
  },
  roomnum: {
    type: Number,
  },
});
// Creating a table within database with the defined schema
const AccountModel = mongoose.model("account", AccountSchema);
// Exporting table for querying and mutating
export default AccountModel;
