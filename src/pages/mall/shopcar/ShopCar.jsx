import React, { useState, useEffect } from 'react'
import BeforeLogin from './components/BeforeLogin'
import { getToken } from '../../../utils/cookieUtils'
import AfterLogin from './components/AfterLogin'
import { FooterStyle } from './ShopStyle'
import { getShopCar, removeGood } from '@a/shopCarApi'
import './css/ShopCarStyle.css'

const ShopCar = () => {
    const [goodCar, setGoodCar] = useState('')
    const [isAll, setIsAll] = useState(1) // 是否全选
    const [keyArr, setKeyArr] = useState([]) // 选中就存放key
    const [editAct, setEditAct] = useState(false)

    var isToken = getToken('token') // 自己做的token，判断有没有token->用户是否登录
    var tokena = getToken('tokena') // 获取真实后台的token
    useEffect(() => {
        // 如果已登录，请求用户购物车数据[传递参数为token]
        updateData()
        // eslint-disable-next-line
    }, [])
    // 获取数据
    var updateData = () => {
        getShopCar({ token: tokena }).then(res => {
            if (res.code === 0) {
                // console.log(res.data) // 成功拿到购物车数据，注意是对象
                setGoodCar(res.data)
                setKeyArr(res.data.items.map(item => item.key))
                if (keyArr.length === res.data.items.length) {
                    setIsAll(true)
                }
            } else if (res.code === 700) {
                setGoodCar('')
                setKeyArr([])
                setIsAll(false)
            }
        })
    }
    // 选中所有
    const clickAll = () => {
        setIsAll(!isAll)
        setKeyArr(() => {
            if (isAll) {
                console.log(isAll)
                return []
            } else {
                return goodCar.items.map(item => item.key)
            }
        })
    }
    // 单选
    const singleSelect = (key) => {
        var index = keyArr.findIndex(item => item === key)
        if (index !== -1) {
            let arr = JSON.parse(JSON.stringify(keyArr))
            arr.splice(index, 1)
            if (arr.length === goodCar.items.length) {
                setIsAll(true)
            } else {
                setIsAll(false)
            }
            setKeyArr(arr)
        } else {
            let arr = JSON.parse(JSON.stringify(keyArr))
            arr.push(key)
            if (arr.length === goodCar.items.length) {
                setIsAll(true)
            } else {
                setIsAll(false)
            }
            setKeyArr(arr)
        }
    }
    // note: 计算选中商品数量【直接封装，在页面上调用，数据都是响应式的，视图也会跟随变化】
    const sumA = () => {
        var a = 0
        goodCar && goodCar.items.forEach(item => {
            if (keyArr.includes(item.key)) {
                a += item.number
            }
        })
        return a
    }
    // 计算选中商品总价
    const sumPrice = () => {
        var b = 0
        goodCar && goodCar.items.forEach(item => {
            if (keyArr.includes(item.key)) {
                b += item.number * item.price
            }
        })
        return b
    }
    // 编辑
    const editClick = () => {
        setEditAct(!editAct)
    }
    // 删除商品
    const removeClick = () => {
        console.log(keyArr.length) // 删除选中长度没有问题，里面放的是对应要删除的元素【判断用户删除空】
        if (keyArr.length === 0) {
            return false
        } else {
            // 把选中商品key和token传递给后台
            var formData = new FormData()
            formData.append('key', keyArr.join())
            formData.append('token', tokena)
            removeGood(formData).then(res => {
                if (res.code === 0 || res.code === 700) {
                    // 删除成功，发请求更新一下数据
                    updateData()
                }
            })
        }
    }
    return (
        <>
            {/* 未登录购物车/已经登录购物车 */}
            {
                isToken
                    ?
                    <>
                        {goodCar && <AfterLogin editAct={editAct} editClick={editClick} singleSelect={singleSelect} keyArr={keyArr} updateData={updateData} goodCar={goodCar}></AfterLogin>}
                        <FooterStyle>
                            <label style={{ fontSize: '16px' }} htmlFor=""><input checked={isAll} onChange={clickAll} style={{ width: '20px', height: '20px' }} type="checkbox" /> 全选</label>
                            <p className={editAct ? 'noshow' : 'show'} style={{ fontSize: '16px', width: '150px', textAlign: 'center' }}>合计：<span style={{ color: 'green', fontSize: '20px', fontWeight: 'bold' }}>￥{sumPrice().toFixed(2)}</span></p>
                            {editAct
                                ?
                                <button onClick={removeClick}>删除<span>({sumA()})</span></button>
                                :
                                <button>去结算<span>({sumA()})</span></button>
                            }
                        </FooterStyle>
                    </>
                    :
                    <BeforeLogin />
            }
        </>
    )
}

export default ShopCar
