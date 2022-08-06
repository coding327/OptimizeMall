import React, { Component } from 'react'
// 引入Swiper轮播组件
import { Swiper } from 'antd-mobile'
// 引入轮播样式
import { SwiperStyle } from '../StyledHome'

class MySwiper extends Component {
    render() {
        return (
            <SwiperStyle>
                {/* 开启自动播放和循环 */}
                <Swiper autoplay loop>
                    {this.props.swiperArr.map(item => {
                        return (
                            <Swiper.Item key={item.id} >
                                <img src={item.picUrl} alt="11" style={{height: '180px'}}/>
                            </Swiper.Item>
                        )
                    })}
                </Swiper>
            </SwiperStyle>
        )
    }
}

export default MySwiper
