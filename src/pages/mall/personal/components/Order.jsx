import React, {useState} from 'react'
import { OrderStyle } from '../PersonalStyle'
import { TabBar } from 'antd-mobile'
import {
    AppOutline,
    UnorderedListOutline,
    TruckOutline,
    MessageOutline,
    PayCircleOutline
} from 'antd-mobile-icons'

const Order = () => {
    const tabs = [
        {
            key: 'home',
            title: '待付款',
            icon: <AppOutline />
        },
        {
            key: 'todo',
            title: '待发货',
            icon: <UnorderedListOutline />
        },
        {
            key: 'receivingGoods',
            title: '待收货',
            icon: <TruckOutline />,
            badge: '99+',
        },
        {
            key: 'evaluate',
            title: '评价',
            icon: <MessageOutline />,
            badge: '99+',
        },
        {
            key: 'afterSales',
            title: '退款/售后',
            icon: <PayCircleOutline />,
            badge: '99+',
        },
    ]
    return (
        <OrderStyle>
            <div className='orderHead'><span>我的订单</span><span>查看全部订单&gt;</span></div>
            <TabBar>
                {tabs.map(item => (
                    <TabBar.Item
                        key={item.key}
                        icon={item.icon}
                        title={item.title}
                        badge={item.badge}
                    />
                ))}
            </TabBar>
        </OrderStyle>
    )
}

export default Order
