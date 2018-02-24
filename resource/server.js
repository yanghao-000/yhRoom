let express = require('express')
let session = require('express-session')
let app = express()
let sliders = require('./mock/sliders')
let lesssons = require('./mock/lessons')
let crypto = require('crypto')
let userList = []
app.listen(3000)

let bodyParser = require('body-parser')
app.use(bodyParser.json())  //解析请求体的中间件 req.body为解析后结果

app.use(session({
   resave:true, //每次重新保存
   saveUninitialized:true,  //是否保存未初始化的状态
   secret:'zfpx'
}))//req.session设置内容

// //配跨域 cors
// app.use(function(req, res, next){
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//    res.header("X-Powered-By",' 3.2.1')
//    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
//    else next();
// })
// cors是一个第三方模块 专门解决跨域
app.use(function (req,res,next) {
   res.header("Access-Control-Allow-Origin", "http://localhost:9000"); //允许指定的地址跨域
   res.header("Access-Control-Allow-Credentials",true);   //后台允许带凭证
   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   if(req.method=="OPTIONS") res.send();/*让options请求快速返回*/
   else  next();
});

// 通过axios 从别的服务器请求数据到我的服务器
let axios = require('axios')

// 轮播图数据接口
// app.get('/sliders', function (req, res) {
//    axios.get('http://www.html5train.com/orgHomePage.do?action=getOrgHomePageInfo&layoutType=default&organizationId=510&_=1518061000955').then(function (data) {
//       // console.log(res.data);
//       res.json(data.data.moduleDTOList.list[0].moduleMap.map.pictureDTOList.list)
//    })
// })

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

// 根据id获取某课程信息
app.get('/lesson/:id', function (req, res) {
   let {id} = req.params
   let lesson = lesssons.find(item=>parseInt(item.id) === parseInt(id)) || {}
   res.json(lesson)
})


// 先注册 再 登录 {user:'用户名', msg:'账号重复', err:0, success:'成功'}
app.post('/reg', function (req, res) {  //username: password
   let {username, password} = req.body
   let user = userList.find(item=>item.username==username)
   if(user){
      res.json({user:null, msg:'用户已存在', err:1, success:''})
   }else{
      //摘要算法 md5: 不可逆 加密后长度一样
      password = crypto.createHash('md5').update(password).digest('base64')
      userList.push({username, password})
      res.json({user:username, msg:'恭喜你注册成功', err:0, success:'恭喜你注册成功'})
   }
})

// let crypto = require('crypto')
// console.log(crypto.createHash('md5').update('123456').digest('base64'));

// 登录
app.post('/login', function (req, res) {  //username: password
   let {username, password} = req.body
   password = crypto.createHash('md5').update(password).digest('base64')
   let user = userList.find(item=>item.username==username && item.password==password)
   if(user){
      req.session.user = req.body.username  //相当于登录成功后将用户名保存在session中 session依赖cookie
      res.json({user:username, msg:'恭喜你登录成功', err:0, success:'恭喜你登录成功'})
   }else{
      res.json({user:null, msg:'用户不存在', err:1, success:''})
   }
})

// 验证session 判断登录
app.get('/validate', function (req, res) {
   // 用于校验用户是否登录
   res.json({user:req.session.user, msg:'', err:0, success:''})
})