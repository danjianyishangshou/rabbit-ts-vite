<script lang="ts" setup name="HomeBrand">
import HomePanel from './home-panel.vue'
import { useLazyData } from '@/utils/hooks'
import useStore from '@/store'
import { ref } from 'vue';
const { home } = useStore()
const { target } = useLazyData(home.getBrandList)
const activeIndex = ref(0)
const prev = () => {
    if (activeIndex.value <= 0) return
    activeIndex.value--
}

const next = () => {
    if (activeIndex.value >= Math.ceil(home.brandGoods.length / 5) - 1) return
    activeIndex.value++
}

</script>

<template>
    <HomePanel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
        <template v-slot:right>
            <a href="javascript:;" class="iconfont icon-angle-left prev" @click='prev'
                :class="{ disabled: activeIndex <= 0 }"></a>
            <a href="javascript:;" class="iconfont icon-angle-right next" @click="next"
                :class="{ disabled: activeIndex >= Math.ceil(home.brandGoods.length / 5) - 1 }"></a>
        </template>
        <div class="box" ref="box">
            <Transition name="fade">
                <ul class="list" v-if="home.brandGoods.length"
                    :style="{ transform: `translateX(${-activeIndex * 1240}px)` }">
                    <li v-for="item in home.brandGoods" :key="item.id">
                        <RouterLink to="/">
                            <img :src="item.picture" alt="" />
                        </RouterLink>
                    </li>
                </ul>
                <div v-else class="skeleton">
                    <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" :width="240"
                        :height="305" />
                </div>
            </Transition>
        </div>
    </HomePanel>
</template>

<style scoped lang="less">
.home-panel {
    background: #f5f5f5;
}

.iconfont {
    width: 20px;
    height: 20px;
    background: #ccc;
    color: #fff;
    display: inline-block;
    text-align: center;
    margin-left: 5px;
    background: @xtxColor;

    &::before {
        font-size: 12px;
        position: relative;
        top: -2px;
    }

    &.disabled {
        background: #ccc;
        cursor: not-allowed;
    }
}

.box {
    display: flex;
    width: 100%;
    height: 345px;
    overflow: hidden;
    padding-bottom: 40px;

    .list {
        width: 200%;
        display: flex;
        transition: all 1s;

        li {
            margin-right: 10px;
            width: 240px;

            &:nth-child(5n) {
                margin-right: 0;
            }

            img {
                width: 240px;
                height: 305px;
            }
        }
    }
}
</style>

