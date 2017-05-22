/**
 * Created by cong on 2017/5/2.
 */
var mongoose = require('mongoose');
var async = require('async');
var ResultModel = require('../utils/resultmodel');
var CodeMessage = require('../utils/codemessage');
var Authority = mongoose.model('Authoritys');
var Movie = mongoose.model('Movies');
var SourceDetail = mongoose.model('SourceDetail');


module.exports = function (req,res,next) {
    var tab = parseInt(req.body.tab);
    var movieId = req.body.movieId;
    var resultMode = new ResultModel();
    if(tab<1||tab>5||movieId==undefined){
        resultMode.code =5;
        resultMode.msg = CodeMessage.MSG_5;
        return res.json(resultMode);
    }
    if(tab==1){
        async.waterfall([
            function (callback) {
                Authority.findById({
                    _id: req.authorityId
                }).exec(function (err, doc) {
                    if (err) return next(err);
                    if (doc.firstCount <= 0) {
                        resultMode.code = 7;
                        resultMode.msg = CodeMessage.MSG_7;
                        return res.json(resultMode)
                    } else {
                        callback(null,doc);
                    }
                })
            },
            function (doc,callback) {
                Authority.findByIdAndUpdate({_id: req.authorityId}, {'$inc':{'firstCount':-1}}, function (err) {
                    if (err) return next(err);
                    Movie.findById({
                        _id: movieId
                    }).exec(function (err, movie) {
                        if (movie.length < 0 || movie._id == null) {
                            resultMode.code = 5;
                            resultMode.msg = CodeMessage.MSG_5;
                            return res.json(resultMode)
                        } else {
                            callback(null,movie);
                        }
                    })
                })
            },
            function (movie,callback) {
                console.log(movie)
                SourceDetail.findByIdAndUpdate({_id:movie.detailId},{'$inc':{'times':1}},function (err,doc) {
                    if(err) return next(err)
                    console.log(doc)
                    resultMode.code = 1;
                    resultMode.msg = CodeMessage.MSG_1;
                    return res.json(resultMode);
                })
            }
        ])
    }else {
        next();
    }

}
