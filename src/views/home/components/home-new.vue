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
            <ul class="goods-list">
                <li v-for="item in newGoods" :key="item.id">
                    <template v-if="item.id">
                        <!-- `/product/${item.id}` -->
                        <RouterLink to="/">
                            <img v-lazy="item.picture" alt="" />
                            <p class="name ellipsis">{{ item.name }}</p>
                            <p class="price">&yen;{{ item.price }}</p>
                        </RouterLink>
                    </template>
                    <template v-else>
                        <XtxSkeleton :width="306" :height="406" bg="rgba(255,255,255,0.2)" style="margin-right: 5px"
                            fide animated></XtxSkeleton>
                    </template>
                </li>

            </ul>
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
</style>

