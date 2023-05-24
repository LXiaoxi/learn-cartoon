const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

// 页面保存historyRecord
const storageHistoryRecord = (data, id, field) => {
    const historyRecord = wx.getStorageSync('historyRecord')
    if (historyRecord) {
        const index = historyRecord.findIndex(item => item[field] == id)
        console.log(index);
        // 获取存在缓存的historyRecord
        // 如果item在historyRecord中存在
        // 先删除存在的index 在把item还有history一起保存起来
        if (index > -1) {
            historyRecord.splice(index, 1)
        }
        wx.setStorageSync('historyRecord', [data, ...historyRecord])
    } else {
        wx.setStorageSync('historyRecord', [data])
    }
}

module.exports = {
    formatTime,
    storageHistoryRecord
}