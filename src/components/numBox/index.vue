<script lang="ts" setup name="XtxNumbox">

import { ComponentInternalInstance, getCurrentInstance } from 'vue'
// const props = defineProps<{
//     modelValue: number
//     showLabel?: boolean
//     max?: number
//     min?: number
// }>()
// const { modelValue = 1, min = 1, max = 99 } = props
const props = defineProps({
    modelValue: {
        type: Number,
        default: 1,
    },
    min: {
        type: Number,
        default: 1,
    },
    max: {
        type: Number,
        default: 10,
    },
    showLabel: {
        type: Boolean,
        default: false,
    },
})
const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()
const add = () => {
    if (props.modelValue >= props.max) return
    emits('update:modelValue', props.modelValue + 1)
}
const sub = () => {
    if (props.modelValue <= props.min) return
    emits('update:modelValue', props.modelValue - 1)
}
// vue3的强制刷新 forceUpdate 注意不能将instance实例放在函数里面 否则会进入null
const instance: ComponentInternalInstance | null = getCurrentInstance()
const changeCount = (e: Event) => {
    const num = e.target as HTMLInputElement
    let value = +num.value
    if (isNaN(value)) value = props.min
    // if (value <= props.min) value = props.min
    // if (value >= props.max) value = props.max
    value = Math.max(Math.min(value, props.max), props.min)
    emits('update:modelValue', value)
    // vue3的强制刷新 forceUpdate
    instance!.proxy?.$forceUpdate()
}
// const add = () => {
//     if (modelValue >= max) return
//     emits('update:modelValue', modelValue + 1)
//     console.log(modelValue)
// }
// const sub = () => {
//     if (modelValue <= min) return
//     emits('update:modelValue', modelValue - 1)
// }
</script>
<template>
    <div class="xtx-numbox">
        <div class="label" v-if="showLabel">数量</div>
        <div class="numbox">
            <a href="javascript:;" @click="sub">-</a>
            <input type="text" @change="changeCount" :value="modelValue" />
            <a href="javascript:;" @click="add">+</a>
        </div>
    </div>
</template>

<style scoped lang="less">
.xtx-numbox {
    display: flex;
    align-items: center;

    .label {
        width: 60px;
        color: #999;
        padding-left: 10px;
    }

    .numbox {
        width: 120px;
        height: 30px;
        border: 1px solid #e4e4e4;
        display: flex;

        >a {
            width: 29px;
            line-height: 28px;
            text-align: center;
            background: #f8f8f8;
            font-size: 16px;
            color: #666;

            &:first-of-type {
                border-right: 1px solid #e4e4e4;
            }

            &:last-of-type {
                border-left: 1px solid #e4e4e4;
            }
        }

        >input {
            width: 60px;
            padding: 0 5px;
            text-align: center;
            color: #666;
        }
    }
}
</style>

