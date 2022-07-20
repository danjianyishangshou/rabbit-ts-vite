<script lang="ts" setup name="Layout">
import AppHeaderSticky from './components/app-header-sticky.vue'
import AppTopnav from './components/app-topnav.vue'
import AppHeader from './components/app-header.vue'
import AppFooter from './components/app-footer.vue'
import useStore from '@/store/index'
const { category } = useStore()
category.getAllCategory()

</script>
<template>
    <div>
        <!-- 顶部列表 -->
        <AppTopnav></AppTopnav>
        <AppHeader></AppHeader>
        <!-- 吸顶效果 -->
        <AppHeaderSticky></AppHeaderSticky>
        <div class="app-body">
            <!-- 路由出口 -->
            <RouterView></RouterView>
        </div>
        <AppFooter></AppFooter>
    </div>
</template>

<style lang="less" scoped>
.app-body {
    height: 1000px;
}
</style>