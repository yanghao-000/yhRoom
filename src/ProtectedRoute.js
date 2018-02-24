import React from 'react'
import {toValidate} from './api/session'
import {withRouter} from 'react-router-dom'

@withRouter
export default class ProtectedRoute extends React.Component{
   async componentDidMount(){
      let {user} = await toValidate()
      if(!user){
         this.props.history.push('/login')
      }
   }
   render(){
      let C = this.props.component  //将组件渲染出来
      return <C/>
   }
}