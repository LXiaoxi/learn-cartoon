// pages/novel-chapter/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        chapterData: [],
        currentChapter: "",
        touchStart: [0, 0],
        touchEnd: [0, 0],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const index = options.index
        const chapterData = JSON.parse(options.chapterData)
        // const currentChapter = chapterData[index].chapter_content.replace(/( )/g, "1");
        this.handleChapterContent(chapterData[index].chapter_content)
        this.setData({
            index,
            chapterData,
        })

    },
    handleChapterContent(chapter_content) {
        if (chapter_content != null) {
            const currentChapter = chapter_content.replace(/(\n+)/g, "1");
            const data = currentChapter.replace(/( )/g, "1")
            const newData = data.replace(new RegExp(/1+/g), "\n")
            this.setData({
                currentChapter: newData
            })
        } else {
            this.setData({
                currentChapter: "暂无数据"
            })
        }
    },
    // 触摸开始
    touchStart(e) {
        const x = e.touches[0].pageX
        const y = e.touches[0].pageY
        this.data.touchStart = [x, y]
        this.data.touchEnd = [x, y]
    },
    // 触摸移动
    touchMove(e) {
        const x = e.touches[0].pageX
        const y = e.touches[0].pageY
        this.data.touchEnd = [x, y]
    },
    // 触摸结束
    touchEnd(e) {
        const start = this.data.touchStart[0]
        const end = this.data.touchEnd[0]
        const chapterData = this.data.chapterData
        if (start > end - 100) {
            // 左滑 下一页
            const index = ++this.data.index
            if (index == chapterData.length) {
                wx.showToast({
                    title: '当时是最后一章',
                    icon: "none"
                })
                return
            }
            this.handleChapterContent(chapterData[index].chapter_content)
            this.setData({
                index
            })
        } else {
            const index = --this.data.index
            if (index == -1) {
                wx.showToast({
                    title: '当前是第一章',
                    icon: "none"
                })
                return
            }
            this.handleChapterContent(chapterData[index].chapter_content)
            this.setData({
                index
            })
            // 右滑 上一页
        }
    }
})