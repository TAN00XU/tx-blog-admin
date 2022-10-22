import request from "@/api/baseRequest";


/**
 * 获取资源列表
 * @param keywords 关键字
 * @returns {*}
 */
export function listResource(keywords) {
    return request({
        method: "GET",
        url: "/admin/resources",
        params: {
            keywords: keywords
        }
    })
}

/**
 * 新增或修改资源
 * @param resource
 * @returns {*}
 */
export function saveOrUpdateResource(resource) {
    return request({
        method: "POST",
        url: "/admin/resources",
        data: resource
    })
}

/**
 * 根据id删除资源
 * @param resourceId
 * @returns {*}
 */
export function deleteResourceById(resourceId) {
    return request({
        method: "delete",
        url: `/admin/resources/${resourceId}`
    })
}

