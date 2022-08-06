import React from 'react'
import MyUser from './components/MyUser'
import Balance from './components/Balance'
import Order from './components/Order'
import ComFun from './components/ComFun'

const Personal = () => {
    return (
        <div>
            {/* 用户头像 */}
            <MyUser />
            {/* 余额 */}
            <Balance />
            {/* 订单 */}
            <Order />
            {/* 常用功能 */}
            <ComFun />
        </div>
    )
}

export default Personal
