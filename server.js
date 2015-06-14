var log4js = require('log4js');
log4js.configure('log4js_config.json');
var logger = log4js.getLogger('cheese');

var express = require('express');
var app = express();
app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(3000, function(){
  logger.info('listening on *:3000');
});

var World = require('./world');
var world = new World();
io.on('connection', function(socket){
  var player = world.login(socket.id);
  //プレイヤーを追加
  io.to(player.id).json.emit('me', player.id);
  Object.keys(world.players).forEach(function(id){
    io.sockets.emit('new_player', world.players[id].id);
  });
  socket.on('disconnect', function(){
    logger.info('disconnect ' + socket.id);
    world.logout(socket.id);
    io.sockets.emit('leave_player', socket.id);
  });
  socket.on('start', function(){
    //メインループの開始
    //world.init();
    world.done = false;
    world.start(function(worldState){
      logger.info(worldState);
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
    logger.trace(te);
    player.updateTe(te);
  });
});
