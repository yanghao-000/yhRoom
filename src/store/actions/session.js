import * as Types from '../action-types'
import {toReg,toLogin,toValidate} from '../../api/session'
let action = {
   // 注册成功后跳转页面 不能直接派发异步
   toRegAPI(username, password, history){   //history是组件中的
      return function (dispatch, getState) {
         toReg(username, password).then(function (data) {
            if(data.err===1){
               // 失败了 派发返回的空数据
            }else{
               // 成功了 跳转路径
               setTimeout(()=>{
                  // dispatch(action.clearMessage()) 在这里调用需要派发
                  history.push('/login')
               }, 1000)
            }
            // 派发返回数据
            dispatch({type:Types.SET_USER_INFO, user:data})
         })
      }
   },
   toLoginAPI(username, password, history){
      return function (dispatch, getState) {
         toLogin(username, password).then(function (data) {
            if(data.err===1){
               // 失败了 派发返回的空数据
            }else{
               // 成功了 跳转路径
               setTimeout(()=>{
                  history.push('/profile')
               }, 1000)
            }
            // 派发返回数据
            dispatch({type:Types.SET_USER_INFO, user:data})
         })
      }
   },
   toValidateAPI(){
     return function (dispatch, getState) {
         // dispatch({
         //    type: Types.SET_USER_INFO,
         //    payload: toValidate
         // })           //返回去是payload 如果不用payload做名字 自己处理异步
        toValidate().then(function(data){
           dispatch({
              type: Types.SET_USER_INFO,
              user: data
           })
        })
     }
   },
   clearMessage(){
      return {
         type:Types.CLEAR_MESSAGE,
         info:{msg:'', success:''}
      }
   }
}

export default action