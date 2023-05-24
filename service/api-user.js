import xxRequest from './index'
export function login(data) {
    return xxRequest.post(`/user/wxLogin`, data)
}

// 判断微信session是否过期接口
export function checkSession() {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: (res) => {
                resolve(true)
            },
            fail: (err) => {
                reject(false)
            }
        })
    })
}
// 修改用户信息
export function updateUserInfo(id, data) {
    return xxRequest.put(`/user/wx/update/${id}`, data)

}