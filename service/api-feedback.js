import xxRequest from './index'
export function addFeedback(data) {
    return xxRequest.post('/feedback/add', data)
}