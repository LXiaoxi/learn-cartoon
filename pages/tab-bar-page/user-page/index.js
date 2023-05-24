// pages/tab-bar-page/user-page/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    menu: [{
        name: "我的收藏",
        path: "/pages/tab-bar-page/user-page/user-collect/index"
      },
      {
        name: "问题反馈",
        path: "/pages/tab-bar-page/user-page/user-feedback/index"
      },
      {
        name: "我的信息",
        path: "/pages/tab-bar-page/user-page/user-info/index"
      },
      {
        name: "历史记录",
        path: "/pages/tab-bar-page/user-page/history-record/index"
      },
      {
        name: "联系客服",
        path: "/pages/custom-service/index"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  onShow() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  handleLogin() {
    wx.navigateTo({
      url: '/pages/user/index',
    })
  },

  // 用户收藏
  handleUserCollect() {
    wx.navigateTo({
      url: './user-collect/index',
    })
  },

  handleMenuItem(e) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `${this.data.menu[index].path}`,
    })
  }
})