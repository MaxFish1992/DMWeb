import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';        //配置请求头
axios.defaults.baseURL = 'http://192.168.1.105:8090/';// http://192.168.1.105:8090/     http://localhost:50792/  //配置接口地址
axios.defaults.headers.common['Authority'] = 'Bearer ' + localStorage.getItem('token');

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    });
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    //对响应数据做些事
    if (!res.data.success) {
        // localStorage.removeItem('Authority');
        // _this.$router.push('/login');
        return Promise.resolve(res);
    }
    return res;
}, error => {
    if(error.response){
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('Authorization');
          this.$router.push('/login');
      }
    }
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: param })
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    fetchPost,
    fetchGet,
}