<script setup lang="ts">
import { ref } from 'vue';

const flag = ref(false)
const show = () => {
    flag.value = !flag.value
}
</script>
<template>
    <div>
        <button @click="show">按钮</button>
        <hr>
        <Transition name="box">
            <div class="box" v-show="flag">
                app
            </div>
        </Transition>
    </div>
</template>
<style scoped lang="less">
.box {
    width: 400px;
    height: 400px;
    background-color: pink;
    transition: all 3s;
}

@keyframes start {
    0% {
        transform: translateX(0px);
    }

    10% {
        transform: translateX(100px);
    }

    50% {
        transform: translateX(200px);
    }

    80% {
        transform: translateX(300px);
    }

    100% {
        transform: translateX(400px);
    }
}


@keyframes end {
    0% {
        transform: translateX(400px);
    }

    10% {
        transform: translateX(300px);
    }

    50% {
        transform: translateX(200px);
    }

    80% {
        transform: translateX(100px);
    }

    100% {
        transform: translateX(0px);
    }
}

.box-enter-from {
    opacity: 0;
    transform: translateY(-100%);
}

.box-enter-active {
    opacity: .5;
    transform: rotateX(45deg);
}

.box-enter-to {
    opacity: 1;
    transform: translateY(0);
    animation-name: start;

}



.box-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.box-leave-active {
    opacity: .5;
    transform: rotateX(45deg);
}

.box-leave-to {
    opacity: 0;
    transform: translateY(-100%);
    animation-name: end;

}
</style> 