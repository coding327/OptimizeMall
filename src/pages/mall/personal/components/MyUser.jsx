import React, {useState, useEffect} from 'react'
import { UserStyle } from '../PersonalStyle'
import { Avatar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { getToken, removeToken } from '../../../../utils/cookieUtils'
// 引入图片资源
import avatars from '@s/images/aside/avatar1.jpg'

const MyUser = (props) => {
    const [avatarImg, setAvatar] = useState('')
    const resLon = () => {
        props.history.push('/login')
    }
    useEffect(() => {
        if (getToken('user')) {
            setAvatar(avatars)
        } else {
            setAvatar('')
        }
    }, [])
    const signOut = () => {
        removeToken('user')
        removeToken('token')
        removeToken('tokena')
        props.history.push('/login')
    }
    return (
        <UserStyle>
            <Avatar src={avatarImg} style={{'--size': '70px', borderRadius: '50%'}}/>
            {avatarImg === '' ? <span onClick={resLon}>登录/注册</span> : <span onClick={signOut}>{getToken('user')}</span> }
        </UserStyle>
    )
}

export default withRouter(MyUser)
