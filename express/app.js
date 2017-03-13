/**
 * Created by choiseonho on 2017. 3. 10..
 */
const Express = require('express');
const port = 3000;

const app = Express();

app.get('/', (req, res) => {
  res.send('Hello, Express!\n');
});

app.listen(port, () => console.log(`Run at http://localhost:${port}`));