import React from 'react'
import './index.less'
import HomeHeader from './HomeHeader'
import HomeSlider from './HomeSlider'
import HomeList from './HomeList'
import {connect} from 'react-redux'
import actions from '../../store/actions/home'
import Loading from "../../components/Loading/Loading";
import {loadMore, pullRefresh} from '../../common/util'

@connect(state=>({...state.home}),actions)  //把组件和redux连接起来
export default class Home extends React.Component{
   componentDidMount(){
      // 请求轮播图数据
      if(this.props.sliders.length === 0){
         this.props.getSlidersAPI()
      }
      // 请求轮播图数据
      if(this.props.lesson.list.length === 0){
         this.props.getLessonsAPI()
      }
      loadMore(this.ele, this.props.getLessonsAPI)
      pullRefresh(this.ele, this.props.refreshAPI)
   }
   // 选择当前哪门课程，做筛选用
   selectCurrentLesson = (val)=>{
      this.props.updateCurrentLesson(val)
   }
   // 点击加载更多
   // loadMore = ()=>{
   //    this.props.getLessonsAPI()
   // }
   render(){
      return <div>
         <HomeHeader selectCurrentLesson={this.selectCurrentLesson}></HomeHeader>
         <div className="content" ref={x=>this.ele=x}>  {/*获取元素*/}
            {this.props.sliders.length ? <HomeSlider lists={this.props.sliders}></HomeSlider> : <Loading></Loading>}
            <h2 className="home-title">
               <i className="iconfont icon-wode_kecheng"></i>
               <span> 我的课程</span>
            </h2>
            <HomeList lists={this.props.lesson.list}></HomeList>
            {/*加载时显示loading*/}
            {this.props.lesson.isLoading ? <Loading></Loading> : null}
            {/*<button onClick={this.loadMore}>加载更多</button>*/}
         </div>
      </div>
   }
}
// connect()(Home)