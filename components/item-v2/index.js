// components/item-v2/index.js
import {
    toggleCollect
} from '../../service/api-collect.js'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            value: {}
        },
        currentIndex: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        handleIsCollect() {

            let collectDto = {
                type: this.data.currentIndex,
                isCollect: !this.data.item.isCollect,
                typeId: this.data.item.typeId
            }
            toggleCollect(collectDto).then(res => {
                if (res.code === 200) {
                    this.setData({
                        'item.isCollect': !this.data.item.isCollect
                    })
                }
            })
        }
    }
})