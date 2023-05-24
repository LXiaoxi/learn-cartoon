// pages/comic/index.js
import {
    toggleCollect
} from '../../service/api-collect'
import {
    getComicDetailRequest,
    getComicRecommendRequest,
    getDirectoryDataRequest
} from '../../service/api-comic'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        comicDetail: {},
        currentTabIndex: 0,
        comicRecommend: [],
        comicDirectory: [],
        serialLength: 0, // 连载长度
        hasNextPage: false,
        directoryDto: {
            id: 0,
            page: 0,
            pageSize: 40
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const id = options.id ?? 210333
        this.setData({
            id,
            "directoryDto.id": id
        })
        this.getPageData(id)
        this.getDirectoryData()
    },

    getPageData(id) {
        this.getComicDetail()
        // 获取推荐数据
        getComicRecommendRequest().then(res => {
            if (res.code == 200) {
                this.setData({
                    comicRecommend: res.data
                })
            }
        })
    },

    // 获取漫画信息
    getComicDetail() {
        getComicDetailRequest(this.data.id).then(res => {
            if (res.code == 200) {
                this.setData({
                    comicDetail: res.data
                })
            }
        })
    },
    handleDetailTab(e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            currentTabIndex: index
        })
    },
    getDirectoryData() {
        // 获取目录数据
        getDirectoryDataRequest(this.data.directoryDto).then(res => {
            if (res.code == 200) {
                this.setData({
                    comicDirectory: [...this.data.comicDirectory, ...res.data],
                    serialLength: res.total,
                    hasNextPage: res.hasNextPage
                })
            }
        })
    },
    // 点击推荐item 
    handleReCommend(e) {
        const index = e.currentTarget.dataset.index
        const comic_id = this.data.comicRecommend[index].comic_id
        wx.navigateTo({
            url: `/pages/comic-detail/index?id=${comic_id}`,
        })

    },
    // 点击开始阅读
    handleStartRead() {
        this.handleChapterItem()
    },
    // 点击章节
    handleChapterItem(e) {
        const token = wx.getStorageSync('userToken')
        if (!token) {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 1000,
            })
            setTimeout(() => {
                wx.navigateTo({
                    url: '/pages/user/index',
                })
            }, 1000);

            return
        }
        let index = 0
        if (e) index = e.currentTarget.dataset.index
        const comicDirectory = JSON.stringify(this.data.comicDirectory) // 所有数据都传过去
        const title = this.data.comicDetail.comic_name
        wx.navigateTo({
            url: `/pages/chapter-content/index?index=${index}&data=${encodeURIComponent(comicDirectory)}&title=${title}`
        })
    },
    // 收藏
    handleIsCollect() {
        const isCollect = !this.data.comicDetail.isCollect
        toggleCollect({
            isCollect,
            type: 0,
            typeId: this.data.comicDetail.comic_id
        }).then(res => {
            if (res.code == 200) {
                this.getComicDetail()
            }
        })
    },
    onReachBottom() {
        if (this.data.hasNextPage) {
            this.setData({
                'directoryDto.page': this.data.directoryDto.page + 1,
            })
            this.getDirectoryData()
        }
    }
})