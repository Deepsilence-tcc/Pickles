/**
 * Created by cong on 2017/5/4.
 */
var mongoose = require('mongoose');
var ResultModel = require('../utils/resultmodel');
var CodeMessage = require('../utils/codemessage');
var User = mongoose.model('Users');
module.exports = function (req,res,next) {

    var reqUniqueId = req.body.uniqueId;
    var level = parseInt(req.body.level,10);

    var resultMode = new ResultModel();

    if(reqUniqueId==null||reqUniqueId==undefined||reqUniqueId==''||level > 4){
        resultMode.code = 5;
        resultMode.msg = CodeMessage.MSG_5;
        return res.json(resultMode);
    }
    //如果传递的参数和当前用户不匹配,返回参数错误
    User.find({
        uniqueId:reqUniqueId,
        isDelete:0
    }).exec(function (err,docs) {
        if(err) return next(err);
        if(docs.length>0&&docs[0]._id!=null){
            resultMode.code = 5;
            resultMode.msg = CodeMessage.MSG_5;
            return res.json(resultMode);
        }else {
            next();
        }
    })

}
