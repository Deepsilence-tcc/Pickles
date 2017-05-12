/**
 * Created by cong on 2017/5/4.
 */
var mongoose = require('mongoose');
var ResultModel = require('../utils/resultmodel');
var CodeMessage = require('../utils/codemessage');
var Movie = mongoose.model('Movies');

module.exports = function (req, res, next) {

    var level = parseInt(req.body.level, 10);
    var itemType = parseInt(req.body.itemType, 10);
    var pageIndex = parseInt(req.body.pageIndex, 10);
    var pageSize = parseInt(req.body.pageSize, 10);
    pageSize = pageSize ? pageSize : 10;
    pageIndex = pageIndex ? pageIndex : 1;

    var resultMode = new ResultModel();
    if (level >= 4) {
        Movie.count(
            {
                catalogId: 2,
                itemType: itemType,
                sortByContent: 5,
                isDelete: 0
            }, function (err, total) {
                if (err) return next(err);
                Movie.find(
                    {
                        catalogId: 2,
                        itemType: itemType,
                        sortByContent: 5,
                        isDelete: 0
                    }
                )
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
                            resultMode.total = total;
                            return res.json(resultMode);
                        }
                    })
            })

    } else {
        req.pageIndex = pageIndex;
        req.pageSize = pageSize;
        req.level = level;
        next();
    }
}
