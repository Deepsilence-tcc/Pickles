/**
 * Created by tcc on 2017/5/24.
 */
var express = require('express');
var router = express.Router();
var OrderController= require('../controllers/order.controller');

router.post('/create',OrderController.create);
router.post('/list',OrderController.listByUniqueId);

module.exports = router;
