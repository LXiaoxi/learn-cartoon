// pages/tab-bar-page/user-page/user-feedback/index.js
import {
    BASEURL
} from '../../../../constants/common-url'
import {
    addFeedback
} from '../../../../service/api-feedback'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: "",
        problemValue: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    handleUpload() {
        const that = this
        wx.chooseMedia({
            success(res) {
                const tempFilePath = res.tempFiles[0].tempFilePath
                wx.uploadFile({
                    url: BASEURL + '/upload', //仅为示例，非真实的接口地址
                    filePath: tempFilePath,
                    name: 'file',
                    formData: {},
                    success(res) {
                        const data = JSON.parse(res.data)
                        if (data.code = 200) {
                            that.setData({
                                imgUrl: BASEURL + '/' + data.data.imgUrl
                            })
                        }
                    }
                })
            }
        })
    },
    // 
    handleSubmit() {
        addFeedback({
            problem: this.data.problemValue,
            image_url: this.data.imgUrl
        }).then(res => {
            if (res.code == 200) {
                wx.showToast({
                    title: res.msg,
                    icon: "none",
                    success: () => {
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1,
                            })
                        }, 1000)
                    }
                })

            }

        })
    }
})