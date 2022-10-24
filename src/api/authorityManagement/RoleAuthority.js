import request from "@/api/baseRequest";


/**
 * 获取角色列表
 * @param params
 * @returns {*}
 */
export function listRole(params) {
    return request({
        method: "GET",
        url: "/admin/roles",
        params: {
            current: params.current,
            size: params.size,
            keywords: params.keywords
        }
    })
}

/**
 * 获取角色的资源
 * @returns {*}
 */
export function listRoleResource() {
    return request({
        method: "GET",
        url: "/admin/role/resources"
    })
}

/**
 * 获取角色的菜单
 * @returns {*}
 */
export function listRoleMenu() {
    return request({
        method: "GET",
        url: "/admin/role/menus"
    })
}

/**
 * 保存或更新角色菜单
 * @param roleForm
 * @returns {*}
 */
export function saveOrUpdateRoleMenu(roleForm) {
    return request({
        method: "POST",
        url: "/admin/roles",
        data: roleForm
    })
}