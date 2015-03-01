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
  //プレイヤーを追加
  Object.keys(world.players).forEach(function(id){
    io.sockets.emit('new_player', world.players[id].id);
  });
  socket.on('disconnect', function(){
    console.log('disconnect ' + socket.id);
    world.logout(socket.id);
    io.sockets.emit('leave_player', socket.id);
  });
  socket.on('key', function(data){
    player.updateKey(data.key, data.state);
  });
  socket.on('start', function(){
    //メインループの開始
    //world.init();
    world.done = false;
    world.start(function(worldState){
      //io.sockets.emit('update', worldState);
      console.log(worldState);
      if(!worldState.done) {
        //じゃんけんポンの掛け声
        io.sockets.emit('call', worldState);
      } else {
        //じゃんけんの結果
        io.sockets.emit('result', worldState.players);
        
      }
    });
  });
  socket.on('te', function(te) {
    console.log(te);
    player.updateTe(te);
  });
});


