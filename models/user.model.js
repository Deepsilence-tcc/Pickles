/**
 * Created by cong on 2017/4/26.
 */

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({

    uniqueId:{
        type:String,
        required:true
    },
    name:String,
    description:{
        type:String,
        default:'普通会员'
    },
    level:Number,
    authorityId:{
        type:mongoose.Schema.ObjectId,
        ref:'Authoritys'
    },
    tel:String,
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

mongoose.model('Users',UserSchema,'Users');

