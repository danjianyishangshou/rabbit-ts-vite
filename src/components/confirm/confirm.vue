<script lang="ts" setup name="XtxConfirm">
import { onMounted, ref } from 'vue';
import XtxButton from '../button/index.vue'
type Prop = {
    text: string
    title?: string
    close: () => void
    affirm: () => void
}
const { text, title = '温馨提示' } = defineProps<Prop>()
const show = ref(false)

// 挂载的时候就讲fade类显示出来,注意为了过渡效果 将show的类的 放在异步环境中 分离开挂在的间隙
onMounted(() => {
    setTimeout(() => {
        show.value = true
    }, 20)
})
</script>
<template>
    <div class="xtx-confirm" :class="{ fade: show }">
        <div class="wrapper" :class="{ fade: show }">
            <div class="header">
                <h3>{{ title }}</h3>
                <a href="JavaScript:;" class="iconfont icon-close-new" @click="close"></a>
            </div>
            <div class="body">
                <i class="iconfont icon-warning"></i>
                <span>{{ text }}</span>
            </div>
            <div class="footer">
                <XtxButton size="mini" type="gray" @click="close">取消</XtxButton>
                <XtxButton size="mini" type="primary" @click="affirm">确认</XtxButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.xtx-confirm {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 8888;
    background: rgba(0, 0, 0, 0);



    &.fade {
        transition: all .4s;
        background: rgba(0, 0, 0, 0.5);

    }

    .wrapper {
        width: 400px;
        background: #fff;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -100%);
        opacity: 0;


        &.fade {
            transition: all .5s;
            transform: translate(-50%, -70%);
            opacity: 1;
        }

        .header {
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
            background-color: @xtxColor;
            color: #fff;

            .icon-close-new {
                color: #fff;
            }
        }

        .footer {
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
        }

        .body {
            padding: 20px 40px;
            font-size: 16px;

            .icon-warning {
                color: @priceColor;
                margin-right: 3px;
                font-size: 16px;
            }
        }

        .footer {
            text-align: right;

            .xtx-button {
                margin-left: 20px;
            }
        }

        .header {
            position: relative;

            h3 {
                font-weight: normal;
                font-size: 18px;
            }

            a {
                position: absolute;
                right: 15px;
                top: 15px;
                font-size: 20px;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                color: #999;

                &:hover {
                    color: #666;
                }
            }
        }
    }
}
</style>

