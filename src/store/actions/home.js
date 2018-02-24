import * as Types from '../action-types'
import {getLessons, getSliders} from "../../api/home";
import {CLEAR_LESSONS} from "../action-types";

let action = {
   // 更新当前选择的课程
   updateCurrentLesson(lesson){
      return function (dispatch, getState) {
         dispatch({
            type: Types.SET_CURRENT_LESSON,
            lesson: lesson,
         })
         action.refreshAPI()(dispatch, getState)
      }
   },
   getSlidersAPI(){
      return function (dispatch, getState) {  //store.getState // redux-thunk 返回一个函数 把dispatch返回让它们自己执行
         dispatch({type: Types.SET_SLIDERS, payload: getSliders()})  //redux-promise的用法，可以将payload的promise执行，执行后将内容放到action.payload中进行派发{type:'SET_SLIDERS',payload:[]}
      }
   },
   getLessonsAPI(){
      return function (dispatch, getState) {
         let {
            currentLesson,
            lesson:{hasMore,offset,limit,isLoading}
         } = getState().home;
         // 是否有更多 再请求
         if (!hasMore || isLoading) return
         //发送前 loading状态为true
         dispatch({type: Types.CHANGE_LOADING_STATUS, status: true})
         //ajax课程列表
         dispatch({type: Types.SET_LESSONS, payload: getLessons(offset, limit, currentLesson)})
      }
   },
   refreshAPI(){
      return function (dispatch, getState) {
         dispatch({type: CLEAR_LESSONS}) //派发清空数据
         action.getLessonsAPI()(dispatch, getState) //获取最新数据
      }
   }
}

export default action