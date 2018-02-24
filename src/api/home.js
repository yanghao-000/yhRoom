import axios from './index'
// 获取轮播图
export function getSliders() {
   return axios.get('/sliders')
}
// 获取所有课程
export function getLessons(offset, limit, type) {
   return axios.get(`/lessons/${offset}/${limit}/${type}`)
}
//根据id获取某一门课程
export function getLesson(id) {
   return axios.get(`/lesson/${id}`)
}