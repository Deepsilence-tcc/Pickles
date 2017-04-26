/**
 * Created by cong on 2017/4/26.
 */
var ResultModel = require('../utils/resultmodel');
var CodeMessage = require('../utils/codemessage');

module.exports = function (req,res,next) {
    var uniqueId = req.body.uniqueId || req.query.uniqueId;
    var resultMode = new ResultModel();
    if(uniqueId==null||uniqueId==undefined||uniqueId==''){
        resultMode.code = 5;
        resultMode.msg = CodeMessage.MSG_5;
        return res.json(resultMode)
    }else {
        next();
    }

}