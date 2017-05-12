/**
 * Created by cong on 2017/4/27.
 */
var express = require('express');
var router = express.Router();
var MovieController = require('../controllers/movie.controller');
var $movieMiddleware = require('../middlewres/movie.show.middleware');
var $userCheckMiddleware = require('../middlewres/user.check.middleware');
var $movieWatchMidddleware =  require('../middlewres/movie.watch.middleware');
var $movieWatchUpperMidddleware =  require('../middlewres/movie.watch.upper.middleware');
var $movieWatchRoomMidddleware =  require('../middlewres/movie.watch.room.middleware');
var $movieWatchSearchMidddleware =  require('../middlewres/movie.watch.search.middleware');

//第一个tab
router.post('/common',[$userCheckMiddleware,$movieMiddleware],MovieController.listByCommon);
//第二个tab
router.post('/upper',[$userCheckMiddleware,$movieMiddleware],MovieController.listByUpper);
//房间视频
router.post('/room',[$userCheckMiddleware,$movieMiddleware],MovieController.listByRoom);
//同城交友
router.post('/friend',[$userCheckMiddleware,$movieMiddleware],MovieController.listByFriend);
//搜索视频
router.post('/search',[$userCheckMiddleware,$movieMiddleware],MovieController.listBySearch);
//查看信息
router.get('/message',MovieController.sendMsgToUser);

//观看视频，更新该视频观看次数，并且更新该用户观看权限
router.post('/watch',[$userCheckMiddleware,$movieWatchMidddleware,$movieWatchUpperMidddleware,$movieWatchRoomMidddleware,$movieWatchSearchMidddleware],MovieController.watchMovie);

module.exports = router;
