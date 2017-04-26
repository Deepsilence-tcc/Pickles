/**
 * Created by cong on 2017/4/26.
 */
var mongoose = require('mongoose');
var config = require('./config.js');

module.exports = function() {
    var db = mongoose.connect(config.mongodb);
    require('../models/user.model');
    require('../models/dictionary.model');
    require('../models/member.model');
    return db;
};