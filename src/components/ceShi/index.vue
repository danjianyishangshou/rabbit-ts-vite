<script setup lang="ts">
import { h, render, ref, onMounted } from 'vue'
import XtxMessage from '@/components/message/index.vue'
const target = ref<Element | null>(null)
const VNode = h(
    XtxMessage,
    { type: 'success', text: '这是一首简单的小情歌' },
)
onMounted(() => {
    render(VNode, target.value!)
    setTimeout(() => {
        render(null, target.value!)
    }, 2000);
})
</script>
<template>
    <div id="box" ref="target">
    </div>
</template>
<style scoped>
</style>
