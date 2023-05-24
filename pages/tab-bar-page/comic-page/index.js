// pages/tab-bar-page/comic-page/index.js
import {
    getComicCarouselRequest,
    getComicHomeListRequest,
    getComicCategory,
    getComicList
} from '../../../service/api-comic.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        comicCarousel: [],
        comicExclusiveData: [], // 独家作品
        comicRiseData: [], // 上升最快
        comicNewData: [], // 新作尝鲜
        categoryData: [],
        comicListData: [],
        comicDto: {
            category_id: 1,
            page: 0,
            pageSize: 12
        },
        hasNextPage: false,
        searchValue: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getPageData()

    },

    getPageData() {
        getComicCategory().then(res => {
            if (res.code == 200) {
                this.setData({
                    categoryData: res.data.map(item => {
                        return {
                            id: item.category_id,
                            name: item.category_name
                        }
                    })
                })
            }
        })
        this.getComicCarousel()
        this.getComicHomeData()
        this.getComicData(this.data.comicDto)
    },
    // 获取漫画数据
    getComicData(data) {
        getComicList(data).then(res => {
            this.setData({
                comicListData: [...this.data.comicListData, ...res.data],
                hasNextPage: res.hasNextPage
            })
        })
    },
    // 获取轮播图数据
    getComicCarousel() {
        getComicCarouselRequest().then(res => {
            if (res.code == 200) {
                this.setData({
                    comicCarousel: res.data
                })
            }
        })
    },
    // 获取home模块数据
    getComicHomeData() {
        getComicHomeListRequest().then(res => {
            if (res.code == 200) {
                this.setData({
                    comicExclusiveData: res.data[0]['exclusive'],
                    comicRiseData: res.data[1]['rise'],
                    comicNewData: res.data[2]['new']
                })
            }
        })
    },
    handleTabItem(e) {
        const {
            id
        } = e.currentTarget.dataset
        this.setData({
            'comicDto.category_id': id,
            'comicDto.page': 0,
            "comicDto.pageSize": 12,
            comicListData: []
        })

        this.getComicData(this.data.comicDto)
    },

    // 点击单个获取详情
    handleToDetail(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/comic-detail/index?id=${id}`,
        })
    },

    // 点击搜索框跳转搜索页面 
    hancleGoSearch() {
        wx.navigateTo({
            url: '/pages/home-search/index',
        })
    },
    onReachBottom() {
        if (this.data.hasNextPage) {
            this.setData({
                'comicDto.page': this.data.comicDto.page + 1
            })
            this.getComicData(this.data.comicDto)
        }
    }
})