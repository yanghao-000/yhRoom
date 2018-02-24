import React from 'react'
import './index.less'
import {withRouter} from 'react-router-dom'

@withRouter
export default class MHeader extends React.Component{
   back = ()=>{
      this.props.history.goBack() //路由渲染出来的才有history等，不然要引入withRouter
      // window.history.go(-1)
   }
   render(){
      return <div className="m-header">
         <i className="iconfont icon-fanhui" onClick={this.back}></i>
         {this.props.children}
      </div>
   }
}