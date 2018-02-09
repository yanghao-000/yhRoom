
let express = require('express')
let app = express()
app.listen(3000)
//配跨域 cors
app.use(function(req, res, next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1')
   if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
   else next();
})

// 通过axios 从别的服务器请求数据到我的服务器
let axios = require('axios')

// 轮播图数据接口
// app.get('/sliders', function (req, res) {
//    axios.get('http://www.html5train.com/orgHomePage.do?action=getOrgHomePageInfo&layoutType=default&organizationId=510&_=1518061000955').then(function (data) {
//       // console.log(res.data);
//       res.json(data.data.moduleDTOList.list[0].moduleMap.map.pictureDTOList.list)
//    })
// })
let sliders = require('./mock/sliders')
app.get('/sliders', function (req, res, next) {
   setTimeout(function(){
      res.json(sliders)
   },500)
})

// 获取课程接口
// 共20条 第一次5条 加载偏移5条
// offset 偏移量
// limit 每次取多少
// type 课程类型
let lesssons = require('./mock/lessons')
app.get('/lessons/:offset/:limit/:type', function (req, res, next) {
   let {offset, limit, type} = req.params;   //定义变量
   let lists = lesssons
   if(type !== 'all'){
      lists = lesssons.filter((item, i)=>{
         return item.type === type
      })
   }
   offset = parseInt(offset)
   limit = parseInt(limit)
   let newLists = lists.slice(offset, offset+limit)
   let hasMore = offset+limit >= lists.length ? false : true

   setTimeout(function(){
      res.json({
         hasMore,
         list:newLists,
      })
   },1500)
})