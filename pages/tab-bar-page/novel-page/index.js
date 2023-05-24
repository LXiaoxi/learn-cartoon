// pages/tab-bar-page/novel-page/index.js
import {
    getNovelCategoryRequest,
    getNovelListRequest
} from '../../../service/api-novel'
import { storageHistoryRecord } from '../../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryData: [],
        currentCategoryId: 1,
        novelList: [],
        hasNextPage: false,
        novelListDto: {
            table: 'left',
            category_id: 1,
            page: 0,
            pageSize: 12
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getNovelCategory()
        this.getNovelList()
    },

    getNovelCategory() {
        // 获取分类
        getNovelCategoryRequest().then(res => {
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
    getNovelList() {
        // 获取列表
        getNovelListRequest(this.data.novelListDto).then(res => {
            if (res.code == 200) {
                this.setData({
                    novelList: [...this.data.novelList, ...res.data],
                    hasNextPage: res.hasNextPage
                })
            }
        })
    },
    handleTabClick(e) {
        this.setData({
            currentCategoryId: e.detail,
            ['novelListDto.category_id']: e.detail,
            ['novelListDto.page']: 0,
            novelList: []
        })
        this.getNovelList()
    },
    handleNovelItem(e) {
        const id = e.currentTarget.dataset.id
        const index = e.currentTarget.dataset.index
        const item = this.data.novelList[index]
        wx.navigateTo({
            url: `/pages/novel-detail/index?id=${id}&item=${JSON.stringify(item)}`,
        })
        storageHistoryRecord(item, id, 'novel_number')
    },
    onReachBottom() {
        if (this.data.hasNextPage) {
            this.setData({
                'novelListDto.page': ++this.data.novelListDto.page
            })
            this.getNovelList()
        }
    }
})