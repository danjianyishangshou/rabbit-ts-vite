import { defineStore } from 'pinia'
import { Profile } from '@/types/user'
import { ApiRes } from '@/types/data'
import request from '@/utils/request'
import { setProfile, getProfile, removeProfile } from '@/utils/storage'
export default defineStore({
    id: 'user',
    state() {
        return {
            // 数据首先从本地取
            profile: getProfile() as Profile
        }
    },
    actions: {
        /**
         * 用户账号登录
         * @param account 
         * @param password 
         */
        async login(account: string, password: string) {
            const res = await request.post<ApiRes<Profile>>('/login', {
                account,
                password,
            })
            this.profile = res.data.result
            // 数据存到本地
            setProfile(res.data.result)
        },
        /**
         * 手机号验证码登录
         * @param mobile 
         * @param code 
         */
        async mobileLogin(mobile: string, code: string) {
            const res = await request.post<ApiRes<Profile>>('/login/code', {
                mobile,
                code
            })
            this.profile = res.data.result
            // 数据存到本地
            setProfile(res.data.result)
        },
        /**
         * 获取验证码
         */
        async sendCodeMag(mobile: string) {
            await request.get('/login/code', { params: { mobile } })
        },
        /**
         * 退出登录
         */
        logout() {
            this.profile = {} as Profile
            removeProfile()
        }
    },
    getters: {}
})