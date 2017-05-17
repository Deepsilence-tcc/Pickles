/**
 * Created by cong on 2017/4/27.
 */
var mongoose = require('mongoose');
var ResultModel = require('../utils/resultmodel');
var CodeMessage = require('../utils/codemessage');
var Movie = mongoose.model('Movies');
var Authority = mongoose.model('Authoritys');
module.exports = {
    /**
     * 第一个tab下展示的内容
     * @param req
     * @param res
     * @param next
     */
    listByCommon: function (req, res, next) {
        var level = req.level;
        var pageSize = req.pageSize;
        var pageIndex = req.pageIndex;
        var resultMode = new ResultModel();
        Movie.count(
            {
                catalogId: 2,
                itemType: 1,
                sortByContent: level + 1,
                isDelete: 0
            }
        ).exec(function (err, total) {
            if (err) return next(err);
            Movie.find(
                {
                    catalogId: 2,
                    itemType: 1,
                    sortByContent: level + 1,
                    isDelete: 0
                }
            )
                .populate('detailId')
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
    },
    /**
     * 第二个tab展示的内容
     * @param req
     * @param res
     * @param next
     */
    listByUpper: function (req, res, next) {

        var pageSize = req.pageSize;
        var pageIndex = req.pageIndex;

        var resultMode = new ResultModel();
        Movie.count(
            {
                catalogId: 2,
                itemType: 1,
                sortByContent: 2,
                isDelete: 0
            }
        ).exec(function (err, total) {
            if (err) return next(err);

            Movie.find(
                {
                    catalogId: 2,
                    itemType: 1,
                    sortByContent: 2,
                    isDelete: 0
                }
            )
                .populate('detailId')
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


    },
    /***
     * 进入房间栏
     * @param req
     * @param res
     * @param next
     */
    listByRoom: function (req, res, next) {

        var pageSize = req.pageSize;
        var pageIndex = req.pageIndex;

        var resultMode = new ResultModel();
        Movie.count(
            {
                catalogId: 2,
                itemType: 2,
                sortByContent: 1,
                isDelete: 0
            }
        ).exec(function (err, total) {
            if (err) return next(err);
            Movie.find({
                catalogId: 2,
                itemType: 2,
                sortByContent: 1,
                isDelete: 0
            })
                .populate('detailId')
                .skip((pageIndex - 1) * pageSize)
                .limit(pageSize)
                .exec(function (err, docs) {
                    if (err) return next(err);
                    resultMode.code = 1;
                    resultMode.msg = CodeMessage.MSG_1;
                    resultMode.data = docs;
                    resultMode.total = total;
                    return res.json(resultMode);
                })
        })


    },
    /**
     * 进入同城交友频道
     * @param req
     * @param res
     * @param next
     */
    listByFriend: function (req, res, next) {

        var pageSize = req.pageSize;
        var pageIndex = req.pageIndex;

        var resultMode = new ResultModel();
        Movie.count(
            {
                catalogId: 2,
                itemType: 3,
                isDelete: 0
            }
        ).exec(function (err, total) {
            if (err) return next(err);
            Movie.find({
                catalogId: 2,
                itemType: 3,
                isDelete: 0
            })
                .populate('detailId')
                .skip((pageIndex - 1) * pageSize)
                .limit(pageSize)
                .exec(function (err, docs) {
                    if (err) return next(err);
                    resultMode.code = 1;
                    resultMode.msg = CodeMessage.MSG_1;
                    resultMode.data = docs;
                    resultMode.total = total;

                    return res.json(resultMode);
                })
        })

    },
    /**
     * 钻石会员，才有120秒的权限
     * @param req
     * @param res
     * @param next
     */
    listBySearch: function (req, res, next) {

        var pageSize = req.pageSize;
        var pageIndex = req.pageIndex;
        var resultMode = new ResultModel();
        Movie.count(
            {
                catalogId: 2,
                itemType: 1,
                sortByContent: 4,
                isDelete: 0
            }
        ).exec(function (err, total) {
            if (err) return next(err);
            Movie.find(
                {
                    catalogId: 2,
                    itemType: 1,
                    sortByContent: 4,
                    isDelete: 0
                }
            )
                .populate('detailId')
                .skip((pageIndex - 1) * pageSize)
                .limit(pageSize)
                .exec(function (err, docs) {
                    if (err) return next(err);

                    resultMode.code = 1;
                    resultMode.msg = CodeMessage.MSG_1;
                    resultMode.data = docs;
                    resultMode.total = total;
                    return res.json(resultMode);
                })
        })


    },
    /**当达到钻石会员，就发送消息
     * 发送虚拟信息
     * @param res
     * @param req
     * @param next
     * @returns {*}
     */
    sendMsgToUser: function (req, res, next) {


        return res.json("很高心认识你")
    },

    /**
     * 点击观看
     * @param req
     * @param res
     * @param next
     */
    watchMovie: function (req, res, next) {

        var tab = parseInt(req.body.tab);
        var movieId = req.body.movieId;

        var resultMode = new ResultModel();
        if (tab == 5) {
            Authority.findById({
                _id: req.authorityId
            }).exec(function (err, doc) {
                if (err) return next(err);
                if (doc.fifthCount <= 0) {
                    resultMode.code = 7;
                    resultMode.msg = CodeMessage.MSG_7;
                    return res.json(resultMode)
                } else {
                    var fifthCount = doc.fifthCount - 1;
                    Authority.findByIdAndUpdate({_id: req.authorityId}, {$set: {fifthCount: fifthCount}}, function (err) {
                        if (err) return next(err);
                        Movie.findById({
                            _id: movieId
                        }).exec(function (err, movie) {
                            if (movie.length < 0 || movie._id == null) {
                                resultMode.code = 5;
                                resultMode.msg = CodeMessage.MSG_5;
                                return res.json(resultMode)
                            } else {
                                var watchTimes = movie.watchTimes + 1;
                                Movie.findByIdAndUpdate({_id: movieId}, {$set: {watchTimes: watchTimes}}, function (err) {
                                    if (err) return next(err);
                                    resultMode.code = 1;
                                    resultMode.msg = CodeMessage.MSG_1;
                                    return res.json(resultMode);
                                })
                            }
                        })
                    });
                }
            })
        }

    }
}
