import dotenv from "dotenv-defaults";
import mongo from "./mongo";
import server from "./server";
import { v4 as uuidv4 } from "uuid";
mongo.connect();
const port = process.env.PORT || 5001;
server.listen({ port }, () => {
  console.log(`Listening on http://localhost:${port}`);
});
