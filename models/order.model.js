/**
 * Created by cong on 2017/5/22.
 * "orderNum" : 82216666,
 "validTime" : ISODate("2017-05-25T05:17:33.607Z"),
 "price" : 25,
 "productName" : "黄金会员充值",
 "isSuccess" : 1,
 "isDelete" : 0,
 "modifyAt" : ISODate("2017-05-17T05:17:33.607Z"),
 "createAt" : ISODate("2017-05-17T05:17:33.607Z")
 */
var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({

        orderNum: {
            type: String,
            required: true,
        },
        validTime: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        isSuccess: {
            type: Number,
            required: true,
        },
        isDelete: {
            type: Number,
            defaut: 0
        }, createAt: {
            type: Date,
            default: Date.now
        }, //创建时间
        // 修改时间
        modifyAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
)

mongoose.model('Orders',orderSchema,'Orders');
