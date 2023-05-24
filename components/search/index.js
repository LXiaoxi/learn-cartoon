// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchValue: {
      type: String,
      value: ''
    },
    focus: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchValue: "",

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击输入框
    handleSearchValue(e) {
      this.setData({
        searchValue: e.detail.value
      })
    },
    // 点击搜索
    handleSearchComfirm() {
      this.triggerEvent("searchClick", this.data.searchValue)
    }
  }
})