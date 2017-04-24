let DataTrans = {

    removeNull(obj) {
        for (let key in obj) {
            if (obj[key] == null || obj[key] == undefined || obj[key] == 'null') {
                obj[key] = '';
            }
        }
        return obj;
    },

    //服务器6位小数截取,ecimal是小数,index是取位数,返回的是字符串
    ecimalChange(ecimal, index) {
        if (ecimal == undefined || ecimal == '') {
            ecimal = '0';
        }

        let eciString = ecimal.toString();
        let eciArr = eciString.split('.');

        if (index == 0) {
            return eciArr[0];
        } else {
            if (eciArr.length < 2) {
                let oths = '';
                for (let i = 0; i < index; i++) {
                    oths += '0';
                }
                return eciArr[0] + '.' + oths;
            } else {
                if (eciArr[1].length > index) {
                    return eciArr[0] + '.' + eciArr[1].slice(0, index);
                } else {
                    let oths = '';
                    for (let i = eciArr[1].length; i < index; i++) {
                        oths += '0';
                    }

                    return eciArr[0] + '.' + eciArr[1] + oths;
                }
            }
        }
    },

    // 服务器每隔3位数加逗号，并且只保留2位小数
    decimalCommaChange(num){
        let decimal;
        let integer;
        if (num == undefined || num == '') {
            num = '0';
        }
        num = this.ecimalChange(num, 2);

        num = num.toString();
        let iOf = num.indexOf('.');
        if (iOf == -1) {
            integer = parseInt(num).toString();
            decimal = '.00';
        } else {
            integer = parseInt(num.split('.')[0]).toString();
            decimal = '.' + num.split('.')[1];
        }
        let len = integer.length;
        if (len <= 3) {
            return num;
        }
        let r = len % 3;
        if (r > 0) {
            return integer.slice(0, r) + "," + integer.slice(r, len).match(/\d{3}/g).join(",") + decimal;
        } else {
            return integer.slice(r, len).match(/\d{3}/g).join(",") + decimal;
        }
    },

};

export default DataTrans;

export function changeNullToString(obj) {
    if (obj == undefined || obj == null) {
        return '';
    } else {
        return obj;
    }
}
