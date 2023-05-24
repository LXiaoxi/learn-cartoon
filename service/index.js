import {
    BASEURL
} from '../constants/common-url'
class XxRequest {
    constructor(baseUrl, timeout) {
        this.baseUrl = baseUrl
        this.timeout = timeout
    }
    request(url, method, data) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: this.baseUrl + url,
                data: data,
                header: {
                    Authorization: wx.getStorageSync('userToken')
                },
                method: method,
                timeout: this.timeout,
                success: (res) => {
                    resolve(res.data)
                },
                fail: reject,
            })
        })
    }
    get(url, data) {
        return this.request(url, 'GET', data)
    }
    post(url, data) {
        return this.request(url, 'post', data)
    }
    delete(url, data) {
        return this.request(url, 'delete', data)
    }
    put(url, data) {
        return this.request(url, 'put', data)
    }
}

const xxRequest = new XxRequest(BASEURL, 500)
// const xxRequest = new XxRequest("http://192.168.1.214:7001", 500)

export default xxRequest