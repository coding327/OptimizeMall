import request from '../utils/request'

// 侧边栏数据
export const getCategoryData = params => request({ url: 'api/xiaochengxu/shop/goods/category/all', method: 'get', params })

// 具体数据
export const getContentData = params => request({ url: 'api/xiaochengxu/shop/goods/list/v2', method: 'post', params})


