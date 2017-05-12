/**
 * Created by cong on 2017/4/26.
 */
var mongoose = require('mongoose');
var ResultModel = require('../utils/resultmodel');
var CodeMessage = require('../utils/codemessage');
var User = mongoose.model('Users');
var Dictionary = mongoose.model('Dictionary');
var Authority = mongoose.model('Authoritys')

module.exports = {
    create: function (req, res, next) {
        var reqUniqueId = req.body.uniqueId;
        var resultMode = new ResultModel();
        Dictionary.find(
            {
                catalogId: 1,
                itemType: 1,
                isDelete: 0
            }
        ).exec(function (err, docs) {
            if (err) next(err);
            var data = docs[0];
            console.log(data);
            var authority = new Authority({
                catalogId: data.catalogId,
                itemType: data.itemType,
                name: data.name,
                firstCount: data.firstCount,
                secondCount: data.secondCount,
                thirdCount: data.thirdCount,
                forthCount: data.forthCount,
                fifthCount: data.fifthCount
            });

            authority.save(function (err, doc) {
                if (err) next(err);
                var user = new User({
                    uniqueId: reqUniqueId,
                    name: 'pickels' + reqUniqueId,
                    authorityId: doc._id,
                    level:doc.itemType,
                    description:doc.name,
                    tel:''
                })
                user.save(function (err, doc) {
                    if (err) next(err);
                    resultMode.code = 1;
                    resultMode.msg = CodeMessage.MSG_1;
                    resultMode.data = doc;
                    return res.json(resultMode);
                })
            })

        })
    },
    getInfoById: function (req, res, next) {
        var reqUniqueId = req.query.uniqueId;
        var resultMode = new ResultModel();
        if (reqUniqueId == undefined || reqUniqueId == null || reqUniqueId == '') {
            resultMode.code = 5;
            resultMode.msg = CodeMessage.MSG_5;
            return res.json(resultMode);
        }
        User.find({
            uniqueId: reqUniqueId,
            isDelete: 0
        })
            .populate('authorityId')
            .exec(function (err, docs) {
                if (err) return next(err);
                if(docs.length>0&&docs[0]._id!=null){
                    resultMode.code = 1;
                    resultMode.msg = CodeMessage.MSG_1;
                    resultMode.data = docs[0];
                    return res.json(resultMode);
                }else {
                    resultMode.code = 4;
                    resultMode.msg = CodeMessage.MSG_4
                    return res.json(resultMode);
                }
            })
    },
    updateInfo: function (req, res, next) {

        var level = parseInt(req.body.level,10);
        var resultMode = new ResultModel();
        var authorityId = req.authorityId;
        Dictionary.find(
            {
                catalogId:1,
                itemType: level + 1,
                isDelete: 0
            }).exec(function (err, docs) {
            if (err) return next(err);
            var data = docs[0]
            //不能通过new的方式， 因为一new就会生成id ,mongo 中无法更新_id
            var authority ={
                catalogId: data.catalogId,
                itemType: data.itemType,
                name: data.name,
                firstCount: data.firstCount,
                secondCount: data.secondCount,
                thirdCount: data.thirdCount,
                forthCount: data.forthCount,
                fifthCount: data.fifthCount,
                modifyAt:Date.now()
            };
            Authority.findByIdAndUpdate({_id:authorityId} ,{$set:authority},function (err) {
                if(err) return next(err);
                User.update({authorityId:authorityId},
                    {$set:{level:authority.itemType,description:authority.name}},
                    function (err,doc) {
                        if(err) return next(err);
                        if(doc.ok==1){
                            resultMode.code = 1;
                            resultMode.msg = CodeMessage.MSG_1;
                            return res.json(resultMode);
                        }
                    })
            });
        })
    }
}
