import React from 'react'
import { JumboTabs } from 'antd-mobile'
import { BalanceStyle } from '../PersonalStyle'

const Balance = () => {
    return (
        <BalanceStyle>
            <JumboTabs>
                <JumboTabs.Tab title='--' description='积分' key='fruits'>
                </JumboTabs.Tab>
                <JumboTabs.Tab title='--' description='优惠劵' key='vegetables'>
                </JumboTabs.Tab>
                <JumboTabs.Tab title='--' description='余额' key='animals'>
                </JumboTabs.Tab>
            </JumboTabs>
        </BalanceStyle>
    )
}

export default Balance
