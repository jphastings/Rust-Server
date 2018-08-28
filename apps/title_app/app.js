#!/usr/bin/env node



var request = require('request');

	var serverHostname = 'localhost';
	var serverPort = process.env.RUST_RCON_PORT;
	var serverPassword = process.env.RUST_RCON_PASSWORD;
   var servername = process.env.NAME;
   var wipedate = process.env.WIPED_TITLE;

  var WebSocket = require('ws');
	
console.log(servername + wipedate);



setTimeout(function()
{
   var ws = new WebSocket("ws://" + serverHostname + ":" + serverPort + "/" + serverPassword);
	ws.on('open', function open()
	{
		setTimeout(function()
		{
			ws.send(createPacket("server.hostname " + servername + wipedate));
        setTimeout(function()
			 {
				 ws.close(1000);
	      }, 1000 * 2);
		}, 1000);
	});
}, 1000 * 60 * 10);



 function createPacket(command)
 {
	 var packet =
	{
		Identifier: -1,
	  Message: command,
    Name: "WebRcon"
	 };
	 return JSON.stringify(packet);
 }

