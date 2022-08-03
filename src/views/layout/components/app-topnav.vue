<script lang="ts" setup name="AppTopnav">
import { Confirm } from '@/components/confirm'
import Message from '@/components/message'
import useStore from '@/store'
import { useRouter } from 'vue-router'
const router = useRouter()
const { user, cart } = useStore()
const clickLogout = async () => {
    await Confirm({
        text: '亲,确认退出吗?'
    }).then(async () => {
        Message.warning('退出成功')
        cart.loginOut()
        router.push('/login')
        await user.logout()
    })

}
</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <template v-if="user.profile.id">
                    <li>
                        <a href="javascript:;"><i class="iconfont icon-user"></i>{{ user.profile.nickname }}</a>
                    </li>
                    <li><a href="javascript:;" @click="clickLogout">退出登录</a></li>
                </template>
                <template v-else>
                    <li>
                        <RouterLink :to="`/login`">请先登录</RouterLink>
                    </li>
                    <li><a href="javascript:;">免费注册</a></li>
                </template>
                <li><a href="javascript:;">我的订单</a></li>
                <li><a href="javascript:;">会员中心</a></li>
                <li><a href="javascript:;">帮助中心</a></li>
                <li><a href="javascript:;">关于我们</a></li>
                <li>
                    <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped lang="less">
.app-topnav {
    background: #333;

    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: @xtxColor;
                }
            }

            // ~就是表示li 的兄弟切是li的标签
            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>