import request from '../utils/request'

// 商品详情页请求
export const getUserInfo = params => request({ url: 'api/xiaochengxu/shopping-cart/info', method: 'get', params })