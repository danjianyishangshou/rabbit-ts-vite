<script lang="ts" setup>
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import useStore from '@/store'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { goods } = useStore()
const { goodsInfo } = storeToRefs(goods)
watchEffect(() => {
    const id = route.params.id
    if (route.fullPath === `/goods/${id}`) {
        goods.getGoodsInfo(id as string)
    }
})
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
                        <GoodsSku :goods="goodsInfo"></GoodsSku>
                    </div>
                </div>
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

