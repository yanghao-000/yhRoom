import React, {Component} from 'react'
import ReactDOM, {render} from 'react-dom'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// // 路由配置
// import Home from './containers/Home/Home'
// import Lesson from './containers/Lesson/Lesson'
// import Profile from './containers/Profile/Profile'
// import Detail from './containers/Detail/Detail'
// import Login from './containers/Login/Login'
// import Regs from './containers/Reg/Reg'

// 路由配置
import Detail from './containers/Detail/Detail'
import Login from './containers/Login/Login'
import Regs from './containers/Reg/Reg'
import SyncComponent from './SyncComponent'
let Home = SyncComponent(()=>import('./containers/Home/Home'))
let Lesson = SyncComponent(()=>import('./containers/Lesson/Lesson'))
let Profile = SyncComponent(()=>import('./containers/Profile/Profile'))


// app组件
import App from './containers/App'
// 连接react 和 redux
import {Provider} from 'react-redux'
import store from './store/index'
import Reg from "./containers/Reg/Reg";
// 受保护的route 登录后才有权限进入
import ProtectedRoute from "./ProtectedRoute";



ReactDOM.render(
   <Provider store={store}>
      <Router>
         <App>
            <Switch>  {/*匹配path 匹配后不在匹配*/}
               <Route path="/" exact={true} component={Home}/>
               <ProtectedRoute path="/lesson" component={Lesson}/>
               <Route path="/profile" component={Profile}/>
               <Route path="/detail/:lessonId" component={Detail}/>
               <Route path="/login" component={Login}/>
               <Route path="/reg" component={Regs}/>
            </Switch>
         </App>
      </Router>
   </Provider>, window.root);