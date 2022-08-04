<script setup lang="ts">
import XtxConfirm from '../confirm/confirm.vue'
import { Confirm } from '../confirm'
const handler = () => {
    Confirm({ text: "are you render" }).then(() => {
        console.log('成功')
    }).catch(() => {
        console.log('失败')
    })
}
</script>
<template>
    <div>
        <button @click="handler">打开</button>
    </div>
</template>
<style scoped>
</style>