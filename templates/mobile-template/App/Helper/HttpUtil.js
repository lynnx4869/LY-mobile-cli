import request from 'superagent';
import Config from '../Helper/Config'

function setHeader(head) {
    let headers = {};
    headers['Content-Type'] = 'application/json; charset=UTF-8';

    gwt.getUserInfo({
        success: function (obj) {
            headers['ChannelID'] = obj.channelId;
            headers['GWTAuthorization'] = obj.deviceType + '<>' + obj.accessToken + '<>0<>0';

            head(headers);
        }
    });
}

function resultForHttp(error, result, callback) {
    if (error) {
        gwt.showMessage({
            message: '服务器正在维护中，请稍后再试',
            type: 'error'
        });
        callback(false, null);
    } else {
        if (result.body.respCode == '00000') {
            callback(true, result.body.data);
        } else {
            gwt.showMessage({
                message: result.body.memo,
                type: 'error'
            });
            callback(false, null);
        }
    }
}

let HttpUtil = {
    get(url, callback){
        setHeader(function (headers) {
            request.get(Config.ROOT_URL + url)
                .timeout(30000)
                .set(headers)
                .end(function (error, result) {
                    resultForHttp(error, result, callback);
                });
        });
    },

    post(url, data, callback){
        setHeader(function (headers) {
            request.post(Config.ROOT_URL + url)
            //.timeout(300000)
                .set(headers)
                .send(data)
                .end(function (error, result) {
                    resultForHttp(error, result, callback);
                });
        });
    },

    put(url, data, callback){
        setHeader(function (headers) {
            request.put(Config.ROOT_URL + url)
                .timeout(30000)
                .set(headers)
                .send(data)
                .end(function (error, result) {
                    resultForHttp(error, result, callback);
                });
        });
    },

    delete(url, data, callback){
        setHeader(function (headers) {
            request.del(Config.ROOT_URL + url)
                .timeout(30000)
                .set(headers)
                .send(data)
                .end(function (err, res) {
                    resultForHttp(err, res, callback);
                });
        });
    }
};

export default HttpUtil;