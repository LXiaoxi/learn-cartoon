import {
    getComicSearchRequest
} from "../../service/api-search";

// pages/home-search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchData: [],
        searchDto: {
            keyWord: "",
            page: 0,
            pageSize: 10
        },
        searchData: [],
        hasNextPage: false,
        searchRecord: wx.getStorageSync('searchRecord') || [],
        isShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},

    handleSearch(e) {
        if (!e.detail) return
        // 1. 拿到记录的值
        // 2. 塞进searchRecord
        // 进阶版一
        // 如果输入的已存在, 那么就删除当前那一项

        // 进阶版二
        // 最多保存15条数据
        // 当searchRecord的长度到达15 再添加的时候就从尾部删除一条

        // 3. 保存到storage里面
        const searchValue = e.detail
        const searchRecord = this.data.searchRecord
        const index = searchRecord.indexOf(searchValue)
        if (index !== -1) {
            searchRecord.splice(index, 1)
        }
        searchRecord.unshift(searchValue)
        if (searchRecord.length > 15) {
            searchRecord.pop()
        }
        this.setData({
            searchRecord
        })
        wx.setStorageSync('searchRecord', searchRecord)

        this.setData({
            ['searchDto.keyWord']: e.detail
        })
        this.getSearchData()

    },
    getSearchData() {
        getComicSearchRequest(this.data.searchDto).then(res => {
            if (res.code == 200) {
                console.log(res);
                this.setData({
                    searchData: res.data,
                    hasNextPage: res.hasNextPage,
                    isShow: true
                })
            }
        })
    },
    // 删除记录
    handleDeleteRecord() {
        wx.showModal({
            content: "确认删除全部历史记录?",
            success: (res) => {
                if (res.confirm) {
                    // 确认删除
                    wx.removeStorageSync('searchRecord')
                    this.setData({
                        searchRecord: []
                    })
                }
            },

            fail: () => {

            }
        })
    },
    handleSearchRecord(e) {
        const currentItem = e.currentTarget.dataset.value
        this.setData({
            ['searchDto.keyWord']: currentItem
        })
        this.getSearchData()
    }
})