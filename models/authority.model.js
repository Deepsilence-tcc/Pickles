

var mongoose = require('mongoose');

var AuthoritySchema = new mongoose.Schema({

    catalogId:{
        type:Number,
        default:1,
        require:true
    },
    itemType:{
        type:Number,
        default:1,
        require:true
    },
    name:{
        type:String,
        default:1,
        require:true
    },
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

mongoose.model('Authoritys',AuthoritySchema,'Authoritys');