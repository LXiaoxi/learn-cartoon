// pages/video-detail/index.js
import {
    toggleCollect
} from '../../service/api-collect'
import {
    getVideoDetailRequest
} from '../../service/api-video'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        videoDetail: {},
        currentTabIndex: 0,
        currentVideoIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            id: options.id,
            videoDetail: JSON.parse(decodeURIComponent(options.item))
        })
        this.getPageData()
    },

    getPageData() {
        getVideoDetailRequest(this.data.id).then(res => {
            if (res.code == 200) {
                this.setData({
                    videoDetail: {
                        ...this.data.videoDetail,
                        ...res.data
                    }
                })
            }
        })
    },
    handleDetailTab(e) {
        const index = e.currentTarget.dataset.index
        this.setData({
            currentTabIndex: index
        })
    },
    handleVideoItem(e) {
        const index = e.currentTarget.dataset.index
        this.setData({
            currentVideoIndex: index
        })
    },
    // 是否收藏
    handleIsCollect() {
        const videoDetail = this.data.videoDetail
        toggleCollect({
            isCollect: !videoDetail.isCollect,
            type: 2,
            typeId: videoDetail.film_id
        }).then(res => {
            if (res.code == 200) {
                this.getPageData()
            }
        })
    }
})