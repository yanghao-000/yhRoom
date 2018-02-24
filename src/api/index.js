import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true  //允许携带凭证（cookie）
// 请求拦截器
// axios.interceptors.request.use(function (res) {
//    return res.data
// })
// 响应拦截器
axios.interceptors.response.use(function (res) {
   return res.data
})
export default axios