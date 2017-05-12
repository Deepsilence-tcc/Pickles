/**
 * Created by cong on 2017/5/4.
 */
var express = require('express');
var router = express.Router();
var MovieTypeController = require('../controllers/movie.type.controller');
var $movieMiddleware = require('../middlewres/movie.show.middleware');
var $userCheckMiddleware = require('../middlewres/user.check.middleware');


router.get('/list',MovieTypeController.listAllType);
router.post('/persort',[$userCheckMiddleware],MovieTypeController.listByType);

module.exports = router;