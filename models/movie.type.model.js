/**
 * Created by cong on 2017/5/4.
 */

var mongoose = require('mongoose');
var MovieTypeSchema = new mongoose.Schema({
    name:String,
    picUrl:String,
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

mongoose.model('MovieTypes',MovieTypeSchema,'MovieTypes');
