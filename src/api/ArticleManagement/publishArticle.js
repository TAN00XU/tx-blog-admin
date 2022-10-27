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

/**
 * 上传图片
 * @param formData
 * @returns {*}
 */
export function uploadImg(formData) {
    return request({
        method: "POST",
        url: "/admin/articles/images",
        data: formData
    })
}

/**
 * 发布文章
 * @param article
 * @returns {*}
 */
export function publishArticles(article) {
    return request({
        method: "POST",
        url: "/admin/articles",
        data: article
    })
}

/**
 * 根据id查询文章
 * @param articleId
 * @returns {*}
 */
export function getArticleById(articleId) {
    return request({
        method: "GET",
        url: `/admin/articles/${articleId}`
    })
}