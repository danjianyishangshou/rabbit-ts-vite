import { useIntersectionObserver } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 封装的scrollTOP小插件 注意@vueuse/core的库中都是以对象的形式return 所以自己封装的也是如此
 * 避免的常量不可改变的问题
 */
export const useScroll = () => {
    let y = ref(0)
    const onscroll = () => {
        y.value = document.documentElement.scrollTop
    }
    // 创建
    onMounted(() => {
        window.addEventListener('scroll', onscroll)
    })
    //  销毁
    onUnmounted(() => {
        window.removeEventListener('scroll', onscroll)
    })
    return {
        y
    }
}

/**
 * 延时调试的工具
 * @param time 
 * @returns 
 */
export const useDelay = (time = 2000) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

/**
 * 封装组件懒加载函数
 * @param callback 传入函数自动调用
 * @returns 
 * 组件数据懒加载与图片数据懒加载原理一样
 * 都是在元素到达适口范围的时候发送ajax请求
 */
export const useLazyData = (callback: () => void) => {
    const target = ref(null)
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
        if (isIntersecting) {
            callback()
            stop()
        }
    }, {
        threshold: 0//阀值 解决bug 
        // threshold 容器和可视区交叉的占比（进入的面积/容器完整面试） 取值，0-1 之间，默认比0大，所以需要滚动较多才能触发进入可视区域事件。
    })
    return {
        target
    }
}

/**
 * 幂集的计算
 *
 * @param {*[]} originalSet
 * @return {*[][]}
 */
export function bwPowerSet(originalSet: string[]) {
    const subSets = [];
    // 我们将有2^n种可能的组合(其中n是原始集合的长度)。
    // 这是因为对于原始集合中的每一个元素，我们都要决定是否包含
    //  是否(每个set元素有2个选项)。
    const numberOfCombinations = 2 ** originalSet.length;
    //  每一个从0到2^n的二进制数字都满足我们的需求: 
    //它通过位(0或1)显示是否包含集合中的相关元素。 
    //例如，对于集合{1,2,3}，0b010的二进制数意味着我们需要 
    //只包含"2"到当前集。
    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
        const subSet = [];

        for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
            //决定是否需要将当前元素包含到子集中。
            if (combinationIndex & (1 << setElementIndex)) {
                subSet.push(originalSet[setElementIndex]);
            }
        }
        // 将当前子集添加到所有子集列表中。
        subSets.push(subSet);
    }
    return subSets;
}

export function PowerSet(arr: string[]) {
    const newArr = [];
    const num = 2 ** arr.length;
    for (let k = 0; k < num; k += 1) {
        const arrItem = [];
        for (let k = 0; k < arr.length; k += 1) {
            if (k & (1 * (2 ^ k))) {
                arrItem.push(arr[k]);
            }
        }
        newArr.push(arrItem);
    }
    return newArr
}