<script lang="ts" setup name="XtxCarousel">
import { BannerItem } from '@/types/home'
import { nextTick, onBeforeUpdate, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
    slides: BannerItem,
    autoPlay?: boolean,
    duration?: number
}>()
const { autoPlay = false, duration = 3000 } = props
// onBeforeUpdate(() => {
//     console.log(props.slides)

// })
// 设置轮播图显示的下标
const active = ref(0)
const timer = ref<number>(-1)
const prev = () => {
    active.value--
    if (active.value < 0) {
        active.value = props.slides.length - 1
    }
}
const next = () => {
    active.value++
    if (active.value > props.slides.length - 1) {
        active.value = 0
    }
}
const start = () => {
    if (!autoPlay) return
    timer.value = window.setInterval(() => {
        next()
    }, duration)
}
const stop = () => {
    clearInterval(timer.value)
}
onMounted(() => {
    start()
})
onUnmounted(() => {
    stop()
})
</script>

<template>
    <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
        <ul class="carousel-body">
            <li class="carousel-item " :class="{ fade: active === index }" v-for="(item, index) in slides"
                :key="item.id">
                <RouterLink :to="item.hrefUrl">
                    <img :src="item.imgUrl" alt="" />
                </RouterLink>
            </li>
        </ul>
        <a href="javascript:;" class="carousel-btn prev" @click="prev"><i class="iconfont icon-angle-left"></i></a>
        <a href="javascript:;" class="carousel-btn next" @click="next"><i class="iconfont icon-angle-right"></i></a>
        <div class="carousel-indicator">
            <span :class="{ active: active === index }" v-for="(item, index) in slides" :key="item.id"
                @click="active = index"></span>
        </div>
    </div>
</template>

<style scoped lang="less">
.xtx-carousel {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    position: relative;


    .carousel {
        &-body {
            width: 100%;
            height: 100%;
        }

        &-item {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            transition: opacity 0.5s linear;

            &.fade {
                opacity: 1;
                z-index: 1;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }

        &-indicator {
            position: absolute;
            left: 0;
            bottom: 20px;
            z-index: 2;
            width: 100%;
            text-align: center;

            span {
                display: inline-block;
                width: 12px;
                height: 12px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                cursor: pointer;

                ~span {
                    margin-left: 12px;
                }

                &.active {
                    background: #fff;
                }
            }
        }

        &-btn {
            width: 44px;
            height: 44px;
            background: rgba(0, 0, 0, 0.2);
            color: #fff;
            border-radius: 50%;
            position: absolute;
            top: 228px;
            z-index: 2;
            text-align: center;
            line-height: 44px;
            opacity: 0;
            transition: all 0.5s;

            &.prev {
                left: 20px;
            }

            &.next {
                right: 20px;
            }
        }
    }

    &:hover {
        .carousel-btn {
            opacity: 1;
        }
    }
}
</style>