import Cookies from 'js-cookie'

//获取token
export function getToken(TokenKey) {
    return Cookies.get(TokenKey)
}
//存入
export function setToken(TokenKey, token) {
    return Cookies.set(TokenKey, token)
}
//移出
export function removeToken(TokenKey) {
    return Cookies.remove(TokenKey)
}

