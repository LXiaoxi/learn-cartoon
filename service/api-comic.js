import xxRequest from './index'
export function getComicCategory() {
    return xxRequest.get(`/cartoon/category/list`)
}

export function getComicList(data) {
    return xxRequest.get(`/cartoon/list`, data)
}

// 获取轮播图数据
export function getComicCarouselRequest() {
    return xxRequest.get(`/cartoon/carousel/list`)
}
// 获取主页模块数据
export function getComicHomeListRequest() {
    return xxRequest.get(`/cartoon/home/list`)
}

export function getComicDetailRequest(id) {
    return xxRequest.get(`/comicInfo/detail/${id}`)
}

// 推荐数据
export function getComicRecommendRequest() {
    return xxRequest.get(`/comicInfo/recommend`)
}

// 获取目录数据
export function getDirectoryDataRequest(data) {
    return xxRequest.get(`/comicInfo/directory/list`, data)
}