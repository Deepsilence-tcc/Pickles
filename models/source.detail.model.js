/**
 * Created by cong on 2017/5/17.
 */
/**
 * Created by cong on 2017/5/4.
 */

var mongoose = require('mongoose');
var SourceDetailSchema = new mongoose.Schema({
    length:Number,
    age:Number,
    weight:Number,
    gender:String,
    location:String,
    description:String,
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
});

mongoose.model('SourceDetail',SourceDetailSchema,'SourceDetail');
