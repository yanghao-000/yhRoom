// ele表示哪个元素需要加载更多 cb表示滚到底部时执行哪个方法
export function loadMore(ele, cb){
   let timer;
   ele.addEventListener('scroll',function () {
      // 防抖
      // clearTimeout(timer); //scroll事件触发多次 只留最后一次
      // timer = setTimeout(()=>{
         // offsetHeight屏幕总高 scrollTop是卷去的高度  scrollHeight内容总高
         let {offsetHeight,scrollTop,scrollHeight} = ele;
         if(offsetHeight+scrollTop+20>=scrollHeight){
            cb();
         }
      // },30)
   },false);
}

export function pullRefresh(ele, cb) {
   let distance = ele.offsetTop
   let startY
   let move
   function touchmove(e) {
      move = e.touches[0].pageY-startY
      if(move>0){
         if(move>80){
            move = 80
         }
         console.log("下拉");
         //下拉刷新 移动盒子距离
         ele.style.top = move + distance + "px"
      }else{
         console.log("上拉");
         ele.removeEventListener('touchmove', touchmove)
         ele.removeEventListener('touchend', touchend)
      }
   }
   function touchend() {
      if(move<80){
         return ele.style.top = distance + "px"  //没有大于刷新的点 滚回去
      }
      let timer = setInterval(()=>{
         move = move-2
         if(move <= 0){
            clearInterval(timer)
            cb()
         }
         ele.style.top = move + distance + "px"
      })
      ele.removeEventListener('touchmove', touchmove)
      ele.removeEventListener('touchend', touchend)
   }
   function touchstart(e) {
      startY = e.touches[0].pageY  //记录开始位置
      // 盒子已滚动到头部 并且 不在下拉刷新中
      if(ele.scrollTop === 0 && ele.offsetTop === distance){
         console.log("ok");
         ele.addEventListener('touchmove', touchmove, false)
         ele.addEventListener('touchend', touchend, false)
      }
   }
   ele.addEventListener('touchstart', touchstart, false)
}