<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {initMenu} from "@/utils/menu";

export default {
  name: 'App',
  components: {},
  created() {
    // 刷新页面查询用户菜单
    console.log(this.$store.state.userId)
    console.log(this.$store.state.userMenuList)
    // if (this.$store.state.userId) {
    //   console.log("查询")
    //   initMenu();
    // }
    // 刷新页面查询用户菜单
    if (this.$store.state.userId != null) {
      console.log("查询")
      initMenu();
    }
  }
}
</script>
