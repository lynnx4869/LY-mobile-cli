//电话号码校验: 如 15005059587
export function checkPhoneNum(phone) {
    let checkPhoneExpression = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    return checkPhoneExpression.test(phone);
}
// 身份证校验 
export function checkUserId(idCard) {
//15位和18位身份证号码的正则表达式
    let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            let idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (let i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }

            let idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
            let idCardLast = idCard.substring(17); //得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                } else {
                    return false;
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    } else {
        return false;
    }
}
//密码校验8-20位数字,字母
export function checkPassword(password) {
    let checkPasswordExpression = /^[a-zA-Z0-9]{8,20}$/;
    return checkPasswordExpression.test(password);
}
//emoji表情验证，有表情返回false
export function checkNormalContentValidation(content) {
    let validation = /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g;
    return !validation.test(content);
}
//数字校验
export function checkDecimalNum(number) {
    let checkDecimalNumExpression = /^(-?\d+)(\.\d+)?$/;
    return checkDecimalNumExpression.test(number);
}
//全电话校验
export function checkAllPhoneNum(number) {
    let reg = /^[0-9-]{7,15}$/;
    return reg.test(number);
}

//是否有http开头
export function toJudgeImageURL(imgUrl) {
    let judgeState = imgUrl.indexOf("http");
    if (judgeState == 0) {
        return true;
    } else {
        return false;
    }
}

//正浮点数校验 - 2位小数
export function checkDecimalNumWithTwoNum(number) {
    var checkDecimalNumExpression = /^(\d|([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    return checkDecimalNumExpression.test(number);
}
