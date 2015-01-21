var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var async = require('async');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var World = require('./world');
var world = new World();
io.on('connection', function(socket){
  var player = world.login(socket.id);
  socket.on('disconnect', function(){
    console.log('disconnect');
    world.logout(socket.id);
  });
  socket.on('key', function(data){
    player.updateKey(data.key, data.state);
  });
  socket.on('te', function(te) {
    console.log(te);
  });
});

//メインループの開始
world.start(function(worldState){
  //io.sockets.emit('update', worldState);
  console.log(worldState);
  io.sockets.emit('call', worldState);
});
