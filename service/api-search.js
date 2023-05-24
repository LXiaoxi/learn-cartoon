import xxRequest from './index'
export function getComicSearchRequest(data) {
    return xxRequest.get("/cartoon/search", data)
}