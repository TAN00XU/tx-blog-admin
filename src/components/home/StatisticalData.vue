<template>
  <!-- 统计数据 -->
  <el-row :gutter="30">
    <el-col :span="6">
      <el-card>
        <div class="card-icon-container">
          <i class="iconfont el-icon-myfangwenliang" style="color:#40C9C6"/>
        </div>
        <div class="card-desc">
          <div class="card-title">访问量</div>
          <div class="card-count">{{ viewsCount }}</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <div class="card-icon-container">
          <i class="iconfont el-icon-myuser" style="color:#34BFA3"/>
        </div>
        <div class="card-desc">
          <div class="card-title">用户量</div>
          <div class="card-count">{{ userCount }}</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <div class="card-icon-container">
          <i class="iconfont el-icon-mywenzhang-copy" style="color:#F4516C"/>
        </div>
        <div class="card-desc">
          <div class="card-title">文章量</div>
          <div class="card-count">{{ articleCount }}</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <div class="card-icon-container">
          <i class="el-icon-s-comment" style="color:#36A3F7"/>
        </div>
        <div class="card-desc">
          <div class="card-title">留言量</div>
          <div class="card-count">{{ messageCount }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

/**
 * 统计数据
 */
export default {
  name: "StatisticalData",
  // props: ['viewsCount', 'userCount', 'articleCount', 'messageCount'],
  props: {
    viewsCount: {
      default: 999
    },
    userCount: {
      default: 999
    },
    articleCount: {
      default: 999
    },
    messageCount: {
      default: 999
    },

  },
  data() {
    return {
      // // 访问量
      // viewsCount: 999,
      // // 用户量
      // userCount: 999,
      // // 文章量
      // articleCount: 999,
      // // 留言量
      // messageCount: 999,
    }
  }
}
</script>

<style scoped>
.card-icon-container {
  display: inline-block;
  font-size: 3rem;
}

.card-desc {
  font-weight: bold;
  float: right;
}

.card-title {
  margin-top: 0.3rem;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 1rem;
}

.card-count {
  margin-top: 0.75rem;
  color: #666;
  font-size: 1.25rem;
}

</style>