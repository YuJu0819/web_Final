const client = new WebSocket("ws://localhost:4000");

const sendData = async (data) => {
  if (client.readyState >= 1) {
    console.log("in send");
    await client.send(JSON.stringify(data));
  }
};

const sendAccount = (payload) => {
  // update messages and status
  sendData(["input", payload]);

  console.log(payload);
};
