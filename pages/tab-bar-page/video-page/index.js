// pages/tab-bar-page/vedio-page/index.js
import {
    getVideoCategoryRequest,
    getVideoCategoryConditionRequest,
    getVideoListRequest
} from '../../../service/api-video'
import {
    storageHistoryRecord
} from '../../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryData: [],
        isShowMenu: false,
        currentTabIndex: 0,
        categoryConditionData: [],
        currentMenuIndex: 0,
        currentSubMenuIndex: 0,
        videoListDto: {
            page: 0,
            pageSize: 12
        },
        videoList: [],
        hasNextPage: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getPageData()
        this.getVideoList()
    },

    getPageData() {
        getVideoCategoryRequest().then(res => {
            if (res.code == 200) {
                this.setData({
                    categoryData: res.data.map(item => {
                        return {
                            id: item.id,
                            name: item.category_name
                        }
                    })
                })
            }
        })
    },
    getCategoryCondition() {
        getVideoCategoryConditionRequest(this.data.currentTabIndex).then(res => {
            if (res.code == 200) {
                this.setData({
                    categoryConditionData: res.data
                })
            }
        })
    },
    getVideoList() {
        getVideoListRequest(this.data.videoListDto).then(res => {
            if (res.code == 200) {
                this.setData({
                    videoList: [...this.data.videoList, ...res.data],
                    hasNextPage: res.hasNextPage
                })
            }
        })
    },
    // 点击tab
    handleCategoryTab(e) {
        const currentTabIndex = e.detail
        this.setData({
            currentTabIndex,
            isShowMenu: true,
            currentMenuIndex: 0,
        })
        this.getCategoryCondition()
    },
    // 点击菜单
    handleMenuItem(e) {
        const index = e.currentTarget.dataset.index
        this.setData({
            currentMenuIndex: index,
            currentSubMenuIndex: 0
        })
    },
    // 点击二级菜单
    handleSubMenuItem(e) {
        const index = e.currentTarget.dataset.index
        const id = e.currentTarget.dataset.id
        if (this.data.videoListDto.film_id == id) return
        this.setData({
            currentSubMenuIndex: index,
            ['videoListDto.page']: 0,
            ['videoListDto.film_id']: id,
            videoList: [],
        })
        this.getVideoList()
    },
    // 点击空白处菜单隐藏
    handleShowMenu() {
        this.setData({
            isShowMenu: false
        })
    },
    // 点击videoItem进入详情
    handleVideoItem(e) {
        const index = e.currentTarget.dataset.index
        const item = this.data.videoList[index]
        const id = item.id
        wx.navigateTo({
            url: `/pages/video-detail/index?id=${id}&item=${encodeURIComponent(JSON.stringify(item))}`,
        })
        storageHistoryRecord(item, id, item.film_id)
    },
    // 下拉加载更多
    onReachBottom() {
        if (this.data.hasNextPage) {
            this.setData({
                ['videoListDto.page']: ++this.data.videoListDto.page
            })
            this.getVideoList()
        }
    },
    // 监听页面滚动
    onPageScroll() {
        if (!this.data.isShowMenu) return
        this.setData({
            isShowMenu: false
        })
    }
})