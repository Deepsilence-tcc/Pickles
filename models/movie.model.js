/**
 * Created by cong on 2017/4/27.
 */
var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
    catalogId:{
        type:Number,
        required:true
    },
    itemType:{
        type:Number,
        required:true
    },
    sortByContent:Number,
    title:String,

    picUrl:String,
    contentUrl:String,
    sortId:{
        type:mongoose.Schema.ObjectId,
        ref:'MovieTypes'
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
    detailId:{
        type:mongoose.Schema.ObjectId,
        ref:'SourceDetail'
    }
},{
    versionKey: false
});

mongoose.model('Movies',MovieSchema,'Movies');
