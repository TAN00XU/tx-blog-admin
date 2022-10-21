import request from "@/api/baseRequest";


/**
 * 获取分类列表
 * @param params
 * @returns {*}
 */
export function listCategories(params) {
    return request({
        method: "GET",
        url: "/admin/categories",
        params: params
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
        data: categoryForm
    })
}

/**
 * 删除文章分类
 * @param CategoryIdList 分类id列表
 * @returns {*}
 */
export function deleteCategory(CategoryIdList) {
    return request({
        method: "delete",
        url: "/admin/categories",
        data: CategoryIdList
    })
}