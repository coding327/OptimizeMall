import React, { useState } from 'react'
import { BoxStyle } from './StyledLogin'
import { Form, Input, Button, Toast } from 'antd-mobile'
import { CheckCircleFill } from 'antd-mobile-icons'
import { withRouter } from 'react-router-dom'
import { getLogData } from '@a/regLogin'
import { setToken } from '../../utils/cookieUtils'
import { getTokenA } from '@a/tokenA'

const Login = (props) => {
    const [a, setA] = useState(1)
    const [phone, setPhone] = useState('')
    const [pwd, setPwd] = useState('')
    const changeA = () => {
        setA(!a)
    }
    const phoneInp = (val) => {
        console.log(val)
        setPhone(val) // val默认就是输入框值
    }
    const pwdInp = (val) => {
        console.log(val)
        setPwd(val) // val默认就是输入框值
    }
    const loginClick = () => {
        console.log(phone) // 成功拿到输入框值
        var phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
        if (phoneReg.test(phone)) {
            console.log('手机号ok')
            // 发请求验证手机号和密码
            getLogData({ phone, pwd }).then(res => {
                if (res.code === 200) {
                    console.log('手机号密码都正确')
                    console.log(res)
                    setToken('user', res.data.username)
                    setToken('token', res.data.token)
                    // 注册登录mock写的，其实是有后台接口的，没办法这里自己用个账号登录获取数据及tokena
                    // 需要token
                    // mobile=13407254208&deviceId=16588027066856262308&deviceName=iPhone&pwd=12345678a
                    getTokenA({ mobile: '13407254208', deviceId: '16588027066856262308', deviceName: 'iPhone', pwd: '12345678a', token: '' }).then(res => {
                        // 存储tokena
                        if (res.code === 0) {
                            setToken('tokena', res.data.token)
                            // 跳转到首页--------------【登录这里默认自带注册】
                            props.history.push('/')
                        }
                    })
                } else if (res.code === 201) {
                    console.log('手机号或密码有误')
                    Toast.show({
                        content: '手机号或密码有误',
                    })
                }
            })
        } else {
            Toast.show({
                content: '手机号不规范！',
                // afterClose: () => {
                //     console.log('after')
                // },
            })
        }
    }
    // 验证码登录
    const yzmLg = () => {
        props.history.push('/vercode')
    }
    // 忘记密码
    const forgetClick = () => {
        props.history.push('/forgetpwd')
    }
    // 免费注册
    const registerClick = () => {
        props.history.push('/register')
    }
    return (
        <BoxStyle>
            <h2>账号密码登录</h2>
            <span>为了你的账号安全，请用手机号登录</span>
            <Form layout='horizontal' mode='card'>
                <Form.Item label='中国 +86'>
                    <Input onChange={phoneInp} placeholder='请输入手机号' />
                </Form.Item>
                <Form.Item>
                    <Input onChange={pwdInp} placeholder='请输入密码' />
                </Form.Item>
                <Form.Item>
                </Form.Item>
                <Button onClick={loginClick} block type='submit' color='primary' size='large'>
                    登录
                </Button>
            </Form>
            <div className='boxc'>
                <span onClick={yzmLg}>验证码登录</span>
                <div><span onClick={forgetClick}>忘记密码&emsp;</span><span onClick={registerClick}>免费注册</span></div>
            </div>
            <footer><CheckCircleFill color={a ? '#76c6b8' : ''} onClick={changeA} />&nbsp;阅读并同意<span className='usea'>《用户协议》</span>和<span className='usea'>《隐私协议》</span></footer>
        </BoxStyle>
    )
}

export default withRouter(Login)
