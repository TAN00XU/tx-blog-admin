<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {initMenu} from "@/utils/menu";

export default {
  name: 'App',
  created() {
    // 刷新页面查询用户菜单
    if (this.$store.state.userId) {
      initMenu();
    }
    // 上传访客信息
    this.axios.post("/api/report")
  }
}
</script>
