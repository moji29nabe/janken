var Player = function(id){
  this.id = id;
  this.te = null;
  this.result = null;
};

Player.prototype = {
  updateTe: function(te){
    this.te = te;
  }
};

module.exports = Player;
