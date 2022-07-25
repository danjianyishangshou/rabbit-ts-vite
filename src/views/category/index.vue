<script lang="ts" name="TopCategory" setup>
import GoodsItem from './components/goods-item.vue'
import router from '@/router';
import useStore from '@/store'
import { watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const { category, home } = useStore()
category.getTopCategory(route.params.id as string)
home.getBannerList()
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
    <div class="top-category">
        <div class="container">
            <!-- 路由缓存 -->
            <XtxBread>
                <XtxBreadItem to="/">首页</XtxBreadItem>
                <XtxBreadItem>{{ category.topCategory.name }}</XtxBreadItem>
            </XtxBread>
            <XtxCarousel auto-play :slides="home.bannerList" style="height: 500px;" />
            <!-- 所有二级分类 -->
            <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="item in category.topCategory.children" :key="item.id">
                        <RouterLink :to="`/category/sub/${category.subCategory.id}`">
                            <img :src="item.picture">
                            <p>{{ item.name }}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <!-- 分类关联商品 -->
            <div class="ref-goods" v-for="item in category.topCategory.children" :key="GoodsItem.id">
                <div class="head">
                    <h3>- {{ item.name }} -</h3>
                    <p class="tag">温暖柔软，品质之选</p>
                    <XtxMore :path="`/category/sub/${category.subCategory.id}`" />
                </div>
                <div class="body">
                    <GoodsItem v-for='goods in item.goods' :goods='goods' :key='goods.id' />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .ref-goods {
        background-color: #fff;
        margin-top: 20px;
        position: relative;

        .head {
            .xtx-more {
                position: absolute;
                top: 20px;
                right: 20px;
            }

            .tag {
                text-align: center;
                color: #999;
                font-size: 20px;
                position: relative;
                top: -20px;
            }
        }

        .body {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            padding: 0 65px 30px;
        }
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;

                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: @xtxColor;
                    }
                }
            }
        }
    }
}
</style>