// component/comic-item/index.js
import {
    storageHistoryRecord
} from '../../utils/util'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击单个获取详情
        handleToDetail(e) {
            let id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/comic-detail/index?id=${id}`,
            })
            storageHistoryRecord(this.data.item, this.data.item.cartoon_id, 'cartoon_id')
            // const historyRecord = wx.getStorageSync('historyRecord')
            // if (historyRecord) {
            //     console.log(historyRecord);
            //     const index = historyRecord.findIndex(item => item.cartoon_id == this.data.item.cartoon_id)
            //     // 获取存在缓存的historyRecord
            //     // 如果item在historyRecord中存在
            //     // 先删除存在的index 在把item还有history一起保存起来
            //     if (index > -1) {
            //         historyRecord.splice(index, 1)
            //     }
            //     wx.setStorageSync('historyRecord', [this.data.item, ...historyRecord])
            // } else {
            //     wx.setStorageSync('historyRecord', [this.data.item])
            // }


        },
    }
})