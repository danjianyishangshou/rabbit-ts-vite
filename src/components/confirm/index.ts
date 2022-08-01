import { h, render } from 'vue'

import XtxConfirm from './confirm.vue'
interface TConfirm {
    text: string
    title?: string
}

const divDom = document.createElement('div')
divDom.classList.add('XtxConform')
document.body.append(divDom)

export const Confirm = ({ text, title }: TConfirm) => {
    return new Promise((resolve, reject) => {

        const affirm = () => {
            render(null, divDom)
            resolve('执行成功')
        }
        const close = () => {
            render(null, divDom)
            reject('执行失败')
        }
        const vNode = h(XtxConfirm,
            {
                text,
                title,
                affirm,
                close
            }
        )
        render(vNode, divDom)
    })
}
