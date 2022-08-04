<script lang="ts" setup name="XtxDialog">
import { onClickOutside } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
const Props = defineProps<{
    title?: string
    visible: boolean
}>()
const { title = '默认标题' } = Props
const emits = defineEmits<{
    (e: "update:visible", visible: boolean): void
}>()
const target = ref<HTMLDivElement | null>(null)
const close = () => {
    emits("update:visible", false)
}
onClickOutside(target, () => {
    close()
})

const show = ref(false)

watch(() => Props.visible, (value) => {
    setTimeout(() => {
        show.value = value
    }, 20)
},
    { immediate: true }
)
</script>
<template>
    <!-- 传送门 将代码传送到指定的节点 防止固定定位的元素 别父级的transform属性所影响 -->
    <Teleport to="body">
        <div class="xtx-dialog" v-show="visible" :class="{ fade: show }">
            <div class="wrapper" ref="target" :class="{ fade: show }">
                <div class="header">
                    <h3>{{ title }}</h3>
                    <a href="JavaScript:;" class="iconfont icon-close-new" @click="close"></a>
                </div>
                <div class="body">
                    <slot>对话框内容</slot>
                </div>
                <div class="footer">
                    <slot name="footer">
                        <XtxButton type="gray" style="margin-right: 20px" @click="close">取消</XtxButton>
                        <XtxButton type="primary">确认</XtxButton>
                    </slot>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="less">
.xtx-dialog {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 8887;
    background: rgba(0, 0, 0, 0);

    &.fade {
        transition: all 0.4s;
        background: rgba(0, 0, 0, 0.5);
    }

    .wrapper {
        width: 600px;
        background: #fff;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
        opacity: 0;

        &.fade {
            transition: all 0.4s;
            transform: translate(-50%, -50%);
            opacity: 1;
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
            text-align: center;
            padding: 10px 0 30px 0;
        }

        .header {
            position: relative;
            height: 70px;
            line-height: 70px;
            padding: 0 20px;
            border-bottom: 1px solid #f5f5f5;
            background-color: @xtxColor;
            color: #fff;

            h3 {
                font-weight: normal;
                font-size: 18px;
            }

            a {
                position: absolute;
                right: 25px;
                top: 25px;
                font-size: 24px;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                color: #fff;

                &:hover {
                    color: rgb(143, 143, 143);
                }
            }
        }
    }
}
</style>

