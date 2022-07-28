<script setup lang="ts">
import son from './son.vue'
import { ref } from 'vue'
const car = ref('奔驰 ')
const money = ref(100)
</script>
<template>
    <div>
        <h2>父组件</h2>
        <p>money:{{ money }}</p>
        <son v-model:money="money" v-model="car"></son>
    </div>
</template>
<style scoped>
</style>