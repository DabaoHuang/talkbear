var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var dateformat = require('dateformat');
var prependFile = require('prepend-file');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('io Service started. listening on *:3000');
});

// LOG用
function log(msg) {
  prependFile(__dirname+"/log/msg.txt",msg + '\n', function(err){ if(err) { console.log(err) } }) ;
  // fs.appendFile(__dirname + "/log/msg.txt", msg + '\n', function(err){ if(err) { console.log(err) } }) ;
} // end function log_in

io.on('connection' , function (socket) {

  console.log("A user connected.");

  fs.readFile(__dirname+'/log/msg.txt','utf8',(err , data) => {
    if ( err ) throw err;
    socket.emit('paste',data);
  });

  // io.emit: 廣播給所有包含Server本身的連線使用者
  // socket.broadcast.emit: 廣播給除了Server本身以外的連線使用者

  // NewUserIn: 使用者進房間
  socket.on('userin',function(name) {
      var date = new Date;    
      // socket.username = name;
      let address = socket.handshake.address;
      let output = "<div style='color:#0080ff;'>" + dateformat(date,"yyyy, mm, dS h:MM:ss") + ' ' + name + " 進入了聊天室。.</div>";
      console.log(name + " 進入了聊天室。 " + address);
      io.emit('paste',output);
      /*io.emit('paste',{
          username: socket.username
      });*/
      log(output);
  }); // end socket.on function userin

  // talk: 大廳發話廣播
  socket.on('talk',function(username,msg,msg_color) {
      var date = new Date;
      let address = socket.handshake.address;      
      // show on server
      let output = "<div style='color:"+msg_color+"'>"+ dateformat(date,"yyyy, mm, dS h:MM:ss") + ' ' + username + ' : ' + msg +"</div>";
      console.log(dateformat(date,"yyyy, mm, dS h:MM:ss") + ' ' + username + ' : ' + msg + '  ' + address);
      io.emit('paste',output);
      log(output);
  }); // end socket.on function talk

  // exit: 使用者掰掰
  socket.on('exit',function(name){
      var date = new Date;
      let output = "<div style='color:red;'>" + dateformat(date,"yyyy, mm, dS h:MM:ss") + ' ' + name + " 依依不捨的離開惹 ... </div>";
      console.log(output);
      io.emit('paste', output);
      log(output);
  });

}); // end io.on connection function