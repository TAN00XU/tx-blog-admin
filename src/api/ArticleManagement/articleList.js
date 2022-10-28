import request from "@/api/baseRequest";


/**
 * 查询文章列表
 * @param requestParams
 * @returns {*}
 */
export function listArticleBack(requestParams) {
    return request({
        method: "GET",
        url: "/admin/articles",
        params: {
            // 页数
            current: requestParams.current,
            // 条数
            size: requestParams.size,
            // 关键字
            keywords: requestParams.keywords,
            // 分类id
            categoryId: requestParams.categoryId,
            // 文章状态
            status: requestParams.status,
            // 标签id
            tagId: requestParams.tagId,
            // 文章类型
            type: requestParams.type,
            // 删除状态
            isDelete: requestParams.isDelete
        }
    })
}

/**
 * 获取文章分类列表
 * @returns {*}
 */
export function listCategories() {
    return request({
        method: "GET",
        url: "/admin/categories/search"
    })
}

/**
 * 获取文章标签列表
 * @returns {*}
 */
export function listTags() {
    return request({
        method: "GET",
        url: "/admin/tags/search"
    })
}

/**
 * 更新置顶状态
 * @returns {*}
 */
export function updateArticleTop(article) {
    return request({
        method: "PUT",
        url: "/admin/articles/top",
        data: {
            id: article.id,
            isTop: article.isTop
        }
    })
}

/**
 * 逻辑删除与恢复
 * @param params
 * @returns {*}
 */

export function updateArticleDelete(params) {
    return request({
        method: "PUT",
        url: "/admin/articles",
        data: params
    })
}

/**
 * 彻底删除文章
 * @param params
 * @returns {*}
 */
export function deleteArticles(params) {
    return request({
        method: "DELETE",
        url: "/admin/articles",
        data: params
    })
}

