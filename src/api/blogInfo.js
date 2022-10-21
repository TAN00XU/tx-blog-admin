import request from "@/api/baseRequest";


/**
 * 获取到博客信息
 * @returns {*}
 */
export function blogInfo() {
    return request({
        method: "GET",
        url: "/web/website/config"
    })
}

/**
 * 更新博客信息
 * @returns {*}
 */
export function updateBlogInfo(websiteConfig) {
    return request({
        method: "PUT",
        url: "/api/admin/website/config",
        data: websiteConfig
    })
}

/**
 * 上传访客信息
 * @returns {*}
 */
export function report() {
    return request({
        method: "POST",
        url: "/web/report"
    })
}