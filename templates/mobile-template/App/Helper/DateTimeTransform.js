import moment from 'moment';

let DateTimeTransform = {
    //时间戳转换成日期
    timestampToDatetime(timestamp, formatString){
        return moment(parseInt(timestamp)).format(formatString);
    },
    //日期转换为时间戳
    datetimeToTimestamp(datetime, formatString){
        return moment(datetime, formatString).format('x');
    },
    //获取当前的时间
    getNowDatetime(formatString){
        return moment().format(formatString).toString();
    },
    //获取当前的时间戳
    getNowTimestamp(){
        return moment().format('x');
    },
    //获取到目前为止的时间
    getDateFromNow(){
        return moment().fromNow();
    },
    //获取这一段时间的时间戳
    getDurationFromTimestamp(timestamp){
        let dur = moment.duration(timestamp);
        let durString = '';

        //年月日的转换
        if (dur.years() == 0) {
            if (dur.months() == 0) {
                if (dur.days() != 0) {
                    durString = durString + dur.days() + '天';
                }
            } else {
                durString = durString + dur.months() + '个月';

                if (dur.days() != 0) {
                    durString = durString + '零';
                    durString = durString + dur.days() + '天';
                }
            }
        } else {
            durString = durString + dur.years() + '年';

            if (dur.months() == 0) {
                if (dur.days() != 0) {
                    durString = durString + '零';
                    durString = durString + dur.days() + '天';
                }
            } else {
                durString = durString + dur.months() + '个月';
                if (dur.days() != 0) {
                    durString = durString + '零';
                    durString = durString + dur.days() + '天';
                }
            }
        }

        //时分秒的转换
        if (dur.hours() != 0) {
            durString = durString + dur.hours() + '个小时';
        }

        if (dur.minutes() != 0) {
            durString = durString + dur.minutes() + '分钟';
        }

        if (dur.seconds() != 0) {
            durString = durString + dur.seconds() + '秒';
        }

        return durString;
    }
};

export default DateTimeTransform;