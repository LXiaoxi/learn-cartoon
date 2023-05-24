import xxRequest from './index'

// 获取分类
export function getVideoCategoryRequest() {
    return xxRequest.get('/video/category/list')
}

// 获取分类其他条件
export function getVideoCategoryConditionRequest(id) {
    return xxRequest.get(`/video/condition/list/${id}`)
}

// 获取数据
export function getVideoListRequest(data) {
    return xxRequest.get("/video/list/film", data)
}

// 获取video详情
export function getVideoDetailRequest(id) {
    return xxRequest.get(`/video/detail/info/${id}`)
}