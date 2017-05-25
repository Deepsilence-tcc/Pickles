/**
 * Created by cong on 2017/5/22.
 */
var mongoose = require('mongoose');
var ResultModel = require('../utils/resultmodel');
var CodeMessage = require('../utils/codemessage');
var Order = mongoose.model('Orders');
module.exports = {
    create: function (req, res, next) {
        var orderNum = req.body.orderNum;
        var isSuccess = req.body.isSuccess;
        var productName = req.body.productName;
        var price = req.body.price;
        var uniqueId = req.body.uniqueId;
        var resultMode= new ResultModel();
        if(orderNum&&isSuccess&&productName&&price&&uniqueId){
            var order = new Order({
                orderNum:orderNum,
                uniqueId:uniqueId,
                price :price,
                productName:productName,
                isSuccess:isSuccess,
            });
            order.save(function (err,doc) {
                if(err) return next(err);
                if(doc._id){
                   resultMode.code = 1;
                   resultMode.msg = CodeMessage.MSG_1;
                   return res.json(resultMode);
                }else {
                    resultMode.code = 3;
                    resultMode.msg = CodeMessage.MSG_3;
                    return res.json(resultMode);
                }
            })
        }
    },

    listByUniqueId: function (req, res, next) {
        var uniqueId = req.body.uniqueId;
        var resultMode = new ResultModel();
        if(uniqueId){
            Order.find({
                uniqueId:uniqueId,
                isDelete:0,
            })
                .sort('createAt:1')
                .exec(function (err,docs) {
                if(err) return next(err);
                if(docs.length<=0){
                  resultMode.code = 4;
                  resultMode.data = CodeMessage.MSG_4;
                  return res.json(resultMode);
                }else {
                    resultMode.code = 1;
                    resultMode.data = CodeMessage.MSG_1;
                    resultMode.data = docs;
                    return res.json(resultMode);
                }
            })
        }
    }

}