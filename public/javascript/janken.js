$(function(){
  var my_id;
  var player_ids = [];
  var socket = io.connect();
  var sendTe = function(te){
    socket.emit(
      'te', te
    );
  };
  var changeBgColor = function(obj){
    $("input[type='button']").css("background-color", "");
    $("input[type='button']").css("border-color", "");
    obj.css("background-color", "#2864f0");
    obj.css("border-color", "#2864f0");
  }
  var radius = function(arr) {
    var r = 100;
    if (2 < arr.length) {
      return r + arr.length * 10;
    }
    return r;
  };
  var stand_in_a_circle = function() {
    var map = new MoonMap('#new_players', {
      moonSelector: '.moonSelector',
      radius: radius(player_ids),
      startAngle: 180
    });
    player_ids.forEach(function(player_id) {
      var idstr = '#' + player_id;
      // console.log($(idstr).closest('.moon').css("left"))
      var left = $(idstr).closest('.moon').css("left");
      left = parseInt(left, 10);

      var childstr = idstr + ' .other';
      if (0 < left) {
        $(childstr).addClass("seeleft");
      } else {
        $(childstr).removeClass("seeleft");
      }
    });
  };
  $('#start').click(function() {
    socket.emit('start');
  });
  $('#gu').click(function() {
    sendTe('gu');
    changeBgColor($('#gu'));
//    $('#gu').css("background-color", "#2864f0");
//    $('#gu').css("border-color", "#2864f0");
  });
  $('#cho').click(function() {
    sendTe('cho');
    changeBgColor($('#cho'));
  });
  $('#pa').click(function() {
    sendTe('pa');
    changeBgColor($('#pa'));
  });
  socket.on('me', function(id) {
    my_id = id;
    player_ids.push(id);
    $('#new_players').after("<span id=\"" + id + "\" class=\"qs moonSelector\"><span class=\"char me\"></span><span class=\"call popover above\"></span></span>");
    stand_in_a_circle();
  });
  socket.on('new_player',function(id){
    // player がクライアント側に存在しなければ追加
    if (-1 === player_ids.indexOf(id)) {
      player_ids.push(id);
      $('#new_players').after("<span id=\"" + id + "\" class=\"qs moonSelector\"><span class=\"char other\"></span><span class=\"call popover above\"></span></span>");
      stand_in_a_circle();
    }
  });
  socket.on('leave_player',function(id){
    var leave_player = '#' + id;
    $(leave_player).remove();
    var idx = player_ids.indexOf(id);
    player_ids.splice(idx, 1);
    stand_in_a_circle();
  });
  socket.on('call',function(msg_obj){
    $('.call').text(msg_obj.msg);
    console.log('=======');
    console.log(socket);
    //console.log(msg_obj);
    console.log('=======end');
    if (msg_obj.msg === 'せーの') {
      $('.char').css('background-position', '0px 0px');
    }
    if (msg_obj.msg === 'けん') {
      $('.char').css('background-position', '-64px 0px');
    }
    if (msg_obj.msg === 'ぽん!') {
      $('.char').css('background-position', '-32px 0px');
    }
  });
  socket.on('result',function(players){
    // TODO player オブジェクトが (players[(uuid?)].idのように) ややこしいので、要リファクタ
    // players.id のように、id はもう一つ親の階層の方が良い気がする
    Object.keys(players).forEach(function(id) {
      var player_id = '#' + players[id].id;
      $(player_id).children('.call').text(players[id].result);
      if (players[id].result === '負け。') {
        $(player_id).children('.char').css('background-position', '-96px 0px');
      }
    });
  })
});

