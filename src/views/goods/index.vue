<script lang="ts" setup>
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsDetail from './components/goods-detail.vue'
import GoodsHot from './components/goods-hot.vue'
import useStore from '@/store'
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { goods } = useStore()
const { goodsInfo } = storeToRefs(goods)
const count = ref(1)
// 清除路由缓存
watchEffect(() => {
    const id = route.params.id
    if (route.fullPath === `/goods/${id}`) {
        // 清除组件数据缓存,一种是重置表单 另外一种是组件加key
        goods.resetGoodsInfo()
        // 获取最新的数据
        goods.getGoodsInfo(id as string)
    }
})
const changGoodsInfo = (skuId: string) => {
    const info = goodsInfo.value.skus.find(item => item.id === skuId)
    if (info) {
        goodsInfo.value.oldPrice = info.oldPrice
        goodsInfo.value.price = info.price
        goodsInfo.value.inventory = info.inventory
    }
}
</script>
<template>
    <div class="xtx-goods-page">
        <div class="container">
            <template v-if="goodsInfo.id">
                <!-- 面包屑 -->
                <XtxBread>
                    <XtxBreadItem to="/">首页</XtxBreadItem>
                    <XtxBreadItem :to="`/category/${goodsInfo.categories[1].id}`">{{ goodsInfo.categories[1].name }}
                    </XtxBreadItem>
                    <XtxBreadItem :to="`/category/sub/${goodsInfo.categories[0].id}`">{{ goodsInfo.categories[0].name }}
                    </XtxBreadItem>
                    <XtxBreadItem to="/">{{ goodsInfo.name }}</XtxBreadItem>
                </XtxBread>
                <!-- 商品信息 -->
                <div class="goods-info">
                    <div class="media">
                        <!-- 商品图片 -->
                        <GoodsImage :images="goodsInfo.mainPictures"></GoodsImage>
                        <!-- 商品信息统计 -->
                        <GoodsSales></GoodsSales>
                    </div>
                    <div class="spec">
                        <!-- 商品名称spu -->
                        <GoodsName :goods="goodsInfo"></GoodsName>
                        <!-- 商品sku细分 -->
                        <!--. 第二种方法 组件加key清除组件数据缓存:key="goodsInfo.id" -->
                        <GoodsSku :goods="goodsInfo" skuId="1369155873162661889" @changSkuId="changGoodsInfo">
                        </GoodsSku>
                        <!-- 计数组件 -->
                        <XtxNumbox showLabel v-model="count"></XtxNumbox>
                        <!-- 提交按钮 -->
                        <XtxButton size="middle" type="primary" style="margin-top:20px">加入购物车</XtxButton>
                    </div>
                </div>
                <!-- 商品详情 -->
                <div class="goods-footer">
                    <div class="goods-article">
                        <!-- 商品+评价 -->
                        <GoodsDetail :goods="goodsInfo"></GoodsDetail>
                        <div class="goods-tabs"></div>
                    </div>
                    <!-- 24热榜+专题推荐 -->
                    <div class="goods-aside">
                        <!-- 24热榜+专题推荐 -->

                        <GoodsHot :type="1" />
                        <GoodsHot :type="2" />
                        <GoodsHot :type="3" />

                    </div>
                </div>
            </template>
            <!-- 占位没有逻辑-->
            <template v-else>
                <!-- 面包屑 -->
                <XtxBread>
                    <XtxBreadItem to="/">首页</XtxBreadItem>
                </XtxBread>
                <!-- 商品信息 -->
                <div class="goods-info"></div>
                <!-- 商品详情 -->
                <div class="goods-footer">
                    <div class="goods-article">
                        <!-- 商品+评价 -->
                        <div class="goods-tabs"></div>
                    </div>
                    <!-- 24热榜+专题推荐 -->
                    <div class="goods-aside"></div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="less">
.goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
        width: 580px;
        height: 600px;
        padding: 30px 50px;
    }

    .spec {
        flex: 1;
        padding: 30px 30px 30px 0;
    }
}



.goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
        width: 940px;
        margin-right: 20px;
    }

    .goods-aside {
        width: 280px;
        min-height: 1000px;
    }
}

.goods-tabs {
    min-height: 600px;
    background: #fff;
}

.goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
}
</style>

