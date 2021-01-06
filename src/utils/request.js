import axios from 'axios'

// import { Loading } from 'element-ui';
const request = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout: 10000
})

// //配置请求 拦截  ---   发送请求的触发,请求也没有
// // 添加请求拦截器
// const loading = {
//     LoadingService: null,
//     open() {
//         if (this.LoadingService == null) {
//             this.LoadingService = Loading.service({
//                 target: '.rightBox',
//                 text: '这破网太费劲了·······',
//                 background: 'rgba(0,0,0,0.5)',
//             })
//         }
//     },
//     close() {
//         if (this.LoadingService != null) {
//             this.LoadingService.close()
//         }
//         this.LoadingService = null
//     },
// }
// request.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     // 设置请求头信息
//     // config.headers['token'] = window.sessionStorage.getItem('token')
//     loading.open()
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
// //配置响应 拦截  ---   响应数据的时候触发,响应没有结束
// // 添加响应拦截器
// request.interceptors.response.use(function (response) {
//     loading.close()
//     // 对响应数据做点什么
//     return response;
// }, function (error) {
//     // 对响应错误做点什么
//     loading.close()
//     return Promise.reject(error);
// });


export default request