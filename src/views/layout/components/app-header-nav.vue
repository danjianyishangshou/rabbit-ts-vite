<script lang="ts" setup name="AppHeaderNav">
import useStore from '@/store/index'
const { category } = useStore()
// category.getAllCategory()
</script>

<template>
    <ul class="app-header-nav">
        <li class="home">
            <RouterLink to="/">首页</RouterLink>
        </li>
        <!-- 解决点击二级分类的时候回到顶部 会出现hover的效果 使用mousemove替换mouseenter事件 -->
        <li v-for="item in category.categoryList" :key="item.id" @mousemove="category.show(item.id)"
            @mouseleave="category.hide(item.id)">
            <RouterLink :to="`/category/${item.id}`" @click="category.hide(item.id)">{{ item.name }}</RouterLink>

            <div class="layer" v-if="item.children" :class="{ open: item.open }">
                <ul>
                    <li v-for="sub in item.children" :key="sub.id">
                        <RouterLink :to="`/category/sub/${sub.id}`" @click="category.hide(item.id)">
                            <img :src="sub.picture" alt="" />
                            <p>{{ sub.name }}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</template>

<style scoped lang="less">
.app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    >li {
        margin-right: 40px;
        width: 38px;
        text-align: center;

        >a {
            font-size: 16px;
            line-height: 32px;
            height: 32px;
            display: inline-block;

            &:hover {
                color: @xtxColor;
                border-bottom: 1px solid @xtxColor;
            }
        }

        // 新增样式
        &:hover {
            >a {
                color: @xtxColor;
                border-bottom: 1px solid @xtxColor;
            }

            // >.layer {
            //     height: 132px;
            //     opacity: 1;
            // }
        }
    }
}

// 新增样式
.layer {
    &.open {
        height: 132px;
        opacity: 1;
    }

    width: 1240px;
    background-color: #fff;
    position: absolute;
    left: -200px;
    top: 56px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    box-shadow: 0 0 5px #ccc;
    transition: all 0.2s 0.1s;

    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 70px;
        align-items: center;
        height: 132px;

        li {
            width: 110px;
            text-align: center;

            img {
                width: 60px;
                height: 60px;
            }

            p {
                padding-top: 10px;
            }

            &:hover {
                p {
                    color: @xtxColor;
                }
            }
        }
    }
}
</style>