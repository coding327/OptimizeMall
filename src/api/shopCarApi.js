// shopCar请求,引入工具类中的请求服务
import request from '../utils/request'

// ?token=a5911e1b-94b7-4048-b40f-0990e353bc3a
export const getShopCar = params => request({ url: 'api/xiaochengxu/shopping-cart/info', method: 'get', params })

export const updateCar = params => request({ url: 'api/xiaochengxu/shopping-cart/modifyNumber', method: 'post', params })

// 删除商品接口
export const removeGood = data => request({ url: 'api/xiaochengxu/shopping-cart/remove', method: 'post', data })
