var Player = require('./player');
var World = function(){
  this.players = {};
  this.FPS = 0.5; //毎秒何回更新するか
  this.done = false; //じゃんけんの結果を返せる状態か否か
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
  init: function(){
    var self = this;
    var players = Object.keys(self.players);
    players.forEach(function(id){
      self.players[id].te = null;
    });
    self.done = false;
  },
  //メインループ開始のエントリポイント
  start: function(callback){
    var self = this;
    var i = 0;
    var words = ['せーの', 'じゃん', 'けん', 'ぽん!'];
    //メインループ
    self.msg = words[i];
    callback(self);
    i++;
    var interval_id = setInterval(function(){
      //ここにメインループのロジックを書く
//    for(var id in self.players)
//    //全てのプレイヤーの座標を更新
//    self.players[id].move();
      if (i < words.length) {
        console.log(words[i]);
        self.msg = words[i];
        callback(self);
        i++;
      } else {
        clearInterval(interval_id);
        self.judge();
        self.done = true;
        callback(self);
      }
      
    }, 1000/this.FPS);
  },
  judge: function(){
    console.log('===== judge =====')
    var self = this;
    // プレイヤーが出した手の種類
    var te_types = [];
    var players = Object.keys(self.players);
    players.forEach(function(id){
      var te = self.players[id].te;
      console.log(te);
      // 手の種類を確認。
      // 1, 3種類ならあいこ
      // 2種類なら勝敗がある
      if (te &&
          (te_types.length === 0 ||
           te_types.indexOf(te) === -1)) {
        te_types.push(te);
      }
    });
    if (te_types.length !== 2) {
      players.forEach(function(id){
          self.players[id].result = 'あいこ';
      });
    } else {
      // 勝負判定
      self.msg = '勝敗判定';
      var winner_te = null;
      var is_gu  = te_types.indexOf('gu');
      var is_cho = te_types.indexOf('cho');
      var is_pa  = te_types.indexOf('pa');
      if (is_gu !== -1 && is_cho !== -1) {
        winner_te = 'gu';
      } else if (is_cho !== -1 && is_pa !== -1) {
        winner_te = 'cho';
      } else {
        winner_te = 'pa';
      }
      players.forEach(function(id){
        var te = self.players[id].te;
        if (winner_te === te) {
          self.players[id].result = '勝ち！';
        } else {
          self.players[id].result = '負け。';
        }
      });
    }
  }
};

module.exports = World;
