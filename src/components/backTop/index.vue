<script setup lang="ts">
import { useScroll } from '@/utils/hooks'
const { y } = useScroll()
</script>
<template>
    <div class="toTop">
        回到顶部
    </div>
</template>
<style scoped>
.toTop {
    width: 40px;
    height: 80px;
    color: darkolivegreen;
    background-color: beige;
}
</style>