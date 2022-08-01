<script lang="ts" setup name="LoginForm">
import Message from '@/components/message'
import { useRouter } from 'vue-router'
import useStore from '@/store'
import { ref, watch } from 'vue'
// 表单验证
import { useField, useForm } from 'vee-validate'
// 时间定时器
// import { useIntervalFn } from '@vueuse/core'
import { useCountDown } from '@/utils/hooks'
import {
    accountRule,
    passwordRule,
    isAgreeRule,
    mobileRule,
    codeRule
} from '@/utils/validate'

const { time, start } = useCountDown(60)

const router = useRouter()
const { user } = useStore()
const type = ref<'account' | 'mobile'>('account')
//#region 
// const isAgree = ref(true)
// const changeFn = (value: boolean) => {
//     isAgree = value
// }

// const form = ref({
//     account: '13012345751',
//     password: '123456',
//     isAgree: true
// })
// const login = async () => {
//     if (!form.value.account) {
//         Message.error('用户名不能为空')
//         return
//     }
//     if (!form.value.password) {
//         Message.error('密码不能为空')
//         return
//     }
//     if (!form.value.isAgree) {
//         Message.error('请勾选已同意')
//         return
//     }
//     try {
//         await user.login(form.value.account, form.value.password)
//         Message.success('登录成功')
//         router.push('/')
//     } catch {
//         Message.error('密码或账号错误')
//     }
// }
//#endregion
const { validate, resetForm } = useForm({
    initialValues: {
        account: "cdshi0070",
        password: '123456',
        isAgree: true,
        mobile: '13012345747',
        code: '123456'
    },
    validationSchema: {
        account: accountRule,
        password: passwordRule,
        isAgree: isAgreeRule,
        mobile: mobileRule,
        code: codeRule,
    }
})
const { value: account, errorMessage: accountError } = useField<string>('account')
const { value: password, errorMessage: passwordError } = useField<string>('password')
const { value: isAgree, errorMessage: isAgreeError } = useField<boolean>('isAgree')
const { value: mobile, errorMessage: mobileError, validate: validateMobile } = useField<string>('mobile')
const { value: code, errorMessage: codeError } = useField<string>('code')


// 重置表单
watch(type, () => {
    resetForm()
})


// const { pause, resume } = useIntervalFn(() => {
//     time.value--
//     if (time.value <= 0) {
//         pause()
//     }
// }, 1000,
//     {
//         immediate: false
//     })


const mobileRef = ref<HTMLInputElement | null>(null)
const send = async () => {
    if (time.value > 0) return
    const result = await validateMobile()
    if (!result.valid) {
        mobileRef.value?.focus()
        return
    }
    await user.sendCodeMag(mobile.value)
    Message.success("获取验证码成功")
    // // 开启定时器
    start()
    // time.value = 60
    // resume()
}
const login = async () => {
    const result = await validate()
    if (type.value === 'account') {
        if (result.errors.account || result.errors.password || result.errors.isAgree) return
        await user.login(account.value, password.value)

    } else {
        if (result.errors.mobile || result.errors.code || result.errors.isAgree) return
        await user.mobileLogin(mobile.value, code.value)
    }
    Message.success('登录成功')
    router.push('/')
    //错误捕获在相应拦截器
}
</script>
<template>
    <div class="account-box">
        <div class="toggle">
            <a href="javascript:;" v-if="type === 'mobile'" @click="type = 'account'">
                <i class="iconfont icon-user"></i> 使用账号登录
            </a>
            <a href="javascript:;" v-else @click="type = 'mobile'">
                <i class="iconfont icon-msg"></i> 使用短信登录
            </a>
        </div>
        <div class="form">
            <template v-if="type === 'account'">
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-user"></i>
                        <input type="text" placeholder="请输入账号或者手机号" v-model='account' />
                    </div>
                    <div class="error" v-if="accountError"><i class="iconfont icon-warning" />{{ accountError }}</div>
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-lock"></i>
                        <input type="password" placeholder="请输入密码" v-model='password' />
                    </div>
                    <div class="error" v-if="passwordError"><i class="iconfont icon-warning" />{{ passwordError }}</div>
                </div>
            </template>
            <template v-else>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-user"></i>
                        <input type="text" placeholder="请输入手机号" v-model='mobile' ref='mobileRef' />
                    </div>
                    <div class="error" v-if="mobileError"><i class="iconfont icon-warning" />{{ mobileError }}</div>
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-code"></i>
                        <input type="text" placeholder="请输入验证码" v-model='code' />
                        <span class="code " @click="send" :class="{ disabled: time > 0 }">{{ time !== 0 ?
                                `${time}秒内发送` :
                                '发送验证码'
                        }}</span>
                    </div>
                    <div class="error" v-if="codeError"><i class="iconfont icon-warning" />{{ codeError }}</div>
                </div>
            </template>
            <div class="form-item">
                <div class="agree">

                    <XtxCheckbox v-model='isAgree'>我已同意</XtxCheckbox>
                    <a href="javascript:;">《隐私条款》</a>
                    <span>和</span>
                    <a href="javascript:;">《服务条款》</a>
                </div>
                <div class="error" v-if="isAgreeError"><i class="iconfont icon-warning" />{{ isAgreeError }}</div>
            </div>
            <a href="javascript:;" class="btn" @click="login">登录</a>
        </div>
        <div class="action">
            <!-- 放置第三方登录按钮 -->
            <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
                style="color:#999;">
                <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg0.pconline.com.cn%2Fpconline%2F1407%2F25%2F5159480_3695400_201112091658161441_thumb1_thumb.gif&refer=http%3A%2F%2Fimg0.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661833579&t=343cc0bfaad351ee599bae713178dba3"
                    alt="QQ登录" border="0" style="width:30px ;" />QQ登录</a>
            <div class="url">
                <a href="javascript:;">忘记密码</a>
                <a href="javascript:;">免费注册</a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: @xtxColor;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 40px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: @priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: @xtxColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;

                    &.disabled {
                        cursor: not-allowed;
                    }
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: @priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: @xtxColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            cursor: pointer;
        }

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }


}
</style>

