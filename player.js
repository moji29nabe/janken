var Player = function(id){
  this.id = id;
  this.te = null;
  this.result = null;
  this.times = {
    win: 0,
    lose: 0
  };
};

Player.prototype = {
  updateTe: function(te){
    this.te = te;
  }
};

module.exports = Player;
