<script lang="ts" setup>
import { ref } from 'vue';

// 订单状态
const orderStatus = [
    // { name: 'all', label: '全部订单' },
    { name: 'unpay', label: '待付款' },
    { name: 'deliver', label: '待发货' },
    { name: 'receive', label: '待收货' },
    { name: 'comment', label: '待评价' },
    { name: 'complete', label: '已完成' },
    { name: 'cancel', label: '已取消' }
]
const activeName = ref(orderStatus[0].name)
</script>

<template>
    <!-- <xtx-tabs v-model="activeName">
        <XtxTabsPane name="all" label="全部">
            <h1>全部的内容</h1>
        </XtxTabsPane>
        <XtxTabsPane name="unpay" label="待付款">
            <h1>待付款内容</h1>
        </XtxTabsPane>
        <XtxTabsPane name="test1" label="测试1">
            <h1>测试1的内容</h1>
        </XtxTabsPane>
        <XtxTabsPane name="test2" label="测试2">
            <h1>测试2内容</h1>
        </XtxTabsPane>
    </xtx-tabs> -->
    <xtx-tabs v-model="activeName">
        <XtxTabsPane name="all" label="全部">
            <h1>全部的内容</h1>
        </XtxTabsPane>
        <XtxTabsPane :key="item.label" :name="item.name" :label="item.label" v-for="item in orderStatus">
            <h1>{{ item.label }}</h1>
        </XtxTabsPane>
    </xtx-tabs>
</template>