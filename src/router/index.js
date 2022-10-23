import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
/*加载进度条*/
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {initMenu} from "@/utils/menu";

Vue.use(VueRouter);


const routes = [
    {
        path: "/login",
        name: "登录",
        hidden: true,
        component: () => import("@/views/login/LoginAdmin.vue")
    }
];

const createRouter = () =>
    new VueRouter({
        mode: "history",
        routes: routes
    });


const router = createRouter()

//写一个重置路由的方法，切换用户后，或者退出时清除动态加载的路由
export function resetRouter() {
    const newRouter = createRouter()
    // 新路由实例matcer，赋值给旧路由实例的matcher，（相当于replaceRouter）
    router.matcher = newRouter.matcher
}


//加载进度条配置
NProgress.configure({
    easing: "ease", // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: true, // 是否显示右上角螺旋加载提示，是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
});

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    //开启加载进度条
    NProgress.start();

    if (to.path === "/login") {
        next();
    } else if (!store.state.userId) {
        next({path: "/login"});
    } else {
        if (!store.state.userMenuList) {
            initMenu()
        }
        next();
    }
});

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach(() => {
    //关闭加载进度条
    NProgress.done();
});


export default router;
