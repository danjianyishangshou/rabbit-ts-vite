import { h, render } from 'vue'
import XtxMessage from './index.vue'
export type TMessage = {
    type: 'success' | 'error' | 'warning',
    text: string,
    duration?: number
}
export default function Message({ type, text, duration }: TMessage) {
    const div = document.createElement('div')
    div.setAttribute('class', 'Xtx-Message')
    document.body.appendChild(div)
    const VNode = h(
        XtxMessage,
        { type, text, duration }
    )
    render(VNode, div)
    // // let timerId: number = -1
    // timerId = window.setTimeout(() => {
    //     clearTimeout(timerId)
    //     render(null, div)
    // }, duration);
}

Message.success = (text: string, duration = 1500) => {
    Message({
        type: 'success',
        text,
        duration
    })
}
Message.error = (text: string, duration = 1500) => {
    Message({
        type: 'error',
        text,
        duration
    })
}
Message.warning = (text: string, duration = 1500) => {
    Message({
        type: 'warning',
        text,
        duration
    })
}