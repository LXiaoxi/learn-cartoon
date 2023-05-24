// pages/tab-bar-page/user-page/user-collect/index.js
import {
    getUserCollectList,
    toggleCollect
} from '../../../../service/api-collect'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collectList: {},
        collectTab: [{
            id: 0,
            name: "漫画"
        }, {
            id: 1,
            name: "小说"
        }, {
            id: 2,
            name: "视频"
        }],
        currentIndex: 0,
        collectItemData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getPageData()
    },
    getPageData() {
        getUserCollectList().then(res => {
            if (res.code == 200) {
                this.setData({
                    collectList: res.data,
                    collectItemData: res.data[this.data.currentIndex]
                })
            }
        })
    },
    handleTabItem(e) {
        this.setData({
            currentIndex: e.detail,
            collectItemData: this.data.collectList[e.detail]
        })
    },
    // 是否收藏
    handleIsCollect(e) {
        const index = e.currentTarget.dataset.index
        const item = this.data.collectItemData[index]
        toggleCollect({
            isCollect: false,
            type: this.data.currentIndex,
            typeId: item.typeId
        }).then(res => {
            this.getPageData()
        })
    }

})