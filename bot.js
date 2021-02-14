const Discord = require("discord.js");
const fs = require("fs");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const client = new Discord.Client();

const commandIs = (str, msg) => msg.content.toLowerCase().startsWith("!" + str);

const status = (callback, ip) => {
  const ourRequest = new XMLHttpRequest();
  ourRequest.open("GET", "https://mcapi.us/server/status?ip=" + ip, true);
  ourRequest.onload = () => {
    const ourData = JSON.parse(ourRequest.responseText);
    callback(null, checkStatus(ourData));
  };
  ourRequest.onerror = () => console.error(ourRequest.statusText);
  ourRequest.send();
};

const checkStatus = (data) =>
  data.online
    ? `The MC server is online, players currently online: ${data.players.now}/${data.players.max}`
    : "server offline";

client.on("ready", () => {
  console.log("The bot in online");
});

client.on("message", (message) => {
  const args = message.content.split(/[ ]+/);

  // Simple ping pong
  if (commandIs("hello", message)) {
    message.reply("Hello there");
  }

  // Responds with the server status and current amount of online players
  if (commandIs("status", message)) {
    switch (args.length) {
      case 1:
        message.channel.send(
          "You did not define an argument variable. Usage: `!status [ip]`"
        );
        break;
      case 2:
        status((error, result) => {
          if (error) {
            message.channel.send("error!");
            return;
          }
          message.channel.send(result);
        }, args[1]);
        break;
      default:
        message.channel.send(
          "You defined too many arguments. Usage: `!status [ip]`"
        );
    }
  }
});

// parse the client token from the json file
let rawdata = fs.readFileSync("key.json");
let key = JSON.parse(rawdata);

client.login(key.token);
