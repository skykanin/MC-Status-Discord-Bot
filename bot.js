const Discord = require('discord.js');
const client = new Discord.Client();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function commandIs(str, msg){
	return msg.content.toLowerCase().startsWith("!" + str);
}

function status(callback) {
	var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://mcapi.us/server/status?ip=46.9.14.223', true);
      ourRequest.onload = () => {
		var ourData = JSON.parse(ourRequest.responseText);
		callback(null, checkStatus(ourData));
    };
	ourRequest.onerror = function() {
  		console.error(ourRequest.statusText);
	};
    ourRequest.send();
}

function checkStatus(data){
	if(data.online){
		return "The MC server is online, players currently online: " + data.players.now + " /" + data.players.max;
	} else {
		return "server offline";
	}
}

client.on('ready', () => {
	console.log('The bot in online');
});

client.on('message', message => {
	var args = message.content.split(/[ ]+/);
	var sup = "default";
	if(commandIs("hello", message)){
		message.reply('Hello there');
	}
	if(commandIs("youtube", message)){
		if(args.length === 1){
			message.channel.sendMessage('You did not define an argument variable. Usage: `!youtube [episode number]`');
		} else if (args.length === 2){
			message.channel.sendMessage('Hello Youtube, this is episode ' + args[1]);
		} else {
			message.channel.sendMessage('You defined too many arguments. Usage: `!youtube [episode number]`');
		}
	}
	if(commandIs("status", message)){
		status((error, result) => {
  			if (error) {
    			message.channel.sendMessage("error!");
    			return;
  			}
  		message.channel.sendMessage(result);
		});
	}
});

client.login('Mjc5OTQ5NjI2NzY3ODM1MTM3.C4DifA.cWQ1bJHzzWfgtry_kZ09PujyreE');
