import io from '../lib/weapp.socket.io'

let wsStatus = false
export let socket = io(`http://192.168.1.214:7001/client`, {
    query: {
        token: wx.getStorageSync('userToken')
    },
    transports: ['websocket']
})
export const connect = function (cb) {

    if (!socket) {

        socket.on('connect', function (res) { // 监听socket 是否连接成功
            cb(true, socket)
            wsStatus = true
        })

        setTimeout(function () { // 超时10秒，返回false
            if (!wsStatus) {
                cb(false, socket)
            }
        }, 10000)

    } else {
        cb(true, socket)
    }
}