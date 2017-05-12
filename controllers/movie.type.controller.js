/**
 * Created by cong on 2017/5/4.
 */
var mongoose = require('mongoose');
var ResultModel = require('../utils/resultmodel');
var CodeMessage = require('../utils/codemessage');
var MovieType = mongoose.model('MovieTypes');
var Movie = mongoose.model('Movies');

module.exports = {

    /**
     * 列出所有分类
     * @param req
     * @param res
     * @param next
     */
    listAllType: function (req, res, next) {

        var pageIndex = parseInt(req.query.pageIndex, 10);
        var pageSize = parseInt(req.query.pageSize, 10);
        pageSize = pageSize ? pageSize : 10;
        pageIndex = pageIndex ? pageIndex : 1;

        var resultMode = new ResultModel();
        MovieType.find({
            isDelete: 0
        })
            .skip((pageIndex - 1) * pageSize)
            .limit(pageSize)
            .exec(function (err, docs) {
                if (err) return next(err);
                if (docs.length <= 0) {
                    resultMode.code = 4;
                    resultMode.msg = CodeMessage.MSG_4;
                    return res.json(resultMode);
                } else {
                    resultMode.code = 1;
                    resultMode.msg = CodeMessage.MSG_1;
                    resultMode.data = docs;
                    return res.json(resultMode);
                }
            })
    },

    listByType: function (req, res, next) {
        var level = parseInt(req.body.level, 10);
        var pageIndex = parseInt(req.body.pageIndex, 10);
        var pageSize = parseInt(req.body.pageSize, 10);
        pageSize = pageSize ? pageSize : 10;
        pageIndex = pageIndex ? pageIndex : 1;

        var sortId = req.body.sortId;

        var resultMode = new ResultModel();

        if (sortId == undefined || sortId == null || sortId == '') {
            resultMode.code = 5;
            resultMode.msg = CodeMessage.MSG_5
            return res.json(resultMode);
        }
        if(level<4) {
            Movie.count(
                {
                    catalogId: 2,
                    itemType: 1,
                    sortByContent: 4,
                    sortId: sortId,
                    isDelete: 0
                }
            ).exec(function (err, total) {
                if (err) return next(err);
                Movie.find({
                    catalogId: 2,
                    itemType: 1,
                    sortByContent: 4,
                    sortId: sortId,
                    isDelete: 0
                }).skip((pageIndex - 1) * pageSize)
                    .limit(pageSize)
                    .exec(function (err, docs) {
                        if (err) return next(err);
                        if (docs.length <= 0) {
                            resultMode.code = 4;
                            resultMode.msg = CodeMessage.MSG_4;
                            return res.json(resultMode);
                        } else {
                            resultMode.code = 1;
                            resultMode.msg = CodeMessage.MSG_1;
                            resultMode.data = docs;
                            resultMode.total = total;
                            return res.json(resultMode);
                        }
                    })
            })
        }else {
            Movie.count(
                {
                    catalogId: 2,
                    itemType: 1,
                    sortByContent: 5,
                    sortId: sortId,
                    isDelete: 0
                }
            ).exec(function (err, total) {
                if (err) return next(err);
                Movie.find({
                    catalogId: 2,
                    itemType: 1,
                    sortByContent: 5,
                    sortId: sortId,
                    isDelete: 0
                }).skip((pageIndex - 1) * pageSize)
                    .limit(pageSize)
                    .exec(function (err, docs) {
                        if (err) return next(err);
                        if (docs.length <= 0) {
                            resultMode.code = 4;
                            resultMode.msg = CodeMessage.MSG_4;
                            return res.json(resultMode);
                        } else {
                            resultMode.code = 1;
                            resultMode.msg = CodeMessage.MSG_1;
                            resultMode.data = docs;
                            resultMode.total = total;
                            return res.json(resultMode);
                        }
                    })
            });
        }

    }
}
