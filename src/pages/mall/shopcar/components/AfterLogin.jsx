import React from 'react'
import { NavBar, Space } from 'antd-mobile'
import { AfterStyle } from '../ShopStyle'
import { getToken } from '../../../../utils/cookieUtils'
import { updateCar } from '@a/shopCarApi'
import car from '@s/videos/shopping-cart.mp4'

const AfterLogin = (props) => {
    var tokena = getToken('tokena')
    // 商品数量加1，发送添加请求[参数数量加1、商品的key通过点击事件传递过来，第三个参数token]
    const add = (number, key) => {
        // console.log(number)
        // console.log(key)
        updateCar({ number: number + 1, key, token: tokena }).then(res => {
            // console.log(res.code) // 加1成功
            if (res.code === 0) {
                props.updateData() // 通知父组件更新
            }
        })
    }
    // 商品数量减1，发送减1请求
    const sub = (number, key) => {
        // console.log(number)
        // console.log(key)
        updateCar({ number: number - 1, key, token: tokena }).then(res => {
            // console.log(res.code) // 0，减1成功
            if (res.code === 0) {
                props.updateData() // 通知父组件更新
            }
        })
    }
    return (
        <>
            <AfterStyle>
                <div className='boxxc'>
                    <NavBar style={{ borderBottom: '1px solid #ddd' }} backArrow={<video src={car} width="40" height="40" autoPlay loop muted type="video/mp4"></video>} left='购物车' right={<div onClick={props.editClick}>{props.editAct ? '完成' : '编辑'}</div>} ></NavBar>
                    {/* 每个space对应一条数据 */}
                    {
                        props.goodCar.items.map(item => {
                            return <Space key={item.key} direction='vertical' block>
                                <div className='boxxd'>
                                    <input onChange={() => props.singleSelect(item.key)} checked={props.keyArr.includes(item.key)} style={{ width: '20px', height: '20px' }} type="checkbox" />
                                    <img src={item.pic} alt="" />
                                    <div className='boxxe'>
                                        <div className='boxxf'>
                                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{item.name}</h2>
                                            <span>{item.sku.reduce((prev, curr) => prev.concat(',') + curr.optionValueName, '').slice(1)}</span>
                                        </div>
                                        <div className='boxxg'>
                                            <span style={{ marginRight: '12px', fontSize: '20px', fontWeight: 'bold', color: '#45b79b' }}>￥{item.price.toFixed(2)}</span>
                                            <button onClick={() => sub(item.number, item.key)} disabled={item.number === 1}>-</button>
                                            <span style={{ display: 'inline-block', width: '25px', height: '25px', textAlign: 'center', lineHeight: '25px', background: '#ebedf0' }}>{item.number}</span>
                                            <button onClick={() => add(item.number, item.key)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </Space>
                        })
                    }
                    {/* <Space  direction='vertical' block>
                    <div className='boxxd'>
                        <input style={{width: '20px', height: '20px'}} type="checkbox" />
                        <img src={aaa} alt="" />
                        <div className='boxxe'>
                            <div className='boxxf'>
                                <h2 style={{fontSize:'18px', fontWeight: 'bold', marginBottom: '8px'}}>Redmi 7A[1种规格]</h2>
                                <span>冰川蓝</span>
                            </div>
                            <div className='boxxg'>
                                <span style={{fontSize: '24px', fontWeight: 'bold', color: 'green'}}>￥359.40</span>
                                <button disabled={true}>-</button>
                                <span style={{ lineHeight: '22px'}}>1</span>
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                </Space>
                <Space  direction='vertical' block>
                    <div className='boxxd'>
                        <input style={{width: '20px', height: '20px'}} type="checkbox" />
                        <img src={aaa} alt="" />
                        <div className='boxxe'>
                            <div className='boxxf'>
                                <h2 style={{fontSize:'18px', fontWeight: 'bold', marginBottom: '8px'}}>Redmi 7A[1种规格]</h2>
                                <span>冰川蓝</span>
                            </div>
                            <div className='boxxg'>
                                <span style={{fontSize: '24px', fontWeight: 'bold', color: 'green'}}>￥359.40</span>
                                <button disabled={true}>-</button>
                                <span style={{ lineHeight: '22px'}}>1</span>
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                </Space> */}
                </div>
            </AfterStyle>
        </>
    )
}

export default AfterLogin
