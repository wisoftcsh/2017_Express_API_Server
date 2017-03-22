"use strict"

const Express = require('express');
const Logger = require('morgan');
const BodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const port = 3000;
const app = Express();

app.use(Logger('dev'));
app.use(BodyParser.json()); //json 형태를 사용하겠다
app.use(BodyParser.urlencoded({extended: false})); //콜론이나 샵을 특수기호로 인코딩해주는 라이브러리 , 확장이 아닌 디폴트 라서 false

let accounts = [
  {id: 1, name: 'sunho'},
  {id: 2, name: 'sungweon'},
  {id: 3, name: 'who'}
];

app.get('/', (req, res) => {
  res.json(accounts)
});

app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id); // id는 string 형태로 들어오기때문에 Int로 전환
  const account = accounts.filter(acc => acc.id === id)[0]; //accounts.filter는 주소에 입력한 id와 acc의 id와 비교해서 찾은 것중 첫 번째 것을 선택

  if (!account) {
    return res.status(HttpStatus.NOT_FOUND).end(); // 404 -> NOT_FOUND
  }
  // res.json(accounts);
  res.status(HttpStatus.OK).json(account);
});

app.post('/', (req, res) => {
  if (!req.body.name) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }

  const account = {id: accounts.length + 1, name: req.body.name};
  accounts.push(account);
  res.status(HttpStatus.CREATED).json(account);
});

app.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  if (accounts.filter(acc => acc.id === id)[0]) {
    accounts.splice(id - 1, 1); // 배열은 0 부터 시작하기 때문에 -1, ( 시작지점<=, 끝지점 <, 데이터 ) 데이터가 없으면 null로써 지워진다
    //원래는 지우고 다시 비교를 해야한다.
    return res.status(HttpStatus.NO_CONTENT).end();
  }
  res.status(HttpStatus.BAD_REQUEST).end();
});

app.put('/:id', (req, res) => {
  if (!req.body.name) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }

  const id = parseInt(req.params.id);
  const account = accounts.filter(acc => acc.id === id)[0];
  if (!account) {
    return res.status(HttpStatus.NOT_FOUND).end();
  }

  account.name = req.body.name; // 주소의 개념 51줄에서 해당 배열을 찾았다.
  res.status(HttpStatus.OK).json(account);
});

app.listen(port, () => console.log(`Run at localhost:${port}`));