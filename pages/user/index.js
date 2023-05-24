// pages/user/index.js
import {
    login
} from "../../service/api-user.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loginData: {
            code: "",
            encryptedData: "",
            iv: "",
            signature: "",
            info: ""
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    handleLogin() {
        console.log("123");
        const getWxCode = () => {
            return new Promise((resolve, reject) => {
                wx.login({
                    success(res) {
                        if (res.code) {
                            resolve(res.code)
                        } else {
                            console.log("success 失败");
                        }
                    }
                })
            })
        }
        const getUserInfo = () => {
            return new Promise((resolve, reject) => {
                wx.getUserProfile({
                    desc: 'desc',
                    success: res => {
                        resolve(res)
                    },
                    fail: err => {
                        reject(err)
                    }
                })
            })
        }
        Promise.all([getWxCode(), getUserInfo()]).then((prmiseRes) => {
            this.setData({
                'loginData.code': prmiseRes[0],
                'loginData.encryptedData': prmiseRes[1].encryptedData,
                'loginData.iv': prmiseRes[1].iv,
                'loginData.signature': prmiseRes[1].signature,
                "loginData.userInfo.nickName": prmiseRes[1].userInfo.nickName,
                "loginData.userInfo.gender": prmiseRes[1].userInfo.gender,
                "loginData.userInfo.avatarUrl": prmiseRes[1].userInfo.avatarUrl
            })
            login(this.data.loginData).then(res => {
                if (res.code == 200) {
                    wx.setStorageSync('userInfo', {
                        ...prmiseRes[1].userInfo,
                        ...res.data.userInfo[0]
                    })
                    wx.setStorageSync('userToken', res.data.token)
                    wx.navigateBack({
                        delta: 1,
                    })
                }
            })
        }).catch(err => {
            wx.showToast({
                title: '您已拒绝获取手机号申请',
                icon: 'none'
            })
        })
    },
})