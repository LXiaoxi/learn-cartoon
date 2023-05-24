import {
    updateUserInfo
} from "../../../../service/api-user"

// pages/tab-bar-page/user-page/user-info/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: "",
        nickName: null,
        sexArr: ["女", "男", "未知"],
        birthday: "",
        sex: null,
        phone: null,
        hobby: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const userInfo = wx.getStorageSync('userInfo')
        this.setData({
            userInfo,
            sex: userInfo.gender,
            nickName: userInfo.nickName,
            phone: userInfo.phone,
            hobby: userInfo.hobby,
            birthday: userInfo.birthday
        })
    },
    handleNickName(e) {
        this.setData({
            nickName: e.detail.value
        })
    },
    handleGenderPicker(e) {
        this.setData({
            sex: e.detail.value
        })
    },
    handleBirthdayPicker(e) {
        this.setData({
            birthday: e.detail.value
        })
    },
    handlePhone(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    handleHobby(e) {
        this.setData({
            hobby: e.detail.value
        })
    },
    handleSubmit() {
        const userDto = {
            phone: this.data.phone,
            gender: this.data.sex,
            birthday: this.data.birthday,
            hobby: this.data.hobby,
            avatarUrl: this.data.avatarUrl,
            nickName: this.data.nickName
        }
        updateUserInfo(this.data.userInfo.user_id, userDto).then(res => {
            if (res.code == 200) {
                wx.setStorageSync('userInfo', {
                    ...this.data.userInfo,
                    ...res.data
                })
            }
        })
    }
})