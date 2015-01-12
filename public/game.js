window.Game = function(){
  var canvas = document.getElementById('canvas');
  canvas.width = 400;
  canvas.height = 300;
  this.ctx = canvas.getContext('2d');
};
Game.prototype = {
  // x, y を中心に半径10ピクセルの円を描く
  _drawCircle: function(x,y){
    this.ctx.beginPath();
    this.ctx.arc(x, y, 10, 0, Math.PI*2); //x, y, size, start, end
    this.ctx.fillStyle = 'rgb(255,0,0)';
    this.ctx.fill();
  },
  render: function(data, player_id){
    //矩形の領域のリセット
    this.ctx.clearRect(0,0,400,300); //矩形領域の初期化
    this.ctx.save();
    //それぞれのオブジェクトをレンダリング
    for(var i in data.players){
      var object = data.players[i]
      this._drawCircle(object.x, object.y);
    };
    this.ctx.restore();
  }
};
