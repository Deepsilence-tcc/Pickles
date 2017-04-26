/**
 * Created by cong on 2017/4/26.
 */
var mongoose = require('mongoose');
var ResultModel = require('../utils/resultmodel');
var CodeMessage = require('../utils/codemessage');
var User = mongoose.model('Users');
var Member = mongoose.model('Members');
var Dictionary = mongoose.model('Dictionary');

module.exports = {
    create:function (req,res,next) {
        var reqUniqueId = req.body.uniqueId;
        var resultMode = new ResultModel();
        if(reqUniqueId==undefined||reqUniqueId==null||reqUniqueId==''){
            resultMode.code = 5;
            resultMode.msg = CodeMessage.MSG_5;
            return res.json(resultMode);
        }
        User.find(
            {uniqueId:reqUniqueId}
        ).exec(function (err,doc) {
            if(err) return next(err);
            if(doc.length>0){
                console.log(1);
                resultMode.code = 3;
                resultMode.msg = CodeMessage.MSG_3;
                return res.json(resultMode);
            } else {
                var user = new User({
                    uniqueId:reqUniqueId,
                    userName:'tcc'+reqUniqueId,
                });
                user.save(function (err,doc) {
                    if(err) return next(err);
                    if(doc._id!=null&&doc._id!=undefined){
                        var member = new Member({
                            userId:doc._id,
                            uniqueId:doc.uniqueId,
                            type:1
                        })
                        member.save(function (err,doc) {
                            if(err) return next(err);
                            resultMode.code = 1;
                            resultMode.msg = CodeMessage.MSG_1;
                            resultMode.data = doc;
                        })
                    }
                })
            }
        })
    },
    getInfoById:function (req,res,next) {
        var reqUniqueId = req.query.uniqueId;
        var resultMode = new ResultModel();
        if(reqUniqueId==undefined||reqUniqueId==null||reqUniqueId==''){
            resultMode.code = 5;
            resultMode.msg = CodeMessage.MSG_5;
            return res.json(resultMode);
        }
        Member.find({
            uniqueId:reqUniqueId
        }).exec(function (err,docs) {
            if(err) return next(err);
            resultMode.code = 1;
            resultMode.msg = CodeMessage.MSG_1;
            resultMode.data = docs;
            return res.json(resultMode);
        })
    },
    updateInfo:function (res,req,next) {
        var reqType = req.query.currentType;
        var reqUniqueId = req.query.uniqueId;
        var resultMode = new ResultModel();

        reqType = parseInt(reqType)+1;

        if(reqType>4||reqType==undefined||reqType==null||reqType==''||reqUniqueId==undefined){
            resultMode.code = 5;
            resultMode.msg = CodeMessage.MSG_5;
            return res.json(resultMode);
        }
        Dictionary.find(
            {
                type:reqType
            }).exec(function (err,doc) {
                if(err) return next(err);
                var member = new Member({
                    type:reqType,
                    firstlength:doc[0].firstlength,
                    secondlength:doc[0].secondlength,
                    firstcount:doc[0].firstcount,
                    secondcount:doc[0].secondcount,
                    modifyAt:Date.now
                })
            Member.update({uniqueId:reqUniqueId},member,function (err) {
                if(err) return next(err);
            })

        })
    }

}
