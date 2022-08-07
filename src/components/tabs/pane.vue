<script setup lang="ts" name="XtxTabsPane">
import { inject } from 'vue'
defineProps<{
    label?: string
    name?: string
}>()
// 接受父级传过来的数据
const activeName = inject("activeNameValue")
</script>

<template>
    <div class="xtx-tabs-panel" v-show="name === activeName">
        <slot></slot>
    </div>
</template>

