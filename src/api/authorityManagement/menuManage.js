import request from "@/api/baseRequest";


/**
 * 获取菜单列表
 * @returns {*}
 */
export function listMenus(keywords) {
    return request({
        method: "GET",
        url: "/admin/menus",
        params: {
            keywords: keywords
        }
    })
}

/**
 * 新增或修改菜单
 * @param menuForm
 * @returns {*}
 */
export function saveOrUpdateMenu(menuForm) {
    return request({
        method: "POST",
        url: "/admin/menus",
        data: menuForm

    })
}

/**
 * 删除菜单
 * @param menuId
 * @returns {*}
 */
export function deleteMenu(menuId) {
    return request({
        method: "DELETE",
        url: `/admin/menus/${menuId}`
    })
}