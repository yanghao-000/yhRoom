import React from 'react'
import logo from '../../common/images/logo.png'
// 引入动画组件
import Transition from 'react-transition-group/Transition';
// 动画时间
const duration = 100
// 动画默认样式
const defaultStyle = {
   transition: `opacity ${duration}ms ease-in-out`,
   opacity: 0,
   display: 'none',
}
// 动画可能的状态
const transitionStyles = {
   entering: { opacity: 0 },
   entered:  { opacity: 1 },
}

export default class HomeHeader extends React.Component{
   constructor(){
      super()
      this.state = {
         isShow: false,
      }
   }
   // 隐藏显示 导航列表
   changeShow = ()=>{
      this.setState({
         isShow: !this.state.isShow,
      })
   }
   // 点击导航列表-获取数据-给父级
   headerListData = (e)=>{
      // 取父级的方法 把数据传给父级
      this.props.selectCurrentLesson(e.target.dataset.type)
      this.changeShow()
   }
   render(){
      return <div className="HomeHeader">
         <div className="header-logo">
            <img src={logo} />
            <div onClick={this.changeShow}>
               {this.state.isShow ? <i className="iconfont icon-guanbi"></i> : <i className="iconfont icon-liebiao"></i>}
               {/*<i className="iconfont icon-liebiao"></i>*/}
               {/*<i className="iconfont icon-guanbi"></i>*/}
            </div>
         </div>
         <Transition in={this.state.isShow} timeout={duration} onEnter={(node)=>{
            node.style.display = 'block'
         }} onExited={(node)=>{
            node.style.display = 'none'
         }}>
            {(state)=>(
               <ul className="header-menu" style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
               }} onClick={this.headerListData}>
                  <li data-type="all">全部课程</li>
                  <li data-type="react">React课程</li>
                  <li data-type="vue">Vue课程</li>
               </ul>
            )}
         </Transition>
      </div>
   }
}