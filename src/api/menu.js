import request from "@/api/baseRequest";


/**
 * 获取菜单
 * @returns {*}
 */
export function getMenus() {
    return request({
        method: "GET",
        url: "/admin/listMenus"
        // url: "https://admin.talkxj.com/api/admin/user/menus"
    })
}