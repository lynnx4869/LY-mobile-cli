const Config = {};

Config.IsUnifiedPlatform = false;

Config.ROOT_URL = '';

/**
 * 路径环境确认
 * @param local 直接连接环境
 * @param plat 同一平台环境
 * @returns {*}
 */
Config.urlX = function (local, plat) {
    if (Config.IsUnifiedPlatform) {
        return plat;
    } else {
        return local;
    }
};

Config.webSocketURL = '';

export default Config;

export const CompanyPhoneDisplay = '400-920-9156';
export const CompanyPhone = '4009209156';
