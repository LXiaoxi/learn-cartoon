// pages/novel-detail/index.js
import {
    toggleCollect
} from '../../service/api-collect'
import {
    getNovelChapterRequest
} from '../../service/api-novel'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        chapterDto: {
            novel_number: null,
            page: 0,
            pageSize: 10
        },
        item: {},
        currentTabIndex: 0,
        chapterData: [],
        hasNextPage: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const id = options.id
        this.setData({
            id,
            item: JSON.parse(options.item),
            ['chapterDto.novel_number']: id
        })
        this.getPageData()
    },
    getPageData() {
        getNovelChapterRequest(this.data.chapterDto).then(res => {
            if (res.code == 200) {
                this.setData({
                    chapterData: [...this.data.chapterData, ...res.data],
                    hasNextPage: res.hasNextPage
                })
            }
        })
    },
    // tab切换
    handleDetailTab(e) {
        const index = e.currentTarget.dataset.index
        this.setData({
            currentTabIndex: index
        })
    },
    // 章节
    handleChapterItem(e) {
        const index = e.currentTarget.dataset.index
        wx.navigateTo({
            url: `/pages/novel-chapter/index?index=${index}&chapterData=${JSON.stringify(this.data.chapterData)}`,
        })
    },

    // 收藏
    handleIsCollect() {
        const item = this.data.item
        if (item.isCollect == null) {
            item.isCollect = false
        }
        toggleCollect({
            isCollect: !item.isCollect,
            type: 1,
            typeId: item.novel_number
        }).then(res => {
            if (res.code == 200) {
                this.setData({
                    ['item.isCollect']: !item.isCollect
                })
            }
        })
    },
    // 下拉加载更多
    onReachBottom() {
        if (this.data.hasNextPage) {
            this.setData({
                'chapterDto.page': ++this.data.chapterDto.page
            })
            this.getPageData()
        }
    }
})