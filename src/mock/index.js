import Mock from 'mockjs'
// 引入 loginData对象
import loginData from './loginData'

// 接口 登录
Mock.mock(/\/logina/, 'post', loginData.getLoginData)

// 注册
Mock.mock(/\/register/, 'post', loginData.getRegData)

// 手机号是否存在
Mock.mock(/\/vercode/, 'post', loginData.getPhoneData)

// 重置密码
Mock.mock(/\/resetpwd/, 'post', loginData.resetPwd)
