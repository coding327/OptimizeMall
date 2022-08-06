import React, { useState, useEffect } from 'react'
import { BoxStyle } from './ForgetStyle'
import { Form, Input, Button, Toast, Modal } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { resetPwd } from '@a/regLogin'
// 引入验证码
import getCode from '../../utils/yzm'

const ForgetPwd = (props) => {
    const [phone, setPhone] = useState('')
    const [pwd, setPwd] = useState('')
    const [pwd2, setPwd2] = useState('')
    const [yzmI, setYzmInp] = useState('')
    const [yzm, setYzm] = useState('')
    // 手机号
    const phoneInp = (val) => {
        console.log(val)
        setPhone(val) // val默认就是输入框值
    }
    // 验证码
    const yzmInp = (val) => {
        console.log(val)
        setYzmInp(val) // val默认就是输入框值
    }
    // 密码
    const pwdInp = (val) => {
        console.log(val)
        setPwd(val) // val默认就是输入框值
    }
    // 验证二次密码是否一致方法
    const pwd2Inp = (val) => {
        setPwd2(val)
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
            // 验证码是否ok
            if (yzm.toLowerCase() === yzmI.toLowerCase()) {
                console.log('验证码ok')
                if (pwd === '') {
                    Toast.show({
                        content: '密码不能为空',
                    })
                } else {
                    // 密码二次验证
                    if (pwd2 !== pwd) {
                        Toast.show({
                            content: '两次密码输入不一致',
                        })
                    } else {
                        console.log('两次密码一致')
                        // 发请求给后端[已经注册重置成功，直接登录]
                        resetPwd({ phone, pwd }).then(res => {
                            if (res.code === 200) {
                                Toast.show({
                                    content: res.msg,
                                    afterClose: () => {
                                        // console.log('after')
                                        props.history.push('/login')
                                    },
                                })
                            } else if (res.code === 201) {
                                Toast.show({
                                    content: res.msg,
                                })
                            }
                        })
                    }
                }
            } else {
                Toast.show({
                    content: '请输入正确的验证码',
                })
            }
        } else {
            Toast.show({
                content: '手机号不规范！'
            })
        }
    }
    return (
        <BoxStyle>
            <h2>重置密码</h2>
            <Form layout='horizontal' mode='card'>
                <Form.Item label='中国 +86'>
                    <Input onChange={phoneInp} placeholder='请输入手机号' />
                </Form.Item>
                <Form.Item extra={<span onClick={sendyzm}>发送验证码</span>}>
                    <Input onChange={yzmInp} placeholder='请输入4位验证码' />
                </Form.Item>
                <Form.Item>
                    <Input onChange={pwdInp} placeholder='请输入密码' />
                </Form.Item>
                <Form.Item>
                    <Input onChange={pwd2Inp} placeholder='请再次输入密码' />
                </Form.Item>
                <Form.Item>
                </Form.Item>
                <Button onClick={loginClick} block type='submit' color='primary' size='large'>
                    确定
                </Button>
            </Form>
        </BoxStyle>
    )
}

export default withRouter(ForgetPwd)
