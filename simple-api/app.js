"use strict"

const Express = require('express');
const Logger = require('morgan');
const BodyParser = require('body-parser');

const port = 3000;
const app = Express();

app.use(Logger('dev'));
app.use(BodyParser.json()); //json 형태를 사용하겠다
app.use(BodyParser.urlencoded({extended: false})); //콜론이나 샵을 특수기호로 인코딩해주는 라이브러리 , 확장이 아닌 디폴트 라서 false
app.use('/api/accounts', require('./api/accounts')); // 해당 URI에 매칭

app.listen(port, () => console.log(`Run at localhost:${port}`));