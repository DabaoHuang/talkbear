# talkbear - 說說熊聊天室 Ver.0.3

一個試著用 Socket.io, Node.js, bootstrap 4, jQuery 打造的多人聊天室

## Setup - Node.js
yum install node

## Setup
 - npm install --save express@4.15.2
 - npm install --save socket.io
 - npm install --save dateformat
 - npm install --save prepend-file

## START - server.js
node server.js

## Sign in
http://locahost:3000


### Ver.0.1
 - 基本功能建置

### Ver.0.2
 - index.js : 'msg.txt' appendFile => preppendFile
 - 多使用 npm 套件 prepend-file
 - 登入後自動載入先前的聊天記錄

### Ver.0.3
 - 新增進入聊天室的歡迎字詞
 - 新增離開聊天室的通知

# Features
 - 私密聊天
 - 重新配色
 - LOGO
 - 進入聊天室後，自動載入前面的歷史訊息