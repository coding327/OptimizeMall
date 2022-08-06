// 首页请求,引入工具类中的请求服务
import request from '../utils/request'

// 上面代码简写，url和method要与后台数据接口对应
// 获取轮播图请求接口
export const getSwiperData = params => request({ url: 'api/xiaochengxu/banner/list', method: 'get', params })

// 获取商品请求接口，url和method要与后台数据接口对应
export const getGoods = data => request({ url: 'api/xiaochengxu/shop/goods/list/v2', method: 'post', data })






