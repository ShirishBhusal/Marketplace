var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller')

/* GET product listing. */
router
  .get('/', productController.find)
  .post('/', productController.save);

router.get('/:_id', productController.findById)

router.delete('/:_id', productController.deleteById)
router.delete('/', productController.deleteAll)

router.put('/:_id', productController.save)

module.exports = router;
