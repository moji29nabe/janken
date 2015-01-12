var KEYTABLE = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};
$(function(){
  var socket = io.connect();
  var game = new Game(); //ゲームインスタンスの作成
  socket.on('update',function(worldState){
    game.render(worldState);
  });
  //キーコードがKEYのハッシュに含まれていれば、
  //そのキーの状態をemitする関数
  var sendKey = function(code, status){
    console.log(KEYTABLE[code]);
    if(KEYTABLE[code] !== undefined)
    socket.emit(
      'key', {key:KEYTABLE[code], state: status}
    );
  };
  //キー押し下げ時にキーコードとtrueを送信
  $(window).keydown(function(e){
    sendKey(e.keyCode, true);
  });
  //キー押し上げ時にキーコードとfalseを送信
  $(window).keyup(function(e){
    sendKey(e.keyCode, false);
  });
});
