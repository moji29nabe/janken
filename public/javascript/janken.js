$(function(){
  var socket = io.connect();
  var sendTe = function(te){
    socket.emit(
      'te', te
    );
  };
  $('#gu').click(function() {
    sendTe('gu');
  });
  socket.on('call',function(msg_obj){
    $('#call').text(msg_obj.msg);
  })
});