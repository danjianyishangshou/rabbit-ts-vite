<script lang="ts" setup name="XtxMessage">
import { onMounted, PropType, ref } from 'vue'

const props = defineProps({
    type: {
        type: String as PropType<'success' | 'error' | 'warning'>,
        default: 'success',
    },
    text: {
        type: String,
        default: '这是一条消息'
    },
    duration: {
        type: Number,
        default: 1500
    }
})

// 定义一个对象，包含三种情况的样式，对象key就是类型字符串
const style = {
    warning: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)',
    },
    error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)',
    },
    success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)',
    },
}
let flag = true

const isShow = ref(false)
onMounted(() => {
    let timer = (-1)
    clearTimeout(timer)
    isShow.value = true
    if (flag) {
        timer = window.setTimeout(() => {
            clearTimeout(timer)
            isShow.value = false
            flag = false
        }, props.duration)
    }
})
</script>

<template>
    <!-- 注意transition必须要有一个开关 -->
    <Transition name="down">
        <div class="xtx-message" :style="style[type]" v-show="isShow">
            <i class="iconfont" :class="style[type].icon"></i>
            <span class="text">
                {{ text }}
            </span>
        </div>
    </Transition>
</template>

<style scoped lang="less">
.xtx-message {
    width: 300px;
    height: 50px;
    position: fixed;
    z-index: 9999;
    left: 50%;
    margin-left: -150px;
    top: 25px;
    line-height: 50px;
    padding: 0 25px;
    border: 1px solid #e4e4e4;
    background: #f5f5f5;
    color: #999;
    border-radius: 4px;

    i {
        margin-right: 4px;
        vertical-align: middle;
    }

    .text {
        vertical-align: middle;
    }

}

.down {
    &-enter {
        &-from {
            transform: translateY(-200%);
            opacity: 0;
        }

        &-active {
            transition: all .5s;
        }

        &-to {
            transform: none;
            opacity: 1;
        }
    }

    &-leave {
        &-from {
            transform: none;
            opacity: 1;
        }

        &-active {
            transition: all .2s;
        }

        &-to {
            transform: translateY(200%);
            opacity: 0;
        }
    }
}
</style>

