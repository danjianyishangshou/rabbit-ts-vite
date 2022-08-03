import { defineStore } from 'pinia'
import { Profile, validate, validateFrom } from '@/types/user'
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
         * QQ第三方登录
         * @param openId 
         */
        async qqLogin(openId: string) {
            const res = await request.post<ApiRes<Profile>>('/login/social', {
                unionId: openId,
                source: 6
            })
            // 1. 保存用户信息到 state 中
            this.profile = res.data.result
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
        },
        /**
         * 绑定qq的短信验证码
         * @param mobile 
         */
        async sendQQBindMsg(mobile: string) {
            await request.get('/login/social/code', {
                params: {
                    mobile
                }
            })
        },
        /**
        * 绑定qq
        * @param mobile 
        */
        async socialBindMsg(unionId: string, mobile: string, code: string) {
            const res = await request.post('/login/social/bind', {
                unionId,
                mobile,
                code
            })
            console.log(res)
            // 1. 保存用户信息到 state 中
            this.profile = res.data.result
            setProfile(res.data.result)
        },

        /**
         *  没有账号绑定qq的短信验证码
         * @param mobile 
         */
        async sendQQPathMsg(mobile: string) {
            await request.get('/register/code', {
                params: {
                    mobile
                }
            })
        },
        /**
         * 没有账号切没有绑定过qq信息的情况
         * @param data 
         */
        async qqPatchLogin(data: any) {
            console.log(data)

            const res = await request.post<ApiRes<Profile>>(
                `/login/social/${data.openId}/complement`,
                data
            )
            // 1. 保存用户信息到 state 中
            this.profile = res.data.result
            setProfile(res.data.result)
        }
    },
    getters: {}
})

