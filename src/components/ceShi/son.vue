<script setup lang="ts">
const props = defineProps<{
    money: number
    modelValue: string
}>()
const emits = defineEmits<{
    (e: 'update:money', value: number): void
    (e: 'update:modelValue', value: string): void
}>()
const changeMoney = () => {
    emits('update:money', props.money - 5)
    emits('update:modelValue', '劳斯莱斯')
}
</script>
<template>
    <div>
        <h3>子组件</h3>
        <p>我也有{{ money }}--和{{ modelValue }}车</p>
        <button @click="changeMoney">我要花钱换车</button>

    </div>
</template>
<style scoped>
</style>