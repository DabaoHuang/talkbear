// node server.js

var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

// console.log(app);

function handler ( res, res ) {
    // 要執行的 socket.io
    fs.readFile(__dirname + '/index.html'),
    function ( err, data ) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    } // end function 
} // end function handler

// LOG用
function log(msg) {
    var date = new DATE;
    fs.appendFile(__dirname + "/log/msg.txt", date + msg + '\n', function(err){ if(err) { console.log(err) } }) ;
} // end function  log_in


// socket.io listen
io.on('connection' , function (socket) {

    // io.emit: 廣播給所有包含Server本身的連線使用者
    // socket.broadcast.emit: 廣播給除了Server本身以外的連線使用者

    // NewUserIn: 使用者進房間
    socket.on('userin',function(name) {
        socket.username = name;
        let address = socket.handshake.address;
        let msg = " New user " + name + " is logged. From " + address + ".";
        console.log(msg);
        io.emit('userin',{
            username: socket.username
        });
        log(msg);
    }); // end socket.on function userin

    // talk: 大廳發話廣播
    socket.on('talk',function(data) {
        // show on server
        let msg = ' ' + data[name] + ' : ' + data[msg];
        console.log(msg);
        io.emit('paste',"<div>"+msg+"</div>");
        log(msg);
    }); // end socket.on function talk

    // exit: 使用者掰掰
    socket.on('exit',function(name){
        console.log(name + 'was quit.');
        io.emit('paste',"<div>" + name + "依依不捨的離開惹 ... </div>");
        log(name + " was quit.");
    });

    // 待開發: 私敲

}); // end io.on connection function