import Message from '@/components/message'
import useStore from '@/store'
import axios, { AxiosError } from 'axios'

// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
const example = axios.create({
    // 基地址
    baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
    // baseURL: 'https://apipc-xiaotuxian-front.itheima.net/',
    // 请求时长
    timeout: 5000
})

// 添加请求拦截器
example.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        const { user } = useStore()
        const token = user.profile.token
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
example.interceptors.response.use(
    function (response) {
        return response
    },
    function (error: AxiosError<{ message: string, code: string }>) {
        // 对响应错误做点什么
        if (error.response) {
            const { message, code } = error.response.data
            if (message === '三方登录失败' && code === '501') {
                Message.warning('亲,请于账号进行绑定', 3000)
            } else {
                Message.error(message)
            }
        } else {
            Message.error('网络异常,请稍后重试')
        }
        return Promise.reject(error)
    }
)
//example 实例  这是axios的实例
export default example