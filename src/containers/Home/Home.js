import React from 'react'
import HomeHeader from './HomeHeader'
import './index.less'

export default class Home extends React.Component{
   // 选择当前哪门课程，做筛选用
   selectCurrentLesson = (val)=>{
      alert(val)
   }
   render(){
      return <div>
         <HomeHeader selectCurrentLesson={this.selectCurrentLesson}></HomeHeader>
      </div>
   }
}