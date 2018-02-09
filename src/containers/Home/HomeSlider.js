import React from 'react'
import ReactSwipe from 'react-swipe';

export default class HomeSlider extends React.Component{
   constructor(){
      super()
      this.state = {
         index: 0,
      }
   }
   render(){
      let opts = {continuous: false, auto: 3000, callback:(index)=>{
         this.setState({index})  //轮播动画结束 将索引映射到当前组件状态上
      }}
      return <div className="home-swipe">
         <ReactSwipe className="carousel" swipeOptions={opts}>
            {this.props.lists.map((item, index)=>(
               <div key={index}>
                  <img src={item} alt=""/>
               </div>
            ))}
         </ReactSwipe>
         <div className="dots">
            {this.props.lists.map((item, index)=>(
               <span key={index} className={this.state.index===index?'active':''}></span>
            ))}
         </div>
      </div>
   }
}