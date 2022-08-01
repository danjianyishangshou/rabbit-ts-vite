import { validate, validateFrom } from '@/types/user'

export const accountRule = (value: string) => {
    if (!value) return '请输入用户名'
    if (!/^\w{6,19}$/.test(value)) return '字母开头且6-20个字符'
    return true
}
export const passwordRule = (value: string) => {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码必须是6-24位字符'
    return true
}
export const isAgreeRule = (value: boolean) => {
    if (!value) return '请同意隐私条款'
    return true
}
export const mobileRule = (value: string) => {
    if (!value) return '请输入手机号'
    if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) return '手机号格式错误'
    return true
}
export const codeRule = (value: string) => {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码错误'
    return true
}

export const rePasswordRule = (value: string, { form }: validate<validateFrom>) => {
    if (!value) return '请输入确认密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    // 校验密码是否一致  form表单数据对象 使用当前的rePassword与from中的password对比
    if (value !== form.password) return '两次输入的密码不一致'
    return true
}