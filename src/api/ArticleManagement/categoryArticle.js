import request from "@/api/baseRequest";


/**
 * 获取分类列表
 * @param requestParams 请求参数
 * @returns {*}
 */
export function listCategories(requestParams) {
    return request({
        method: "GET",
        url: "/admin/categories",
        params: {
            // 当前页
            current: requestParams.current,
            // 条数
            size: requestParams.size,
            // 关键字
            keywords: requestParams.keywords
        }
    })
}

/**
 * 增加或编辑分类
 * @param categoryForm
 * @returns {*}
 */
export function addOrEditCategory(categoryForm) {
    return request({
        method: "POST",
        url: "/admin/categories",
        data: {
            id: categoryForm.id,
            categoryName: categoryForm.name
        }
    })
}

/**
 * 删除文章分类
 * @param categoryIdList 分类id列表
 * @returns {*}
 */
export function deleteCategory(categoryIdList) {
    return request({
        method: "delete",
        url: "/admin/categories",
        data: categoryIdList
    })
}