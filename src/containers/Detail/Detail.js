import React from 'react'
import './index.less'
import MHeader from '../../components/MHeader/MHeader'
import {getLesson} from '../../api/home'
import 'babel-polyfill'

export default class Detail extends React.Component{
   constructor(){
      super()
      this.state = {lesson:{}}
   }
   async componentWillMount(){
      //如果state有值 说明是点击过来的 否则取id进行服务端查询（不用存redux，不需要共享）
      let lesson = this.props.location.state
      if(!lesson){
         lesson = await getLesson(this.props.match.params.lessonId)  //去路径上的参数,lessonId在路由配置是写好
      }
      this.setState({lesson:lesson})
   }
   render(){
      return <div className="detail">
         <MHeader>详情页</MHeader>
         <video src={this.state.lesson.video} poster={this.state.lesson.poster} controls={true}></video>
      </div>
   }
}