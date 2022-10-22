import request from "@/api/baseRequest";

/**
 * 获取标签列表
 * @param requestParams 请求参数
 * @returns {*}
 */
export function listTags(requestParams) {
    return request({
        method: "GET",
        url: "/admin/tags",
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
 * 增加或编辑标签
 * @param tagForm 标签表单
 * @returns {*}
 */
export function addOrEditTag(tagForm) {
    return request({
        method: "POST",
        url: "/admin/tags",
        data: {
            id: tagForm.id,
            tagName: tagForm.name
        }
    })
}

/**
 * 删除文章标签
 * @param tagIdList 标签id列表
 * @returns {*}
 */
export function deleteTag(tagIdList) {
    return request({
        method: "delete",
        url: "/admin/tags",
        data: tagIdList
    })
}
