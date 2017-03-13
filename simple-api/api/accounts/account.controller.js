/**
 * Created by choiseonho on 2017. 3. 10..
 */
const HttpStatus = require('http-status-codes');

let accounts = [
  {id: 1, name: 'sunho'},
  {id: 2, name: 'sungweon'},
  {id: 3, name: 'who'}
];


const register = (req, res) => {
  if (!req.body.name) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }

  const account = {id: accounts.length + 1, name: req.body.name};
  accounts.push(account);
  res.status(HttpStatus.CREATED).json(account);
};

const findAll = (req, res) => res.json(accounts); // 해당하는 정보를 제이슨으로 받는다

const findOne = (req, res) => {
  const id = parseInt(req.params.id); // id는 string 형태로 들어오기때문에 Int로 전환
  const account = accounts.filter(acc => acc.id === id)[0]; //accounts.filter는 주소에 입력한 id와 acc의 id와 비교해서 찾은 것중 첫 번째 것을 선택

  if (!account) {
    return res.status(HttpStatus.NOT_FOUND).end(); // 404 -> NOT_FOUND
  }
  // res.json(accounts);
  res.status(HttpStatus.OK).json(account);
};

const update = (req, res) => {
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
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  if (accounts.filter(acc => acc.id === id)[0]) {
    accounts.splice(id - 1, 1); // 배열은 0 부터 시작하기 때문에 -1, ( 시작지점<=, 끝지점 <, 데이터 ) 데이터가 없으면 null로써 지워진다
    //원래는 지우고 다시 비교를 해야한다.
    return res.status(HttpStatus.NO_CONTENT).end();
  }
  res.status(HttpStatus.BAD_REQUEST).end();
};

module.exports = {findAll , findOne, update, remove, register};