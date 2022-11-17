import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv-defaults";
import http from "http";
import WebSocket from "ws";
import mongo from "./mongo";
import bodyParser from "body-parser";
import wsConnect from "./wsConnect";
dotenv.config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

mongo.connect();
db.once("open", () => {
  console.log("MongoDB connected!");
  wss.on("connection", (ws) => {
    ws.onmessage = wsConnect.onMessage(ws);
  });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("listening");
});
