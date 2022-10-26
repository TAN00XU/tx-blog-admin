import request from "@/api/baseRequest";


/**
 * 搜索文章分类
 * @param keywords
 * @returns {*}
 */
export function searchCategories(keywords) {
    return request({
        method: "GET",
        url: "/admin/categories/search",
        params: {
            keywords: keywords
        }
    })
}

/**
 * 搜索文章标签
 * @param keywords
 * @returns {*}
 */
export function searchTags(keywords) {
    return request({
        method: "GET",
        url: "/admin/tags/search",
        params: {
            keywords: keywords
        }
    })
}