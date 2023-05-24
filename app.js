// app.js
import {
    checkSession
} from "./service/api-user"
App({
    onLaunch() {
        // 登录
        let userToken = wx.getStorageSync("userToken")
        if (!userToken) {
            wx.navigateTo({
                url: '/pages/user/index',
            })
        }
    },
    globalData: {
        userInfo: null
    }
})