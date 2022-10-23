import Layout from "@/components/layout";
import router from "@/router";
import store from "../store";
import Vue from "vue";

import {getMenus} from "@/api/menu";


/**
 * 初始化用户菜单
 * @returns {Boolean}
 */
export function initMenu() {
    console.log("初始化用户菜单")
    // 查询用户菜单
    getMenus().then(
        ({data}) => {
            if (data.status) {
                const userMenuList = data.data;
                userMenuList.forEach(item => {
                    if (item.icon != null) {
                        item.icon = "iconfont " + item.icon;
                    }
                    if (item.component === "Layout") {
                        item.component = Layout;
                        // layout不用点
                        item.redirect = '/'
                    }
                    if (item.children && item.children.length > 0) {
                        item.children.forEach(route => {
                            route.icon = "iconfont " + route.icon;
                            route.component = loadView(route.component);
                        });
                    }
                    // 添加菜单到路由
                    router.addRoute(item)
                });
                console.log("======================")
                // 添加侧边栏菜单
                store.commit("SAVE_USER_MENU", userMenuList);
                // 添加菜单到路由 已弃用
                // router.addRoutes(userMenuList);
            } else {
                Vue.prototype.$message.error(data.message);
                router.resolve({path: "/login"});
            }
            // return true;
        }
    ).catch(() => {
        Vue.prototype.$message.error('菜单获取失败');
        router.resolve({path: "/login"});
    });
}

export const loadView = view => {
    // 路由懒加载
    return resolve => require([`@/views${view}`], resolve);
};
