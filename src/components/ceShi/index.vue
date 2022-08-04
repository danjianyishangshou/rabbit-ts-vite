<script setup lang="ts">
import { ref } from 'vue';
let show = ref(false)
const showHandler = () => {
    show.value = true
}
</script>
<template>
    <div>
        <button @click="showHandler">点击切换</button>
        <XtxDialog title="小情歌" v-model:visible="show">
            这是一首简单的小情歌
            <template #footer>
                <XtxButton type="gray" style="margin-right: 20px" @click="show = false">取消</XtxButton>
                <XtxButton type="primary">确认</XtxButton>
            </template>
        </XtxDialog>
    </div>
</template>
<style scoped>
</style>