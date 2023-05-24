// pages/chapter-content/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        chapterInfo: [],
        currentIndex: 0,
        title: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        const index = options.index
        const data = JSON.parse(decodeURIComponent(options.data))
        const title = options.title
        this.setData({
            chapterInfo: data,
            currentIndex: index,
            title
        })
        this.dynamicUpdateNavTitle()

    },
    // 上一话
    handlePreviou() {
        let currentIndex = this.data.currentIndex
        if (currentIndex == 0) {
            wx.showToast({
                title: '没有上一章',
                icon: "none"
            })
            return
        }
        this.setData({
            currentIndex: --currentIndex
        })
        wx.pageScrollTo({
            scrollTop: 0
        })
        this.dynamicUpdateNavTitle()


    },
    // 下一话
    handleNext() {
        this.setData({
            currentIndex: ++this.data.currentIndex
        })
        wx.pageScrollTo({
            scrollTop: 0
        })
        this.dynamicUpdateNavTitle()

    },

    // 动态修改导航栏标题
    dynamicUpdateNavTitle() {
        const title = this.data.title.concat(this.data.chapterInfo[this.data.currentIndex].chapter_name)
        wx.setNavigationBarTitle({
            title
        })
    }
})