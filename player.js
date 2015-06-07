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
  }
};

module.exports = Player;
