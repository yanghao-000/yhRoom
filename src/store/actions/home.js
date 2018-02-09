import * as Types from '../action-types'
import {getLessons, getSliders} from "../../api/home";

let action = {
   // 更新当前选择的课程
   updateCurrentLesson(lesson){
      return {
         type: Types.SET_CURRENT_LESSON,
         lesson: lesson,
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
   }
}

export default action