import React, { useState, useEffect } from 'react'
import { BoxStyle } from '../login/StyledLogin'
import { Form, Input, Button, Toast, Modal } from 'antd-mobile'
import { CheckCircleFill } from 'antd-mobile-icons'
import { withRouter } from 'react-router-dom'
import { isExistPhone } from '@a/regLogin'
// 引入验证码
import getCode from '../../utils/yzm'
import { setToken } from '../../utils/cookieUtils'
// 获取后台真实token，并存储到cookie中
import { getTokenA } from '@a/tokenA'

const VerCode = (props) => {
    const [a, setA] = useState(1)
    const [phone, setPhone] = useState('')
    const [yzmI, setYzmInp] = useState('') // 验证码输入框
    const [yzm, setYzm] = useState('') // 随机生成验证码
    const changeA = () => {
        setA(!a)
    }
    const phoneInp = (val) => {
        console.log(val)
        setPhone(val) // val默认就是输入框值
    }
    const yzmInp = (val) => {
        console.log(val)
        setYzmInp(val) // val默认就是输入框值
    }
    // 发送验证码，随机一个
    const sendyzm = () => {
        setYzm(getCode())
    }
    useEffect(() => {
        // note: 解决初始执行一次为空【我只要点击发送验证码的时候有值显示】
        if (yzm) {
            Modal.alert({
                content: yzm,
                closeOnMaskClick: true,
            })
        }
    }, [yzm])
    const loginClick = () => {
        console.log(phone) // 成功拿到输入框值
        var phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
        if (phoneReg.test(phone)) {
            console.log('手机号ok')
            // 验证码
            if (yzmI === '') {
                Toast.show({
                    content: '验证码不能为空！',
                    afterClose: () => {
                        console.log('after')
                    },
                })
            } else {
                if (yzm.toLowerCase() === yzmI.toLowerCase()) {
                    console.log('验证码ok')
                    isExistPhone({ phone }).then(res => {
                        console.log(res.code)
                        if (res.code === 201) { // 手机号不存在
                            Toast.show({
                                content: '该账号未注册！',
                                afterClose: () => {
                                    // console.log('after')
                                    // 去往注册页
                                    props.history.push('/login')
                                },
                            })
                        } else if (res.code === 200) {
                            // 手机号也ok，跳转首页
                            // 存放用户数据
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
                        }
                    })
                } else {
                    Toast.show({
                        content: '请输入正确的验证码',
                    })
                }
            }
        } else {
            Toast.show({
                content: '手机号有误！',
                // afterClose: () => {
                //     console.log('after')
                // },
            })
        }
    }
    // 密码登录
    const pwdLg = () => {
        props.history.push('/login')
    }
    // 免费注册
    const freeRegister = () => {
        props.history.push('register')
    }
    return (
        <BoxStyle>
            <h2>验证码登录</h2>
            <span>为了你的账号安全，请用手机号登录</span>
            <Form layout='horizontal' mode='card'>
                <Form.Item label='中国 +86'>
                    <Input onChange={phoneInp} placeholder='请输入手机号' />
                </Form.Item>
                <Form.Item extra={<span onClick={sendyzm}>发送验证码</span>}>
                    <Input onChange={yzmInp} placeholder='请输入4位验证码' />
                </Form.Item>
                <Form.Item>
                </Form.Item>
                <Button onClick={loginClick} block type='submit' color='primary' size='large'>
                    登录
                </Button>
            </Form>
            <div className='boxc'>
                <span onClick={pwdLg}>密码登录</span>
                <div><span onClick={freeRegister}>免费注册</span></div>
            </div>
            <footer><CheckCircleFill color={a ? '#76c6b8' : ''} onClick={changeA} />&nbsp;阅读并同意<span className='usea'>《用户协议》</span>和<span className='usea'>《隐私协议》</span></footer>
        </BoxStyle>
    )
}

export default withRouter(VerCode)
