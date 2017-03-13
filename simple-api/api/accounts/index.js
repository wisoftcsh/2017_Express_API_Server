const router = require('express').Router();
const controller = require('./account.controller');

router.post('/', controller.register); //(주소, 함수포인터)
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);

module.exports = router;