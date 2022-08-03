<script lang="ts" setup name="HomeNew">
import HomePanel from './home-panel.vue'
import useStore from '@/store'
import { storeToRefs } from 'pinia'
// 引入组件数据懒加载的工具函数
import { useLazyData } from '@/utils/hooks'
const { home } = useStore()
const { newGoods } = storeToRefs(home)
// 从组件懒加载中获取出来目标绑定元素
const { target } = useLazyData(home.getNewGoodsList)

</script>
<template>
    <div class="home-new" ref="target">
        <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
            <template #right>
                <XtxMore path="/" />
            </template>
            <!-- 面板内容 -->
            <Transition name="fade">
                <ul class="goods-list" v-if="newGoods.length">
                    <li v-for="item in newGoods" :key="item.id">
                        <!-- `/product/${item.id}` -->
                        <RouterLink :to="`/goods/${item.id}`">
                            <img v-lazy="item.picture" alt="" />
                            <p class="name ellipsis">{{ item.name }}</p>
                            <p class="price">&yen;{{ item.price }}</p>
                        </RouterLink>
                    </li>
                </ul>
                <div class="home-skeleton" v-else>
                    <div class="item" v-for="i in 4" :key="i" :style="{ backgroundColor: '#f0f9f4' }">
                        <XtxSkeleton bg="#e4e4e4" :width="306" :height="306" animated />
                        <XtxSkeleton bg="#e4e4e4" :width="160" :height="24" animated />
                        <XtxSkeleton bg="#e4e4e4" :width="120" :height="24" animated />
                    </div>
                </div>
            </Transition>
        </HomePanel>
    </div>
</template>

<style scoped lang="less">
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;
        background: #f0f9f4;
        .hoverShadow();

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding: 12px 30px 0 30px;
            text-align: center;
        }

        .price {
            color: @priceColor;
        }
    }
}

.home-skeleton {
    width: 1240px;
    height: 406px;
    display: flex;
    justify-content: space-between;

    .item {
        width: 306px;

        .xtx-skeleton~.xtx-skeleton {
            display: block;
            margin: 16px auto 0;
        }
    }
}
</style>

