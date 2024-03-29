/// <reference types="vite/client" />
// vue
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
// QC
declare namespace QC {
  const Login: {
    /**
     * 检查QQ是否登录成功
     */
    check: () => boolean
    /**
     * 获取openId
     */
    getMe: (callback: (openId: string) => void) => void
  }
  const api: (api: 'get_user_info') => { success: (res: any) => void }
}