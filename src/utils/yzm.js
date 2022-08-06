var codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
 // 用来生成随机整数
function getRandom(n, m) {
    n = Number(n)
    m = Number(m)
    if (n > m) {
        var temp = n
        n = m
        m = temp
    }
    return Math.floor(Math.random() * (m - n) + n)
}

function getCode() {
    var str = ''
    // 验证码有几位就循环几次
    for (var i = 0; i < 4; i++) {
        var ran = getRandom(0, 62)
        str += codeStr.charAt(ran)
    }
    return str
}

export default getCode
