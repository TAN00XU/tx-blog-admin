<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <SideBar/>
    </el-aside>
    <el-container :class="'main-container ' + isHide">
      <!-- 导航栏 -->
      <el-header height="84px">
        <NavBar :key="$route.fullPath"/>
      </el-header>
      <!-- 内容 -->
      <el-main style="background:#F7F9FB">
        <div class="fade-transform-box">
          <transition name="fade-transform" appear mode="out-in">
            <router-view :key="$route.fullPath"/>
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  components: {
    NavBar,
    SideBar
  },
  computed: {
    isHide() {
      return this.$store.state.collapse ? "hideSideBar" : "";
    }
  }
};
</script>

<style scoped>

.main-container {
  transition: margin-left 0.45s;
  margin-left: 210px;
  min-height: 100vh;
}

.el-header {
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #d8dce0;
}

.hideSideBar {
  margin-left: 64px;
}

.fade-transform-box {
  position: relative;
  top: 0px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}

/*进入和离开时激活*/
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s ease 0s;
}

/*进入的起点*/
.fade-transform-enter {
  opacity: 0.8;
  /*transform: translateX(-30px);*/
  transform: translateX(-60%);
}

/*进入的终点、离开的起点*/
.fade-transform-enter-to,
.fade-transform-leave {
  transform: translateX(5%);
}

/*离开的终点*/
.fade-transform-leave-to {
  opacity: 0.8;
  /*transform: translateX(30px);*/
  transform: translateX(60%);
}


</style>
