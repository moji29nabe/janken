var Player = function(id){
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.keys = {
    up : false,
    down : false,
    right : false,
    left : false
  };
  this.te = null;
  this.result = null;
};

Player.prototype = {
  updateKey: function(key, status){
    this.keys[key] = status;
  },
  updateTe: function(te){
    this.te = te;
  },
  move: function(){
    if(this.keys.right) this.x++;
    if(this.keys.left) this.x--;
    if(this.keys.up) this.y--;
    if(this.keys.down) this.y++;
  }
};

module.exports = Player;
