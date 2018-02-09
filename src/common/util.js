// ele表示哪个元素需要加载更多 cb表示滚到底部时执行哪个方法
export function loadMore(ele,cb){
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