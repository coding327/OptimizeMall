// 登录数据操作
var LoginList = [
    { username: 'admin', pwd: '123456', phone: '13407254208', token: 'admin---token---' },
    { username: 'aaa', pwd: '123456', phone: '13456789012', token: 'aaa---token---' }
]

// eslint-disable-next-line
export default {
    getLoginData: config => {
        var { phone, pwd } = JSON.parse(config.body)
        var result = {
            code: 201,
            msg: '验证失败',
            data: null,
        }
        LoginList.forEach(item => {
            if (item.phone === phone && item.pwd === pwd) {
                result.code = 200
                result.msg = '验证成功'
                result.data = item
                return // 每个item都会执行判断,同时找到就停止循环【最好使用find】
            }
            // } else {
            //     result.code = 201
            //     result.msg = '验证失败'
            //     result.data = null
            // }
        })
        // 循环完return结果
        // console.log(result)
        return result
    },
    getRegData: config => {
        var { username, phone, pwd } = JSON.parse(config.body)
        var index = LoginList.findIndex(item => item.phone === phone)
        if (index !== -1) {
            // 直接进入首页，返回用户信息，前端更新用户信息
            return { code: 201, msg: '已经注册过了', data: LoginList[index] }
        } else {
            var userInfo = {
                username,
                pwd,
                phone,
                token: username + '---token---'
            }
            LoginList.push(userInfo)
            return { code: 200, msg: '注册成功', data: userInfo }
        }
    },
    getPhoneData: config => {
        var { phone } = JSON.parse(config.body)
        var index = LoginList.findIndex(item => item.phone === phone)
        if (index === -1) {
            return { code: 201, msg: '手机号不存在' }
        } else {
            return { code: 200, msg: '手机号已经存在', data: LoginList[index] }
        }
    },
    resetPwd: config => {
        var { phone, pwd } = JSON.parse(config.body)
        var index = LoginList.findIndex(item => item.phone === phone)
        if (index === -1) {
            return {code: 201, msg: '手机号不正确', data: null}
        } else {
            LoginList[index].pwd = pwd
            return {code: 200, msg: '重置密码成功', data: LoginList[index]}
        }
    }
}


