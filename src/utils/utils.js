export default {
    // 校验身份证号函数
    IdentityCodeValid(rule, value, callback) {
        let city = {
            11: '北京',
            12: '天津',
            13: '河北',
            14: '山西',
            15: '内蒙古',
            21: '辽宁',
            22: '吉林',
            23: '黑龙江',
            31: '上海',
            32: '江苏',
            33: '浙江',
            34: '安徽',
            35: '福建',
            36: '江西',
            37: '山东',
            41: '河南',
            42: '湖北',
            43: '湖南',
            44: '广东',
            45: '广西',
            46: '海南',
            50: '重庆',
            51: '四川',
            52: '贵州',
            53: '云南',
            54: '西藏',
            61: '陕西',
            62: '甘肃',
            63: '青海',
            64: '宁夏',
            65: '新疆',
            71: '台湾',
            81: '香港',
            82: '澳门',
            91: '国外',
        };
        if (!value) {
            return true, callback();
        }
        if (
            !value ||
            !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
                value
            )
        ) {
            callback(new Error('身份证号格式错误'));
        } else if (!city[value.substr(0, 2)]) {
            callback(new Error('地址编码错误'));
        } else {
            if (value.length == 18) {
                value = value.split('');
                let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                let sum = 0;
                let ai = 0;
                let wi = 0;
                for (let i = 0; i < 17; i++) {
                    ai = value[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                if (parity[sum % 11] != value[17]) {
                    callback(new Error('校验位错误'));
                } else {
                    return true, callback();
                }
            }
        }
    },
    // 设置手机号的验证规则
    phoneRules(rule, value, callback) {
        if (!value) {
            callback(new Error('请输入联系方式'))
        } else {
            const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
            if (reg.test(value)) {
                callback()
            } else {
                return callback(new Error('请输入正确的电话'))
            }
        }
    },
}
