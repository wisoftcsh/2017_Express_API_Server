/**
 * Created by choiseonho on 2017. 3. 10..
 */
const HttpStatus = require('http-status-codes');
//DB 연동
const MySQL = require('mysql');
const MySQLConfig = require('../../config/mysql');
const connection = MySQL.createConnection(MySQLConfig);

// let accounts = [
//   {id: 1, name: 'sunho'},
//   {id: 2, name: 'sungweon'},
//   {id: 3, name: 'who'}
// ];


const register = (req, res) => {
  if (!req.body.name) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  connection.query('insert into account(name) values (?)', req.body.name, (err, result) => {
    if (err){
      connection.end();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }

    const resultRows = result.affectedRows; //영향을 받은 Row 들
    if(resultRows === 0){ // row가 영향이 없으면
      connection.end();
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }

    connection.end();
    res.status(HttpStatus.CREATED).json(result);
  });
  // const account = {id: accounts.length + 1, name: req.body.name};
  // accounts.push(account);
  // res.status(HttpStatus.CREATED).json(account);
};

const findAll = (req, res) => {
  // res.json(accounts);// 해당하는 정보를 제이슨으로 받는다
  connection.query('select * from account', (err, result) => {
    if (err) {
      connection.end();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    connection.end();
    res.status(HttpStatus.OK).json(result);
  });
}

const findOne = (req, res) => {
  const id = parseInt(req.params.id); // id는 string 형태로 들어오기때문에 Int로 전환
  connection.query('select * from account where id = ' + id, (err, result) => {
    if (err) {
      connection.end();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    connection.end();
    res.status(HttpStatus.OK).json(result);
  });

  // const account = accounts.filter(acc => acc.id === id)[0]; //accounts.filter는 주소에 입력한 id와 acc의 id와 비교해서 찾은 것중 첫 번째 것을 선택
  // if (!account) {
  //   return res.status(HttpStatus.NOT_FOUND).end(); // 404 -> NOT_FOUND
  // }
  // res.json(accounts);
  // res.status(HttpStatus.OK).json(account);
};

const update = (req, res) => {
  if (!req.body.name) {
    connection.end();
    return res.status(HttpStatus.BAD_REQUEST).end();
  }

  const id = parseInt(req.params.id);
  connection.query('update account set name = ? where id = '+ id, req.body.name, (err, result) => { // id 값은 req.body.name을 받아와서 설정해야 해킹의 위험이 없다
    if (err) {
      connection.end();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    const resultRows = result.affectedRows; //영향을 받은 Row 들
    if(resultRows === 0){ // row가 영향이 없으면
      connection.end();
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    connection.end();
    res.status(HttpStatus.OK).json(result);
  });

  // const account = accounts.filter(acc => acc.id === id)[0];
  // if (!account) {
  //   return res.status(HttpStatus.NOT_FOUND).end();
  // }
  //
  // account.name = req.body.name; // 주소의 개념 51줄에서 해당 배열을 찾았다.
  // res.status(HttpStatus.OK).json(account);
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  connection.query('delete from account where id = '+ id, req.body.name, (err, result) => { // id 값은 req.body.name을 받아와서 설정해야 해킹의 위험이 없다
    if (err) {
      connection.end();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    const resultRows = result.affectedRows; //영향을 받은 Row 들
    if(resultRows === 0){ // row가 영향이 없으면
      connection.end();
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    connection.end();
    res.status(HttpStatus.NO_CONTENT).json(result);
  });

  // if (accounts.filter(acc => acc.id === id)[0]) {
  //   accounts.splice(id - 1, 1); // 배열은 0 부터 시작하기 때문에 -1, ( 시작지점<=, 끝지점 <, 데이터 ) 데이터가 없으면 null로써 지워진다
  //   //원래는 지우고 다시 비교를 해야한다.
  //   return res.status(HttpStatus.NO_CONTENT).end();
  // }
  // res.status(HttpStatus.BAD_REQUEST).end();
};

module.exports = {findAll , findOne, update, remove, register};