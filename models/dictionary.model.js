/**
 * Created by cong on 2017/4/26.
 */
var mongoose = require('mongoose');

var DictionarySchema = new mongoose.Schema({

    catalogId:Number,
    itemType:Number,
    name:String,
    firstCount:Number,
    secondCount:Number,
    thirdCount:Number,
    forthCount:Number,
    fifthCount:Number,
    isDelete:{
        type:Number,
        default:0
    },
    createAt: {
        type: Date,
        default: Date.now
    }, //创建时间
    modifyAt: {
        type: Date,
        default: Date.now
    }, //修改时间
},{
    versionKey: false
})

mongoose.model('Dictionary',DictionarySchema,'Dictionary');
