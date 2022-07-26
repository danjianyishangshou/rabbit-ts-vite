<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Spec, SpecValue } from '@/types/goods'

defineProps<{
    goods: GoodsInfo
}>()

// 设置选中状态
const changeSelected = (item: Spec, sub: SpecValue) => {
    if (sub.selected) {
        sub.selected = false
    } else {
        // 干掉所有人 复活我自己
        item.values.forEach(i => i.selected = false)
        sub.selected = true
    }
}
</script>
<template>
    <div class="goods-sku">
        <dl v-for="item in goods.specs">
            <dt>{{ item.name }}</dt>
            <dd>
                <template v-for="sub in item.values" :key="sub.name">
                    <img v-if="sub.picture" :src="sub.picture" :title='sub.name' @click='changeSelected(item, sub)'
                        :class="{ selected: sub.selected }" />
                    <span v-else @click='changeSelected(item, sub)' :class="{ selected: sub.selected }"> {{ sub.name
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


