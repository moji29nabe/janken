var Player = require('./player');
var World = function(){
  this.players = {};
  this.FPS = 0.5; //毎秒何回更新するか
};
World.prototype = {
  // playersに登録し、ログインしたユーザのインスタンスを返す
  login: function(id){
    var player = new Player(id);
    this.players[id] = player;
    return player;
  },
  //playersから削除
  logout: function(id){
    delete this.players[id];
  },
  //メインループ開始のエントリポイント
  start: function(callback){
    var self = this;
    var i = 0;
    var words = ['じゃん', 'けん', 'ぽん!'];
    //メインループ
    setInterval(function(){
      //ここにメインループのロジックを書く
//    for(var id in self.players)
//    //全てのプレイヤーの座標を更新
//    self.players[id].move();
      console.log(words[i]);
      if (i < words.length - 1) { i++; }
      else {i = 0;}
      self.msg = words[i];
      callback(self);
    }, 1000/this.FPS);
  }
};

module.exports = World;
