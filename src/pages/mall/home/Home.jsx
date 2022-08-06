import React, { useState, useEffect } from 'react'
// 引入轮播组件
import MySwiper from './components/Swiper'
// 引入商品列表
import Good from './components/Good'
// 引入轮播图图片api
import { getSwiperData, getGoods } from '@a/homeApi'
import { Space, SpinLoading } from 'antd-mobile'


const Home = () => {
    const [swiperArr, setSwiperArr] = useState([])
    const [goodArr, setGoodArr] = useState([])
    useEffect(() => {
        getSwiperData({ type: 'indexBanner' }).then(res => {
            if (res.code === 0) {
                setSwiperArr(res.data)
            }
        })
        getGoods().then(res => {
            if (res.code === 0) {
                setGoodArr(res.data.result)
            }
        })
    }, [])
    return (
        <>
            {
                swiperArr.length !== 0 && goodArr.length !== 0
                    ?
                    <>
                        <MySwiper swiperArr={swiperArr} />
                        <Good goodArr={goodArr} />
                        <p style={{ height: '60px', lineHeight: '60px', textAlign: 'center', paddingBottom: '50px' }}>没有更多了</p>
                    </>
                    :
                    <Space direction='horizontal' wrap block style={{ '--gap': '50px', height: '100vh', paddingTop: '240px', paddingLeft: '165px' }}>
                        <SpinLoading color='primary' />
                    </Space>
            }
        </>
    )
}

export default Home

