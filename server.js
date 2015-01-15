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
  var i = 0;
//  var tasks = [];
//  tasks.push(setTimeout(function(next) {
//    socket.broadcast.emit('call', 'jan');
//    next();
//  }, 1000/0.5));
//  tasks.push(setTimeout(function(next) {
//    socket.broadcast.emit('call', ' ken');
//    next();
//  }, 1000/0.5));
//  tasks.push(setTimeout(function(next) {
//    socket.broadcast.emit('call', ' ... ');
//    next();
//  }, 1000/0.5));
//  tasks.push(setTimeout(function(next) {
//    socket.broadcast.emit('call', ' pon! ');
//    next();
//  }, 1000/0.5));
//  async.series(tasks);
  var words = ['じゃん', 'けん', 'ぽん!'];
  setInterval(function(){
    console.log(words[i]);
    socket.broadcast.emit('call', ' ' + words[i]);
    if (i < words.length - 1) { i++; }
    else {i = 0;}
  }, 1000/0.5);
});

//メインループの開始
world.start(function(worldState){
  io.sockets.emit('update', worldState);
});
