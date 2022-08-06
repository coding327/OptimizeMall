import React from 'react'
import { Empty, Button } from 'antd-mobile'
import { BeforeStyled } from '../ShopStyle'
import { withRouter } from 'react-router-dom'

const BeforeLogin = (props) => {
    const loginClick = () => {
        props.history.push('/login')
    }
    return (
        <BeforeStyled>
            <div style={{ height: '100vh', background: '#f7f8fa', paddingTop: '20vh' }}>
                <Empty style={{ padding: '64px 0 20px' }}
                    imageStyle={{ width: 128 }} description='登录后才能看到您的购物车' />
                <div className='box'><Button onClick={loginClick} size='mini' color='success'>去登录</Button></div>
            </div>
        </BeforeStyled>
    )
}

export default withRouter(BeforeLogin)
