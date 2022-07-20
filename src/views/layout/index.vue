<script lang="ts" setup name="Layout">
import AppTopnav from './components/app-topnav.vue'
import AppHeader from './components/app-header.vue'
import AppFooter from './components/app-footer.vue'
</script>
<template>
    <div>
        <!-- 顶部列表 -->
        <AppTopnav></AppTopnav>
        <AppHeader></AppHeader>
        <AppFooter></AppFooter>
    </div>
</template>

<style lang="less" scoped>
</style>