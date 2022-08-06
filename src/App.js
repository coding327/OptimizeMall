import React, { Component } from 'react'
// 一级路由所需路由标签
import { Switch, Route, Redirect } from 'react-router-dom'
// 三个一级路由组件
import Mall from './pages/mall/Mall'
import Detail from './pages/detail/Detail'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import ForgetPwd from './pages/forgetPwd/ForgetPwd'
import VerCode from './pages/verCode/VerCode'
// 引入App.css全局样式
import './App.css'

class App extends Component {
    render() {
        return (
            <>
                <Switch>
                    {/* 有tab-bar的一级路由 */}
                    <Route path="/mall" component={Mall}></Route>
                    {/* 没有tab-bar的一级路由 */}
                    <Route path="/detail" component={Detail}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/forgetpwd" component={ForgetPwd}></Route>
                    <Route path="/vercode" component={VerCode}></Route>
                    {/* 重定向 */}
                    <Redirect from='/' exact to="/mall/home"></Redirect>
                </Switch>
            </>
        )
    }
}

export default App
