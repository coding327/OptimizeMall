import React, { Component } from 'react'
// 引入二级路由所需路由标签
import { Switch, Route } from 'react-router-dom'
// 引入二级路由组件
import Home from './home/Home'
import Category from './category/Category'
import ShopCar from './shopcar/ShopCar'
import Personal from './personal/Personal'
// 引入ant design的底部导航栏
import { TabBar } from 'antd-mobile'
// 引入tab-bar图标组件
import {
    AppOutline,
    UserOutline,
    UserSetOutline,
    UnorderedListOutline,
    TruckOutline
} from 'antd-mobile-icons'
// 引入样式
import { StyledMall, StyledTab, TabbarStyled } from './StyledMall'


class Mall extends Component {
    state = {
        activeKey: 'home'
    }
    setActiveKey = (val) => {
        // 默认有个val就是你所点击对应的key，更新活跃的key
        this.setState({ activeKey: val })
        // 触发跳转
        this.props.history.push('/mall/' + val)
    }
    // 刷新页面时候，下面的tab-bar显示不正确，通过路由更新activeKey
    componentDidMount() {
        // 挂载后
        switch (this.props.history.location.pathname) {
            case '/mall/category':
                this.setState({ activeKey: 'category' })
                break
            case '/mall/shopcar':
                this.setState({ activeKey: 'shopcar' })
                break
            case '/mall/personal':
                this.setState({ activeKey: 'personal' })
                break
            default:
                this.setState({ activeKey: 'home' })
        }
    }
    render() {
        const tabs = [
            {
                key: 'home',
                title: '首页',
                icon: <AppOutline />
            },
            {
                key: 'category',
                title: '分类',
                icon: <UnorderedListOutline />
            },
            {
                key: 'shopcar',
                title: '购物车',
                icon: <TruckOutline />
            },
            {
                key: 'personal',
                title: '个人中心',
                icon: active => active ? <UserOutline /> : <UserSetOutline />
            },
        ]
        return (
            <StyledMall>
                {/* 二级路由 */}
                <StyledTab>
                    <Switch>
                        <Route path="/mall/home" component={Home}></Route>
                        <Route path="/mall/category" component={Category}></Route>
                        <Route path="/mall/shopcar" component={ShopCar}></Route>
                        <Route path="/mall/personal" component={Personal}></Route>
                    </Switch>
                </StyledTab>
                {/* tab-bar底部导航栏 */}
                <TabbarStyled>
                    <TabBar activeKey={this.state.activeKey} onChange={this.setActiveKey}>
                        {tabs.map(item => (
                            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                        ))}
                    </TabBar>
                </TabbarStyled>
            </StyledMall>
        )
    }
}

export default Mall
