import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getSingleGood, getAddGood } from '@a/detailApi'
import { getUserInfo } from '@a/userInfoApi'
import { param2Obj } from '../../utils/urlUtils'
import { getToken } from '../../utils/cookieUtils'
import DetailList from './components/DetailList'
import { TabBar, Toast, Mask, Popup, Badge } from 'antd-mobile'
import {
    AppOutline,
    MessageFill,
    TruckOutline,
} from 'antd-mobile-icons'
import { TabStyled } from './detailStyle'
// 引入活跃样式
import './css/activeStyle.css'

const Detail = (props) => {
    const [visible1, setVisible1] = useState(false)
    const [good, setGood] = useState('')
    const [activeKey] = useState('')
    // 活跃版本
    const [benId, setBenId] = useState('')
    // 活跃颜色
    const [ysId, setYsId] = useState('')
    // 加入购物车商品数量
    const [number, setNumber] = useState(1)
    // 购物车图标处的数量
    const [numberT, setNumberT] = useState('')
    // 显示遮罩层
    const [visible, setVisible] = useState(false)
    var id = param2Obj(props.history.location.search).id
    // console.log(id) // 成功拿到id
    var tokena = getToken('tokena')
    useEffect(() => {
        getSingleGood({ id, token: tokena }).then(res => {
            setGood(res.data)
            console.log(res.data)
            if (res.data.basicInfo.stores === 0) {
                // 该商品已经卖光
                setVisible(true)
                Toast.show({
                    content: '该商品已售罄，去看看其他商品吧！',
                    afterClose: () => {
                        props.history.push('/')
                    },
                })
            }
        })
        getUserInfo({ token: tokena }).then(res => {
            if (res.code === 0) {
                // console.log(res.data.number) // 成功拿到购物车加购的商品数量
                setNumberT(res.data.number)
            }
        })
        // eslint-disable-next-line
    }, [])
    // tabs
    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />
        },
        {
            key: 'customerService',
            title: '客服',
            icon: <MessageFill />
        },
        {
            key: 'shopcar',
            title: '购物车',
            // note: 图标ui组件上也可以使用徽标，在右上角展示数字、文字、小红点
            icon: <><TruckOutline /><Badge content={numberT} /></>
        },
    ]
    const clickA = (val) => {
        if (val === 'home') {
            props.history.push('/')
        } else if (val === 'customerService') {
            // 弹出未开放客服
            Toast.show({
                content: '未开放客服！',
            })
        } else if (val === 'shopcar') {
            props.history.push('/mall/shopcar')
        }
    }
    // 显示底部弹出层
    const clickJ = () => {
        setVisible1(true)
    }
    // 点击数量加1
    const add = () => {
        setNumber(number + 1)
    }
    // 数量减1
    const sub = () => {
        setNumber(number - 1)
    }
    // 显示活跃版本
    const showac = (id) => {
        console.log(id) // 版本id
        id === benId ? setBenId('') : setBenId(id)
    }
    // 显示活跃颜色
    const showys = (id) => {
        console.log(id) // 颜色id
        id === ysId ? setYsId('') : setYsId(id)
    }
    // 添加购物车
    const addCar = () => {
        var sku = []
        // 选项id
        // 版本颜色只要一个为空，说明只有一种选项的
        if (benId === '' || ysId === '') {
            sku.push({ optionId: good.properties[0].id, optionValueId: benId })
        } else {
            sku.push(
                { optionId: good.properties[0].id, optionValueId: benId },
                { optionId: good.properties[1].id, optionValueId: ysId },
            )
        }
        var formData = new FormData()
        formData.append('goodsId', id)
        formData.append('number', number)
        formData.append('sku', JSON.stringify(sku))
        formData.append('token', tokena)
        getAddGood(formData).then(res => {
            if (res.code === 0) {
                // 添加成功，隐藏底部弹出层
                setVisible1(false)
                // 更新购物车图标数量
                getUserInfo({ token: tokena }).then(res => {
                    if (res.code === 0) {
                        // console.log(res.data.number) // 成功拿到购物车加购的商品数量
                        setNumberT(res.data.number)
                    }
                })
            }
        })
    }
    return (
        <>
            <Mask visible={visible} onMaskClick={() => setVisible(false)} />
            <div>
                <img style={{ width: '100%', height: '375px' }} src={good.pics2} alt="" />
                {/* note: 等待数据请求过来再渲染子组件，并把数据传递给子组件 */}
                {good && <DetailList good={good} />}
            </div>
            <TabStyled>
                <TabBar activeKey={activeKey} onChange={clickA}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
                <button onClick={clickJ} className='leftbtn'>加入购物车</button>
                <button onClick={clickJ}>立即购买</button>
            </TabStyled>
            <Popup
                visible={visible1}
                showCloseButton
                onClose={() => { setVisible1(false) }}
                onMaskClick={() => {
                    setVisible1(false)
                }}
                bodyStyle={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    height: '52vh'
                }}
            >
                <div style={{ display: 'flex', margin: '20px 0' }}>
                    <img style={{ width: '100px', height: '100px', marginLeft: '20px' }} src={good && good.pics2[0]} alt="" />
                    <div>
                        <p>{good && good.basicInfo.name}</p>
                        <p style={{ fontSize: '24px', margin: '10px 0', color: '#1ba784' }}>￥{good && good.basicInfo.originalPrice.toFixed(2)}~{Math.max(...(good && good.skuList.map(item => item.originalPrice))).toFixed(2)}</p>
                        <p style={{ marginBottom: '10px' }}>剩余{good && good.skuList.reduce((prev, curr) => prev + curr.stores, 0)}件</p>
                        <p>请选择&nbsp;版本颜色</p>
                    </div>
                </div>
                <h2 style={{ padding: '0 15px' }}>{good.properties && good.properties[0].name}</h2>
                <div style={{ display: 'flex', padding: '5px 15px' }}>
                    {good && good.properties[0].childsCurGoods.map(item => {
                        return <div className={item.id === benId ? 'showBG' : ''} onClick={() => showac(item.id)} key={item.id} style={{ fontSize: '12px', width: '80px', height: '30px', lineHeight: '30px', textAlign: 'center', margin: '0 8px', background: '#f7f8fa', borderRadius: '5px' }}>{item.name}</div>
                    })}
                </div>
                <h2 style={{ padding: '0 15px' }}>{ good.properties && good.properties[1] && (good.properties[1].name === '颜色' ? '颜色' : '')}</h2>
                <div style={{ display: 'flex', padding: '5px 15px' }}>
                    {good && good.properties && good.properties[1] && good.properties[1].childsCurGoods && good.properties[1].childsCurGoods.map(item => {
                        return <div className={item.id === ysId ? 'showBG' : ''} onClick={() => showys(item.id)} key={item.id} style={{ fontSize: '12px', width: '80px', height: '30px', lineHeight: '30px', textAlign: 'center', margin: '0 8px', background: '#f7f8fa', borderRadius: '5px' }}>{item.name}</div>
                    })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px' }}>
                    <p>购买数量</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button onClick={sub} disabled={number === 1} style={{ width: '25px', height: '25px', background: '#ebedf0' }}>-</button>
                        <span style={{ margin: '0 6px', display: 'inline-block', width: '25px', height: '25px', lineHeight: '25px', textAlign: 'center', background: '#ebedf0' }}>{number}</span>
                        <button onClick={add} style={{ width: '25px', height: '25px', background: '#ebedf0' }}>+</button>
                    </div>
                </div>
                <button onClick={addCar} style={{ width: '92%', height: '44px', background: '#07c160', margin: '0px 15px 0', borderRadius: '22px', color: '#fff' }}>确定</button>
            </Popup>
        </>
    )
}

export default withRouter(Detail)
