<script lang="ts" setup name="HomeCategory">
import useStore from '@/store'
import { computed, ref } from 'vue'
import { CategoryGoods } from '@/types/goods'
// 左侧导航栏
const { category } = useStore()
// 获取鼠标经过的商品id
const currentCategoryId = ref('')
//根据id计算出鼠标移入的goods这一项
const goods = computed(() => {
    return category.categoryList.find(item => item.id === currentCategoryId.value)?.goods
})
</script>
<template>
    <div class="home-category" @mouseleave="currentCategoryId = ''">
        <ul class="menu">
            <li v-for="item in category.categoryList" :key="item.id" @mouseenter="currentCategoryId = item.id"
                :class="{ active: currentCategoryId === item.id }">
                <RouterLink :to="`/category/${item.id}`">
                    {{ item.name }}
                </RouterLink>
                <template v-if="item.children">
                    <RouterLink :to="`/category/sub/${sub.id}`" v-for="sub in item?.children.slice(0, 2)" :key="sub.id">
                        {{ sub.name }}
                    </RouterLink>
                </template>
                <template v-else>
                    <XtxSkeleton :width="60" :height="18" bg="rgba(255,255,255,0.2)" style="margin-right: 5px" fide
                        animated>
                    </XtxSkeleton>
                    <XtxSkeleton :width="50" :height="18" bg="rgba(255,255,255,0.2)" animated />
                </template>
            </li>

        </ul>
        <!-- 弹层 -->
        <div class="layer" v-if="goods">
            <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
            <ul>
                <li v-for="item in goods" :key="item.id">
                    <RouterLink to="/">
                        <img :src="item.picture" alt="">
                        <div class="info">
                            <p class="name ellipsis-2">{{ item.desc }}</p>
                            <p class="desc ellipsis">{{ item.name }}</p>
                            <p class="price"><i>¥</i>{{ item.price }}</p>
                        </div>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="less">
.home-category {
    width: 250px;
    height: 500px;
    background: rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 99;

    .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;

        h4 {
            font-size: 20px;
            font-weight: normal;
            line-height: 80px;

            small {
                font-size: 16px;
                color: #666;
            }
        }

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                width: 310px;
                height: 120px;
                margin-right: 15px;
                margin-bottom: 15px;
                border: 1px solid #eee;
                border-radius: 4px;
                background: #fff;

                &:nth-child(3n) {
                    margin-right: 0;
                }

                a {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    padding: 10px;

                    &:hover {
                        background: #e3f9f4;
                    }

                    img {
                        width: 95px;
                        height: 95px;
                    }

                    .info {
                        padding-left: 10px;
                        line-height: 24px;
                        width: 190px;

                        .name {
                            font-size: 16px;
                            color: #666;
                        }

                        .desc {
                            color: #999;
                        }

                        .price {
                            font-size: 22px;
                            color: @priceColor;

                            i {
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
        }
    }

    &:hover {
        .layer {
            display: block;
        }
    }


    .menu {
        li {
            padding-left: 40px;
            height: 55px;
            line-height: 55px;

            &:hover,
            &.active {
                background: @xtxColor;
            }

            a {
                margin-right: 4px;
                color: #fff;

                &:first-child {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>

