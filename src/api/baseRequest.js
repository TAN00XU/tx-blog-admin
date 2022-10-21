import axios from "axios";
import store from '@/store'
import {Message} from "element-ui";

const request = axios.create({
    //基础URL
    baseURL: "http://localhost:8888",
    // baseURL: "https://admin.talkxj.com",
    timeout: 50000
});

// 添加请求拦截器
request.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        if (store.state.token) {
            config.headers['Authorization'] = localStorage.token
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject("发起请求错误：" + error);
    }
);

// 添加响应拦截器
request.interceptors.response.use(
    function (response) {
        console.log("请求成功", response)
        // 对响应数据做点什么
        switch (response.data.code) {
            case 40001:
                Message({
                    type: "error",
                    message: response.data.message,
                    showClose: true
                });
                this.$router.replace({path: "/login"});
                break;
            case 50000:
                Message({
                    type: "error",
                    message: response.data.message,
                    showClose: true
                });
                break;
        }
        return response;

    },
    error => {
        console.log("失败", error)
        Message({
            type: "error",
            message: '服务器被吃了(っ °Д °;)っ',
            showClose: true
        });
        // if (error.response.code === 504 || error.response.code === 404) {
        //     Message({
        //         type: "error",
        //         message: '服务器被吃了(っ °Д °;)っ',
        //         showClose: true
        //     });
        // } else {
        //     Message({
        //         type: "error",
        //         message: '服务器出错了::>_<::',
        //         showClose: true
        //     });
        // }

        // 对响应错误做点什么
        return Promise.reject("服务器响应出错！" + error);
    }
);


export default request;