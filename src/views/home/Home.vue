<template>
  <div>
    <StatisticalData
        :views-count="viewsCount"
        :user-count="userCount"
        :article-count="articleCount"
        :message-count="messageCount"
    />

  </div>
</template>

<script>
import {getData} from "@/api/home";
import StatisticalData from "@/components/home/StatisticalData";

/**
 * 首页
 */
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    StatisticalData
  },
  created() {
    this.getData();
  },
  data() {
    return {
      // 访问量
      viewsCount: 999,
      // 用户量
      userCount: 999,
      // 文章量
      articleCount: 999,
      // 留言量
      messageCount: 999,
    }
  },
  methods: {
    getData() {
      getData().then(({data}) => {
        this.viewsCount = data.data.viewsCount;
        this.messageCount = data.data.messageCount;
        this.userCount = data.data.userCount;
        this.articleCount = data.data.articleCount;
        this.articleStatisticsList = data.data.articleStatisticsList;
        if (data.data.uniqueViewDTOList != null) {
          data.data.uniqueViewDTOList.forEach(item => {
            this.viewCount.xAxis.data.push(item.day);
            this.viewCount.series[0].data.push(item.viewsCount);
          });
        }

        if (data.data.categoryDTOList != null) {
          data.data.categoryDTOList.forEach(item => {
            this.category.series[0].data.push({
              value: item.articleCount,
              name: item.categoryName
            });
            this.category.legend.data.push(item.categoryName);
          });
        }

        if (data.data.articleRankDTOList != null) {
          data.data.articleRankDTOList.forEach(item => {
            this.ariticleRank.series[0].data.push(item.viewsCount);
            this.ariticleRank.xAxis.data.push(item.articleTitle);
          });
        }

        if (data.data.tagDTOList != null) {
          data.data.tagDTOList.forEach(item => {
            this.tagDTOList.push({
              id: item.id,
              name: item.tagName
            });
          });
        }

        this.loading = false;
      });

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
