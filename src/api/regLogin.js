// 首页请求,引入工具类中的请求服务
import request from '../utils/request'

// 登录
export const getLogData = data => request({ url: '/logina', method: 'post', data})

// 注册
export const getRegData = data => request({url: '/register', method: 'post', data})

// 手机号是否存在
export const isExistPhone = data => request({url: '/vercode', method: 'post', data})

// 重置密码
export const resetPwd = data => request({url: '/resetpwd', method: 'post', data})

