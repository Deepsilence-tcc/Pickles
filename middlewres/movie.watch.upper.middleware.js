/**
 * Created by cong on 2017/5/7.
 */
var mongoose = require('mongoose');
var ResultModel = require('../utils/resultmodel');
var CodeMessage = require('../utils/codemessage');
var Authority = mongoose.model('Authoritys');
var Movie = mongoose.model('Movies');



module.exports = function (req,res,next) {
    var tab = parseInt(req.body.tab);
    var movieId = req.body.movieId;

    var resultMode = new ResultModel();
    if(tab==2){
        Authority.findById({
            _id:req.authorityId
        }).exec(function (err,doc) {
            if (err) return next(err);
            if(doc.secondCount<=0){
                resultMode.code = 7;
                resultMode.msg = CodeMessage.MSG_7;
                return res.json(resultMode)
            }else {
                var secondCount = doc.secondCount-1;
                Authority.findByIdAndUpdate({_id:req.authorityId},{$set:{secondCount:secondCount}},function (err) {
                    if(err) return next(err);
                    Movie.findById({
                        _id:movieId
                    }).exec(function (err,movie) {
                        if(movie.length<0||movie._id==null){
                            resultMode.code = 5;
                            resultMode.msg = CodeMessage.MSG_5;
                            return res.json(resultMode)
                        }else {
                            var watchTimes = movie.watchTimes+1;
                            Movie.findByIdAndUpdate({ _id:movieId},{$set:{watchTimes:watchTimes}},function (err){
                                if(err) return next(err);
                                resultMode.code = 1;
                                resultMode.msg = CodeMessage.MSG_1;
                                return res.json(resultMode);
                            })
                        }
                    })
                });
            }
        })
    }else {
        next();
    }

}
