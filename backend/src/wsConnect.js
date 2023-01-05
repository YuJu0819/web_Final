import Account from "./models/account";

const sendLogin = (data, ws) => {
  ws.send(JSON.stringify(data));
};
const sendStatus = (payload, ws) => {
  sendLogin(["status", payload], ws);
};

export default {
  onMessage: (ws) => {
    ws.on("message", async (byteString) => {
      const data = byteString;
      const [task, payload] = JSON.parse(data);
      switch (task) {
        case "signIn": {
          const { email, password } = payload;
          const existing = await Account.find({
            email: email,
            password: password,
          });
          if (existing.length != 0) {
            sendLogin(["logIn", [email]], ws);
            // sendStatus(
            //   {
            //     type: "logIn",
            //     msg: "Login success",
            //   },
            //   ws
            // );
          } else {
            // sendLogin(["logFail", [email]], ws);
            sendStatus(
              {
                type: "logFail",
                msg: "Login Fail",
              },
              ws
            );
          }
          break;
        }
        case "signUp": {
          const { email, password } = payload;
          const account = new Account({ email, password });
          try {
            await account.save();
          } catch {
            throw new Error("Message DB save error: " + e);
          }
          break;
        }
        default:
          break;
      }
    });
  },
};
