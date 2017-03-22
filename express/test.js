/**
 * Created by choiseonho on 2017. 3. 10..
 */
"use strict"

const http = require('http');
const host = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.stateCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('Hello, World!\n');
});

server.listen(port, host, ()=>{
  console.log(`Run at http://${host}:${port}/`);
});

//curl -X GET 0.0.0.0:3000 : 인터넷 안키고 받아오기 자세한 정보는 -v 옵션