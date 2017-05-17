/**
 * Created by cong on 2017/4/26.
 */
var mongoose = require('mongoose');
var config = require('./config.js');

module.exports = function() {
    var db = mongoose.connect(config.mongodb);
    require('../models/dictionary.model');
    require('../models/authority.model');
    require('../models/user.model');
    require('../models/source.detail.model');
    require('../models/movie.type.model.js');
    require('../models/movie.model');
    return db;
};