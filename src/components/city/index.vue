<script lang="ts" setup name="XtxCity">
import { ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { AreaList, ChangeResult } from './city'
import axios from 'axios'
defineProps<{
    userAddress?: string
}>()
const emits = defineEmits<{
    (e: 'changeCity', value: ChangeResult): void
}>()
// 选择城市
const changeResult = ref({
    provinceCode: '',
    provinceName: '',
    cityCode: '',
    cityName: '',
    countyCode: '',
    countyName: ''
})

const value = ref<null | string>(null)
const active = ref(false)
const cityList = ref<AreaList[]>([])
const cityListCopy = ref<AreaList[]>([])
const toggle = () => {
    active.value = !active.value
}
const target = ref(null)
onClickOutside(target, () => {
    active.value = false
})
const baseUrl = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
const getCityList = async () => {
    const res = await axios.get(baseUrl)
    cityList.value = res.data
    cityListCopy.value = res.data
}
getCityList()

watch(active, (value) => {
    if (value) return
    cityList.value = cityListCopy.value
})
const selectCity = (item: AreaList) => {
    if (item.level === 0) {
        changeResult.value.provinceCode = item.code
        changeResult.value.provinceName = item.name
        cityList.value = item.areaList
    } else if (item.level === 1) {
        changeResult.value.cityCode = item.code
        changeResult.value.cityName = item.name
        cityList.value = item.areaList
    } else if (item.level === 2) {
        changeResult.value.countyCode = item.code
        changeResult.value.countyName = item.name
        emits('changeCity', changeResult.value)
        active.value = false
    }
}

</script>
<template>
    <div class="xtx-city" ref="target">
        <div class="select" :class="{ active }" @click="toggle">
            <span class="placeholder" v-if="!userAddress">请选择配送地址</span>
            <span class="value" v-else>{{ userAddress }}</span>
            <i class="iconfont icon-angle-down"></i>
        </div>
        <div class="option" v-show="active">
            <span class="ellipsis" v-for="item in cityList" :key="item.code" @click="selectCity(item)">{{
                    item.name
            }}</span>
        </div>
    </div>
</template>

<style scoped lang="less">
.xtx-city {
    display: inline-block;
    position: relative;
    z-index: 400;

    .select {
        border: 1px solid #e4e4e4;
        height: 30px;
        padding: 0 5px;
        line-height: 28px;
        cursor: pointer;

        &.active {
            background: #fff;
        }

        .placeholder {
            color: #999;
        }

        .value {
            color: #666;
            font-size: 12px;
        }

        i {
            font-size: 12px;
            margin-left: 5px;
        }
    }

    .option {
        width: 542px;
        border: 1px solid #e4e4e4;
        position: absolute;
        left: 0;
        top: 29px;
        background: #fff;
        min-height: 30px;
        line-height: 30px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;

        >span {
            width: 130px;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;
            padding: 0 3px;

            &:hover {
                background: #f5f5f5;
            }
        }
    }
}
</style>

