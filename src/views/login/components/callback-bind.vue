<script name="CallbackBind" lang="ts" setup>
import { QQUserInfo, QQUserInfoRes } from '@/types/user'
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useCountDown } from '@/utils/hooks'
import {
    mobileRule,
    codeRule
} from '@/utils/validate'
import useStore from '@/store'
import Message from '@/components/message';
import { useRouter } from 'vue-router'
const router = useRouter()
const { time, start } = useCountDown(60)
const { user } = useStore()

const { validate } = useForm({
    validationSchema: {
        mobile: mobileRule,
        code: codeRule,
    }
})
const { value: mobile, errorMessage: mobileError, validate: validateMobile } = useField<string>('mobile')
const { value: code, errorMessage: codeError } = useField<string>('code')
const unionId = ref('')
const qqInfo = ref<QQUserInfo>({} as QQUserInfo)
// 1. 判断QQ是否登录
if (QC.Login.check()) {
    // 2. 获取QQ用户信息
    QC.api('get_user_info').success((res: QQUserInfoRes) => {
        qqInfo.value = res.data
    })
    // 获取OpenId
    QC.Login.getMe(openId => {
        unionId.value = openId
    })
}

const mobileRef = ref<HTMLInputElement | null>(null)
const send = async () => {
    if (time.value > 0) return
    const result = await validateMobile()
    if (!result.valid) {
        mobileRef.value?.focus()
        return
    }
    await user.sendQQBindMsg(mobile.value)
    Message.success('获取验证码成功')
    start()
}
const bound = async () => {
    const result = await validate()
    if (result.valid) {
        await user.socialBindMsg(unionId.value, mobile.value, code.value)
        Message.success('第三方绑定成功')
        router.push('/')
    }
}
</script>
<template>
    <div class="xtx-form">
        <div class="user-info">
            <img :src="qqInfo.figureurl_qq" alt="" />
            <p>Hi，{{ qqInfo.nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
        </div>
        <div class="xtx-form-item">
            <div class="field">
                <i class="icon iconfont icon-phone"></i>
                <input class="input" type="text" placeholder="绑定的手机号" v-model='mobile' />
            </div>
            <div class="error" v-if="mobileError"><i class="iconfont icon-warning" />{{ mobileError }}</div>
        </div>
        <div class="xtx-form-item">
            <div class="field">
                <i class="icon iconfont icon-code"></i>
                <input class="input" type="text" placeholder="短信验证码" v-model='code' />
                <span class="code " @click="send" :class="{ disabled: time > 0 }">{{ time !== 0 ?
                        `${time}秒内发送` :
                        '发送验证码'
                }}</span>
            </div>
            <div class="error" v-if="codeError"><i class="iconfont icon-warning" />{{ codeError }}</div>
        </div>
        <a href="javascript:;" class="submit" @click="bound">立即绑定</a>
    </div>
</template>

<style scoped lang="less">
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;

    img {
        background: #f2f2f2;
        width: 50px;
        height: 50px;
    }

    p {
        padding-left: 10px;
    }
}

.disabled {
    cursor: not-allowed !important;
}

.code {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;

    &:hover {
        cursor: pointer;
    }
}
</style>

