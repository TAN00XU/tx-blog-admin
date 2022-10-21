<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {generaMenu} from "@/utils/menu";

export default {
  name: 'App',
  components: {},
  created() {
    // 刷新页面查询用户菜单
    if (this.$store.state.userId != null) {
      generaMenu();
    }
  }
}
</script>
