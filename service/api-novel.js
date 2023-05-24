import xxRequest from './index'

// 获取小说分类
export function getNovelCategoryRequest() {
    return xxRequest.get(`/novel/category/list`)
}

// 获取小说列表
export function getNovelListRequest(data) {
    return xxRequest.get(`/novel/list`, data)
}

// 获取小说章节
export function getNovelChapterRequest(data) {
    return xxRequest.get(`/novel/chapter/list`, data)
}