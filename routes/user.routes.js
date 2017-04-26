/**
 * Created by cong on 2017/4/26.
 */
var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user.controller');

router.post('/create',UserController.create);
router.get('/info',UserController.getInfoById);
router.get('/update',UserController.updateInfo);

module.exports = router;
