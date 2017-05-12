/**
 * Created by cong on 2017/4/26.
 */
var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user.controller');
var $userCheckMiddleware = require('../middlewres/user.check.middleware');
var $userCreateMiddleware = require('../middlewres/user.create.middleware');

//用户创建
router.post('/create',$userCreateMiddleware,UserController.create);

//获取用户信息
router.get('/info',UserController.getInfoById);

//充值完成之后，升级用户等级
router.post('/update',$userCheckMiddleware,UserController.updateInfo);

module.exports = router;
