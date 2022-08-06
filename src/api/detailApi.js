import request from '../utils/request'

// 商品详情页请求
export const getSingleGood = params => request({ url: '/api/xiaochengxu/shop/goods/detail', method: 'post', params })

// 加入购物车
export const getAddGood = data => request({ url: 'api/xiaochengxu/shopping-cart/add', method: 'post', data, contentType: 'form-data'})

