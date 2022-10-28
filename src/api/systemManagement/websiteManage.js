import request from "@/api/baseRequest";


/**
 * 获取到博客配置
 * @returns {*}
 */
export function getWebsiteConfig() {
    return request({
        method: "GET",
        url: "/admin/website/config"
    })
}

/**
 * 更新博客配置信息
 * @returns {*}
 */
export function updateBlogInfo(websiteConfig) {
    return request({
        method: "PUT",
        url: "/admin/website/config",
        data: websiteConfig
    })
}
