import React, { useState, useEffect } from 'react'
// 引入侧边栏ui组件
import { SideBar, Space, ErrorBlock } from 'antd-mobile'
// 样式组件
import { CntStyle } from '../CategoryStyle'
//【bug，拿不到history，需要一个withRouter高阶组件，函数组件不能使用语法糖，只能包裹，最上面引入这个高阶组件使用】
import { withRouter } from 'react-router-dom'
import { getContentData } from '@a/CategoryApi'
import { getTokenA } from '@a/tokenA'
import { setToken } from '../../../../utils/cookieUtils'

const CategoryContent = (props) => {
    // setActiveKey更新为活跃的item
    const [activeKey, setActiveKey] = useState(props.categoryArr[0].id + '')
    const [arr, setArr] = useState([])
    const [x, setX] = useState(1)
    useEffect(() => {
        getContentData({ categoryId: activeKey }).then(res => {
            if (res.code === 0) {
                setX(1)
                setArr(res.data.result)
            } else {
                setX(0)
            }
        })
    }, [props.categoryArr, activeKey])
    // 左边点击事件，onChange事件{}里写个方法，默认参数值局势点击的那个item
    const leftClick = (val) => {
        setActiveKey(val) // 自带的setActiveKey也要写上，更新为活跃item
    }
    // const rightClick = (keyword) => {
    //     props.history.push('/list?title=' + keyword) // query传参，刷新不丢失
    // }
    const clickB = (id) => {
        console.log(id) // 成功拿到id
        getTokenA({ mobile: '13407254208', deviceId: '16588027066856262308', deviceName: 'iPhone', pwd: '12345678a', token: '' }).then(res => {
            // 存储tokena，因为商品详情页需要不仅需要id还需要token，作为发送请求的参数
            setToken('tokena', res.data.token)
        })
        props.history.push('/detail?id=' + id)
    }
    return (
        <CntStyle>
            {/* 后台id传递的数字类型，这里使用要转字符串类型 */}
            <SideBar style={{ '--width': '100px', '--height': '100vh' }} defaultActiveKey={activeKey} activeKey={activeKey} onChange={leftClick}>
                {props.categoryArr.map((item, index) => (
                    <SideBar.Item key={item.id} title={item.name} />
                ))}
            </SideBar>
            {/* 右侧内容 */}
            <div className='rightul'>
                <ul>
                    {/* arr最好直接使用&&,解决出现undefined情况（依赖两个变量可能一个已经有值一个还没值）无法使用map报错 */}
                    {x ? arr.map((item, index) => {
                        return (<li onClick={() => clickB(item.id)} key={index} style={{ marginBottom: '40px' }}>
                            <img src={item.pic} style={{ width: '100%', height: '128px', marginBottom: '3px' }} alt='' />
                            <p style={{ fontSize: '14px', width: '128px', height: '40px', lineHeight: '20px', overflow: 'hidden', display: '-webkit-box', 'WebkitLineClamp': '2', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis' }}>{item.name}</p>
                            <p style={{ textAlign: 'left', fontSize: '16px', color: 'blue' }}>￥{item.minPrice}</p>
                        </li>)
                    }) : <Space block direction='vertical' style={{ '--gap': '16px', paddingTop: '50px' }}>
                        <ErrorBlock status='empty' />
                    </Space>}
                </ul>
            </div>
        </CntStyle>
    )
}

export default withRouter(CategoryContent)
