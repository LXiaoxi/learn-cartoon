import xxRequest from './index'

// 获取用户的收藏 
export function getUserCollectList() {
    return xxRequest.get('/collect/list')
}

// 用户收藏-取消收藏
export function toggleCollect(data) {
    return xxRequest.post('/collect', data)
}