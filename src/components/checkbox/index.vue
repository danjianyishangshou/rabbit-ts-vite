<script lang="ts" setup name="XtxCheckbox">
// 
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void
    (e: "change", value: boolean): void
}>()

const changeBox = () => {
    emits('update:modelValue', !props.modelValue)
    emits('change', !props.modelValue)
}
</script>

<template>
    <div class="xtx-checkbox" @click="changeBox">
        <i class="iconfont icon-checked" v-if="modelValue"> </i>
        <i class="iconfont icon-unchecked" v-else></i>
        <span>
            <slot>提示文本</slot>
        </span>
    </div>
</template>

<style scoped lang="less">
.xtx-checkbox {
    display: inline-block;
    margin-right: 2px;

    .icon-checked {
        color: @xtxColor;

        ~span {
            color: @xtxColor;
        }
    }

    i {
        position: relative;
        top: 1px;
    }

    span {
        margin-left: 2px;
    }
}
</style>

