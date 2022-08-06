import React from 'react'
import { ComStyle, BoxStyle } from '../PersonalStyle'
import { TabBar } from 'antd-mobile'
import {
    AppOutline,
    GiftOutline,
    BillOutline,
    EnvironmentOutline,
    SetOutline
} from 'antd-mobile-icons'

const ComFun = () => {
    const tabs1 = [
        {
            key: 'home',
            title: '我的钱包',
            icon: <AppOutline />
        },
        {
            key: 'todo',
            title: '积分兑换',
            icon: <GiftOutline />
        },
        {
            key: 'receivingGoods',
            title: '优惠劵',
            icon: <BillOutline />,
            badge: '99+',
        },
        {
            key: 'evaluate',
            title: '收货地址',
            icon: <EnvironmentOutline />
        },
    ]
    const tabs2 = [
        {
            key: 'set',
            title: '设置',
            icon: <SetOutline />
        },
    ]
    return (
        <>
            <ComStyle>
                <div className='orderHead'><span>常用功能</span></div>
                <TabBar>
                    {tabs1.map(item => (
                        <TabBar.Item
                            key={item.key}
                            icon={item.icon}
                            title={item.title}
                            badge={item.badge}
                        />
                    ))}
                </TabBar>
                <TabBar>
                    {tabs2.map(item => (
                        <TabBar.Item
                            key={item.key}
                            icon={item.icon}
                            title={item.title}
                            badge={item.badge}
                        />
                    ))}
                </TabBar>
            </ComStyle>
            <BoxStyle>
            </BoxStyle>
        </>
    )
}

export default ComFun
