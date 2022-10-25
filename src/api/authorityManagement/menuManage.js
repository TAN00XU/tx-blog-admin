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