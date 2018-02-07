import React, {Component} from 'react'
import ReactDOM, {render} from 'react-dom'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
// 路由配置
import Home from './containers/Home/Home'
import Lesson from './containers/Lesson/Lesson'
import Profile from './containers/Profile/Profile'
// app组件
import App from './containers/App'

ReactDOM.render(<Router>
   <App>
      <Switch>  {/*匹配path 匹配后不在匹配*/}
         <Route path="/" exact={true} component={Home}/>
         <Route path="/lesson" exact={true} component={Lesson}/>
         <Route path="/profile" exact={true} component={Profile}/>
      </Switch>
   </App>
</Router>, window.root);