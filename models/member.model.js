/**
 * Created by cong on 2017/4/26.
 */
var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.ObjectId,
        require:true
    },
    uniqueId:String,
    type:Number,
    firstlength:{
        type:Number,
        default:20,
    },
    secondlength:{
        type:Number,
        default:20,
    },
    firstcount:{
        type:Number,
        default:5,
    },
    secondcount:{
        type:Number ,
        default:3
    },
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

mongoose.model('Members',MemberSchema,'Members');

