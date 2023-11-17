// 二次封装信息提示的库
import { ElNotification } from 'element-plus'

export function totast(message, type = "success", dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}