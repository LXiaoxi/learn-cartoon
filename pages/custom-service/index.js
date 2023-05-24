// pages/custom-service/index.js
import io from '../../lib/weapp.socket.io'

let socket = null
const recorderManager = wx.getRecorderManager()

// import * as socket from '../../utils/socket'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyHeight: 0,
        windowHeight: wx.getWindowInfo().safeArea.height,
        toView: '',
        user_id: wx.getStorageSync('userInfo').user_id,
        sendDto: {
            to_id: 11,
            from_id: wx.getStorageSync('userInfo').user_id,
        },
        isConnect: false,
        msgRecord: null,
        msgValue: "",
        isYuyin: true
    },
    onLoad() {
        if (!this.data.isConnect) {
            socket = io(`http://192.168.1.214:7001/client`, {
                query: {
                    // token: wx.getStorageSync('userToken')
                    user_id: 37
                },
                transports: ['websocket']
            })
            this.setData({
                isConnect: true
            })
        }
        this.init()
        this.setData({
            scrollHeight: this.data.windowHeight - 80
        })

    },
    init() {
        // 已进入就发送获取消息记录的事件
        socket.emit("chatRecord", {
            from_id: 37,
            to_id: 11
        })
        // 监听在线人数
        socket.on("online", (res) => {
            this.data.sendDto.from_id = this.data.user_id
        })
        // 监听发送信息
        socket.on("receive", (res) => {
            this.setData({
                msgRecord: res,
            })
            this.setData({
                toView: `item${this.data.msgRecord.length - 1}`
            })
        })
        // 监听聊天记录
        socket.on("onChatRecord", (res) => {
            this.setData({
                msgRecord: res
            })
            this.setData({
                toView: `item${this.data.msgRecord.length - 1}`
            })
        })
    },
    handleFocus(e) {
        const keyHeight = e.detail.height;
        this.setData({
            scrollHeight: this.data.windowHeight - keyHeight - 80,
            keyHeight,
        })
        this.setData({
            toView: this.data.toView
        })

    },
    handleBlur() {
        this.setData({
            scrollHeight: this.data.scrollHeight + this.data.keyHeight,
            keyHeight: 0
        })
    },
    handleConfirm(e) {
        const value = e.detail.value
        this.data.sendDto.msg = value
        if (value === '') {
            wx.showToast({
                title: '内容不能为空',
                icon: "none"
            })
            return
        }
        this.setData({
            msgValue: ""
        })
        socket.emit('chat', this.data.sendDto)


    },
    // 语音和输入框切换
    handleToggle() {
        this.setData({
            isYuyin: !this.data.isYuyin
        })
    },
    onUnload() {
        socket.close()
    }

})

// 707