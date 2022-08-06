import React, { useEffect } from 'react'
import { Image, Space } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { getTokenA } from '@a/tokenA'
import { setToken } from '../../../../utils/cookieUtils'

const Good = (props) => {
    useEffect(() => {
        console.log(props.goodArr)
    }, [props])
    const clickHandle = (id) => {
        // 点击详情页传入id
        console.log(id)
        // 需要token
        // mobile=13407254208&deviceId=16588027066856262308&deviceName=iPhone&pwd=12345678a
        getTokenA({ mobile: '13407254208', deviceId: '16588027066856262308', deviceName: 'iPhone', pwd: '12345678a', token: '' }).then(res => {
            if (res.code === 0) {
                // 存储tokena
                setToken('tokena', res.data.token)
            }
        })
        props.history.push('/detail?id=' + id)
    }
    return (
        <>
            <p style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold', padding: '15px 0', backgroundColor: 'white' }}>商品列表</p>
            <Space wrap style={{ margin: '0 0 0 12px' }}>
                {props.goodArr.map((item) => {
                    return (
                        <div onClick={() => clickHandle(item.id)} key={item.id}>
                            <Image src={item.pic} width={172} height={172} fit='fill' style={{ borderRadius: 6 }} />
                            <p style={{ fontSize: '14px', width: '156px', height: '38px', lineHeight: '20px', overflowWrap: 'break-word', wordBreak: 'break-word', wordWrap: 'break-word', padding: '1px 8px', backgroundColor: 'white', overflow: 'hidden', 'WebkitLineClamp': '2', textOverflow: 'ellipsis' }}>{item.name}</p>
                            <div style={{ padding: '5px 8px', backgroundColor: 'white', borderRadius: '0 0 6px 6px', height: '25px', lineHeight: '25px' }}>
                                <span style={{ color: 'blue', marginRight: '4px' }}>￥{item.minPrice}</span>
                                <span style={{ textDecoration: 'line-through', fontSize: '12px' }}>￥{item.originalPrice}</span>
                                <button style={{ borderRadius: '4px', backgroundColor: 'inherit', border: '1px solid blue', width: '45px', height: '25px', float: 'right' }}>购买</button>
                            </div>
                        </div>
                    )
                })}
            </Space>
        </>
    )
}

export default withRouter(Good)
