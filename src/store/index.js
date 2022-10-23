import Vue from "vue";
import Vuex from "vuex";
// 持久化state
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {
    /**
     * 登录保存用户信息
     * @param state
     * @param user 用户信息
     * @constructor
     */
    LOGIN(state, user) {
        state.userId = user.id;
        state.roleList = user.roleList;
        state.avatar = user.avatar;
        state.nickname = user.nickname;
        state.intro = user.intro;
        state.webSite = user.webSite;
    },
    /**
     * 保存用户菜单列表
     * @param state
     * @param userMenuList 用户菜单列表
     * @constructor
     */
    SAVE_USER_MENU(state, userMenuList) {
        console.log("保存用户菜单列表")
        state.userMenuList = userMenuList;
    },
    // 退出登录
    LOGOUT(state) {
        state.userId = null;
        state.roleList = null;
        state.avatar = null;
        state.nickname = null;
        state.intro = null;
        state.webSite = null;
        state.userMenuList = [];
    },
    /**
     * 保存页标签
     * @param state
     * @param tab
     */
    SAVE_TAB(state, tab) {
        if (state.tabList.findIndex(item => item.path === tab.path) === -1) {
            state.tabList.push({name: tab.name, path: tab.path});
        }
    },
    /**
     * 移除也标签
     * @param state
     * @param tab
     * @constructor
     */
    REMOVE_TAB(state, tab) {
        const index = state.tabList.findIndex(item => item.name === tab.name);
        state.tabList.splice(index, 1);
    },
    /**
     * 重置标签
     * @param state
     * @constructor
     */
    RESET_TAB(state) {
        state.tabList = [{name: "首页", path: "/"}];
    },
    /**
     * 是否收起侧边
     * @param state
     * @constructor
     */
    IS_COLLAPSE(state) {
        state.collapse = !state.collapse;
    },
}
//准备state对象——保存具体的数据
const state = {
    // 用户id
    userId: null,
    // 用户头像
    avatar: null,
    // 用户简介
    intro: null,
    //用户网站
    webSite: null,
    // 侧边栏是否贴边
    collapse: false,
    // 角色列表
    roleList: null,
    // 用户菜单列表
    userMenuList: [],
    tabList: [{name: "首页", path: "/"}],
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ]
})
