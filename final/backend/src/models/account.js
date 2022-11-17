import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const AccountSchema = new Schema({
  email: {
    type: String,
    required: [true, "Name field is required."],
  },
  password: {
    type: String,
    required: [true, "Body field is required."],
  },
});
// Creating a table within database with the defined schema
const Account = mongoose.model("account", AccountSchema);
// Exporting table for querying and mutating
export default Account;
