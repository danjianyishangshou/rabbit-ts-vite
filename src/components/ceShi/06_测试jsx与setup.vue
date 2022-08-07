<script setup lang="tsx">
import { ref } from 'vue';

const count = ref(0)
const show = ref(true)
const arr = [...('.'.repeat(10))].map((item, index) => index + 1)
const VDom = () => (
    <div >
        {show.value ? <h2>hello  Tsx in setup</h2> : ''}
        <h3>{count.value}</h3>
        <button onClick={() => count.value += 1}>加一</button>
        <button onClick={() => show.value = !show.value}>显示隐藏</button>
        <ul>
            {
                arr.map((item, index) => item < 2 ?
                    (<li key={index}>{item + '哈哈哈'}</li>) :
                    (item < 8 ?
                        (<li key={index}>{item + '嘻嘻嘻'}</li>) :
                        <li key={index}>{item + '呵呵呵'}</li>
                    ))
            }
        </ul>
    </div>
)

</script>
<template>
    <VDom></VDom>
</template>
<style scoped>
</style>