import React from 'react'
import './index.less'
import bg from '../../common/images/login_bg.png'
import avatar from '../../common/images/profile.png'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../store/actions/session'

@connect(state=>({...state.session}), actions)
export default class Profile extends React.Component{
   componentDidMount(){
      this.props.toValidateAPI()  //校验用户登录
   }
   render(){
      return (
         <div className="profile">
            <div className="profile-bg">
               <img src={bg} className="bg" alt=""/>
               <img src={avatar} className="avatar" alt=""/>
               {this.props.user ? <a className="login-btn">{this.props.user}</a> : <Link to={'/login'} className="login-btn">登录</Link>}
            </div>
         </div>
      )
   }
}