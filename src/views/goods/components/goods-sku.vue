<script setup lang="ts" name="GoodsSku">
import { PropType } from 'vue'
import { GoodsInfo, Spec, SpecValue } from '@/types/goods'
import { bwPowerSet } from '@/utils/hooks'


const props = defineProps({
    goods: {
        type: Object as PropType<GoodsInfo>,
        required: true
    },
    skuId: {
        type: String
    }
})
const emits = defineEmits(['changSkuId'])
// 设置选中状态
const changeSelected = (item: Spec, sub: SpecValue) => {


    if (sub.disabled) return //当点击按钮禁用的时候 禁止按钮禁用
    if (sub.selected) {
        sub.selected = false
    } else {
        // 干掉所有人 复活我自己
        item.values.forEach(i => i.selected = false)
        sub.selected = true
    }

    const SelectedArr = getSelectedSpec()
    updateDisabledStatus(SelectedArr)

    const selected = getSelectedSpec().every(item => item)
    if (selected) {
        const key = getSelectedSpec().join('+')
        const [skuId] = pathMap[key]
        emits('changSkuId', skuId)
    }
}
/**
 * 整体大致步骤：

*  1. 根据后台返回的skus数据得到有效sku组合（过滤掉库存为0的）
*  2. 根据有效的sku组合得到所有的子集集合（如何得到幂集）
*  3. 根据子集集合组合成一个路径字典，也就是对象。
*  4. 在组件初始化的时候去判断每个规格是否点击
*  5. 在点击规格的时候去判断其他规格是否可点击
*  6. 判断的依据是，拿着说有规格和现在已经选中的规则取搭配，得到可走路径。
*     1. 如果可走路径在字典中，可点击
*     2. 如果可走路径不在字典中，禁用
 */

// 获取路径字典
const getPathMap = () => {
    type TObj = {
        [key: string]: string[]
    }
    const pathMap: TObj = {}
    //  1. 根据后台返回的skus数据得到有效sku组合（过滤掉库存为0的）
    const skus = props.goods.skus.filter(item => item.inventory)
    // console.log(skus)
    skus.forEach(sku => {
        //根据有效的sku组合得到所有的子集集合（如何得到幂集
        const powerSet = bwPowerSet(sku.specs.map(sub => sub.valueName))
        powerSet.forEach(item => {
            const key = item.join('+')
            // 3. 根据子集集合组合成一个路径字典，也就是对象。
            if (key in pathMap) {
                pathMap[key].push(sku.id)
            } else {
                pathMap[key] = [sku.id]
            }
            // key in pathMap ? pathMap[key].push(sku.id) : pathMap[key] = [sku.id]
        })
    })
    return pathMap
}
const pathMap = getPathMap()

//4. 在组件初始化=的时候去判断每个规格是否点击
const updateDisabledStatus = (SelectedArr: string[]) => {

    props.goods.specs.forEach((spec, index) => {

        spec.values.forEach(SpecValue => {
            // 声明一个新的数组 防止数据被修改污染
            const newArr = [...SelectedArr]
            // 根据下标匹配选用按钮字段
            newArr[index] = SpecValue.name
            // 处理成路径字典的可识别的字段
            const key = newArr.filter(item => item).join('+')

            if (key in pathMap) {
                SpecValue.disabled = false
            } else {
                SpecValue.disabled = true
            }
        })
    })
}
// 默认选中
const defaultSelected = () => {
    const temp = props.goods.skus.find(item => item.id === props.skuId)
    if (temp) {
        // temp.specs
        props.goods.specs.forEach((item, index) => {
            item.values.forEach(sub => {
                if (sub.name === temp.specs[index].valueName) {
                    sub.selected = true
                }
            })
        })
    }
}
defaultSelected()
// 获取选中的规格
const getSelectedSpec = () => {
    const arr: string[] = []
    props.goods.specs.forEach(spec => {
        const temp = spec.values.find(item => item.selected)
        // 第一次循环查找到了 直接push 没有查找到添加 ''
        arr.push(temp ? temp.name : '')
    })
    return arr
}
const SelectedArr = getSelectedSpec()
updateDisabledStatus(SelectedArr)

</script>

<template>

    <div class="goods-sku">
        <dl v-for="item in goods.specs">
            <dt>{{ item.name }}</dt>
            <dd>
                <template v-for="sub in item.values" :key="sub.name">
                    <img v-if="sub.picture" :src="sub.picture" :title='sub.name' @click='changeSelected(item, sub)'
                        :class="{ selected: sub.selected, disabled: sub.disabled }" />
                    <span v-else @click='changeSelected(item, sub)'
                        :class="{ selected: sub.selected, disabled: sub.disabled }"> {{ sub.name
                        }}</span>
                </template>
            </dd>
        </dl>
    </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;

    &.selected {
        border-color: @xtxColor;
    }

    &.disabled {
        opacity: 0.6;
        border-style: dashed;
        cursor: not-allowed;
    }
}

.goods-sku {
    padding-left: 10px;
    padding-top: 20px;

    dl {
        display: flex;
        padding-bottom: 20px;
        align-items: center;

        dt {
            width: 50px;
            color: #999;
        }

        dd {
            flex: 1;
            color: #666;

            >img {
                width: 50px;
                height: 50px;
                margin-top: 5px;
                .sku-state-mixin ();
            }

            >span {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                padding: 0 20px;
                margin-top: 5px;
                .sku-state-mixin ();
            }
        }
    }
}
</style>


