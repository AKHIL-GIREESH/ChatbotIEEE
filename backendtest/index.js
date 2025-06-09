const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const readline = require("readline/promises");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
let history = [];

const main = async () => {
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: history,
  });

  while (1) {
    const message = await rl.question("User: ");

    if (message === "bye") {
      rl.close();
      break;
    }

    const response = await chat.sendMessage({
      message: message,
    });

    console.log("System: ", response);
  }
};

main();
