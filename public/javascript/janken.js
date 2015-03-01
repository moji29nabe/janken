$(function(){
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
  socket.on('new_player',function(id){
    // player がクライアント側に存在しなければ追加
    if (-1 === player_ids.indexOf(id)) {
      player_ids.push(id);
      $('#new_players').append("<span id=\"" + id + "\" class=\"qs\"><span class=\"call popover above\"></span></span>");
    }
  });
  socket.on('leave_player',function(id){
    var leave_player = '#' + id;
    $(leave_player).remove();
    var idx = player_ids.indexOf(id);
    player_ids.splice(idx, 1);
  });
  socket.on('call',function(msg_obj){
    $('.call').text(msg_obj.msg);
    console.log('=======');
    console.log(socket);
    //console.log(msg_obj);
    console.log('=======end');
    if (msg_obj.msg === 'せーの') {
      $('.qs').css('background-position', '0px 0px');
    }
    if (msg_obj.msg === 'けん') {
      $('.qs').css('background-position', '-64px 0px');
    }
    if (msg_obj.msg === 'ぽん!') {
      $('.qs').css('background-position', '-32px 0px');
    }
  });
  socket.on('result',function(msg_obj){
    console.log('=======');
    console.log(socket);
    console.log(msg_obj);
    console.log('=======end');
    $('#call').text(msg_obj.result);
    if (msg_obj.result === '負け。') {
      $('.qs').css('background-position', '-96px 0px');
    }
  })
});