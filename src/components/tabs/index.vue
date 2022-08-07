<script setup lang="tsx" name="XtxTabs">
import { provide, toRefs, useSlots, VNode } from 'vue'
// const Props = defineProps<{
//     modelValue: string
// }>()
const props = defineProps({
    modelValue: {
        type: String,
        default: 'all'
    }

})
const emits = defineEmits<{
    (e: 'update:modelValue', nameValue: string): void
    (e: 'tab-click', value: { tab: any, index: number }): void
}>()
// 将传递的数据改成响应式的
const { modelValue } = toRefs(props)
// 通过依赖注入的方式传递 选中切换的名字
provide('activeNameValue', modelValue)
const slot = useSlots()
const clickFn = (item: any, index: number) => {
    emits('update:modelValue', item),
        emits('tab-click', {
            tab: item,
            index: index
        })
}
const Tabs = () => {
    // 注意存在v-for和写死数据的两种情况 v-for的时候会在外边包裹一层数据 会将遍历的数据存在children字段中
    // console.log(slot.default?.())
    const arr = slot.default?.()
    const panes: VNode[] = []
    arr?.forEach((item: any) => {
        if (item.type.name === 'XtxTabsPane') {
            panes.push(item)
        } else {
            if (item.children) {
                item.children.forEach((panel: any) => {
                    panes.push(panel)
                })
            }
        }
    })


    const navs = (
        <nav>


            {
                panes?.map((item: any, index) =>
                (<a href='javascript:;'
                    class={
                        { active: props.modelValue === item.props?.name }
                    }
                    onClick={() => clickFn(item.props?.name, index)}
                >{item.props?.label}</a>)
                )
            }
        </nav >
    )
    return (<div class="xtx-tabs">{[navs, panes]}</div>)
}
</script>

 <template>
    <Tabs></Tabs>
</template>

<style lang="less">
.xtx-tabs {
    background: #fff;

    >nav {
        height: 60px;
        line-height: 60px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        >a {
            width: 110px;
            border-right: 1px solid #f5f5f5;
            text-align: center;
            font-size: 16px;

            &.active {
                border-top: 2px solid @xtxColor;
                height: 60px;
                background: #fff;
                line-height: 56px;
            }
        }
    }
}
</style>

