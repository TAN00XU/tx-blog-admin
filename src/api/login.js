import request from "@/api/baseRequest";


/**
 * 登录
 * @param param 登录参数
 * @returns {*}
 */
export function login(param) {
    return request({
        method: "POST",
        url: "/web/user/login",
        data: param
    })
}


/**
 * 退出登录
 * @desc GET
 * @returns {*}
 */
export function logout() {
    return request({
        method: "GET",
        url: "/web/user/logout"
    })
}

