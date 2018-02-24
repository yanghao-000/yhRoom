import React from 'react'
import './index.less'
import {Link} from 'react-router-dom'
import MHeader from '../../components/MHeader/MHeader'
import {connect} from 'react-redux'
import actions from '../../store/actions/session'

@connect(state=>({...state.session}),actions) //...state.session {user: null,msg: '',success: '',err: 1}
export default class Reg extends React.Component{
   componentWillUnmount(){
      this.props.clearMessage()
   }
   regBtn = ()=>{
      this.props.toRegAPI(this.username.value, this.password.value, this.props.history)
   }
   render(){
      return (
         <div className="reg">
            <MHeader>注册</MHeader>
            <div className="div">
               <ul>
                  <li>
                     <label htmlFor="username">用户名</label>
                     <input type="text" id="username" ref={x=>this.username=x}/>
                  </li>
                  <li>
                     <label htmlFor="password">密码</label>
                     <input type="text" id="password" ref={x=>this.password=x}/>
                  </li>
                  <li>
                     {this.props.err===1 ? <p style={{color:'red'}}>{this.props.msg}</p> : null}
                     {this.props.success.length ? <p style={{color:'green'}}>{this.props.success}</p> : null}
                  </li>
                  <li>
                     <button onClick={this.regBtn}>注册</button>
                  </li>
               </ul>
            </div>
         </div>
      )
   }
}