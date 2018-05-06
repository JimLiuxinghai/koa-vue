/**
 * Created by Administrator on 2017/9/1.
 * 提示信息
 */

exports.ERR_OK = {
    "status": {
        "code": 200,
        "msg": "OK"
    },
    "data": {}
};
// 100 系统级别错误
exports.ERR_SYSTEM_ERROR = {
    "status": {
        "code": 100,
        "msg": "系统错误"
    }
};
// 100 系统级别错误
exports.ERR_ERROR = {
    "status": {
        "code": 100,
        "msg": "系统错误"
    }
};
// 2000 参数错误
exports.ERR_ERROR_NAME = {
    "status": {
        "code": 2001,
        "msg": "文件表（Sheet表）名称不正确，请上传正确的数据导入文件。"
    }
};
// 2001 参数错误
exports.ERR_ERROR_OBSERVE_DT = {
    "status": {
        "code": 2002,
        //todo 观察日期各个sheet不相等，无观察日期
        "msg": "统计日期不是今日，请导入今日统计的数据"
    }
};
// 2001 参数错误
exports.ERR_ERROR_HEADERS = {
    "status": {
        "code": 2003,
        "msg": "文件表（Sheet表）表头信息不正确，请上传正确的数据导入文件。"
    }
};
// 2001 参数错误
exports.ERR_ERROR_ERROR = {
    "status": {
        "code": 2004,
        "msg": "有错误信息"
    }
};
exports.ERR_ERROR_YEAR = {
    "status": {
        "code": 2005,
        "msg": "年份格式错误，请输入正确年份。"
    }
};
// 200 没有导入
exports.ERR_ERROR_NO = {
    "status": {
        "code": 200,
        "msg": "没有导入"
    }
};



