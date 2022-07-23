<script lang="ts" name="TopCategory" setup>
import router from '@/router';
import useStore from '@/store'
import { watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const { category } = useStore()
category.getTopCategory(route.params.id as string)

//解决路由缓存
/**
*路由缓存（说人话）（不能懵逼现在老师要开始解释了）*问题原因
*人话翻译
*首先明确，我们动态传参数，最后用的全都是同一个组件
*但是我们的setup函数只执行一次重点，造成bug的原因setup的代码只会执行一次
*解决方案
*监听路由，因为id在变化，只要id一变我重新发送请求就可以
*/
// watch(() => route.params.id, (val) => {
//     if (route.fullPath === `/category/${val}`) {
//         category.getTopCategory(val as string)
//     }
// }, { immediate: true })
watchEffect(() => {
    const id = route.params.id
    if (route.fullPath === `/category/${id}`) {
        category.getTopCategory(id as string)
    }
})
</script>

<template>
    <div class="category">
        <!-- 路由缓存 -->
        <XtxBread>
            <XtxBreadItem to="/">首页</XtxBreadItem>
            <XtxBreadItem>{{ category.topCategory.name }}</XtxBreadItem>
        </XtxBread>
    </div>
</template>

<style>
</style>