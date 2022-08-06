import request from '../utils/request'

// 虎丘后台真正的token，这里我改为了tokena
export const getTokenA = params => request({ url: 'api/xiaochengxu/user/m/login', method: 'post', params })

// token = 6adb032a-7085-49c8-a0df-0521198f0151

