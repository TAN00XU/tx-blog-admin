<template>
  <CategoryTagTable
      :title-name="titleName"
      :search-name="searchName"
      :listTableData="listTags"
      :table-data="tableData"
      :table-column="tableColumn"
      :delete-by-id="deleteTagById"
      :count="count"
      :loading="loading"
      :add-or-edit-title="addOrEditTitle"
      @addOrEditItem="addOrEditTag"
  />
</template>

<script>
import CategoryTagTable from "@/components/ArticleManagement/CategoryTagTable";
import {addOrEditTag, deleteTag, listTags} from "@/api/articleManagement";

/**
 * 标签管理
 */
export default {
  name: "TagArticle",
  components: {
    CategoryTagTable
  },
  data() {
    return {
      titleName: "标签管理",
      searchName: "标签名",
      // 加载
      loading: true,
      // 表数据
      tableData: [],
      // 表列
      tableColumn: [
        {
          prop: 'tagName',
          label: '标签名'
        }, {
          prop: 'articleCount',
          label: '文章量'
        }
      ],
      // 总数
      count: 0,
      addOrEditTitle: {
        add: "添加标签",
        edit: "编辑标签"
      }
    }
  },
  methods: {
    /**
     * 按 ID 删除标签
     * @param tagIdList 标签id列表
     * @param requestParams 请求参数
     */
    deleteTagById(tagIdList, requestParams) {
      deleteTag(tagIdList)
          .then(({data}) => {
            if (data.status) {
              this.$notify.success({
                title: "成功",
                message: data.message
              });
              // 刷新数据
              this.listTags(requestParams);
            } else {
              this.$notify.error({
                title: "失败",
                message: data.message
              });
            }
          });
    },


    /**
     * 获取标签列表
     * @param requestParams
     */
    listTags(requestParams) {
      // 开始加载
      this.loading = true;
      listTags(requestParams)
          .then(({data}) => {
            this.tableData = data.data.recordList;
            this.count = data.data.count;
            // 获取到数据后关闭
            this.loading = false;
          });
    },

    /**
     * 添加或编辑标签表单
     * @param tagForm 标签表单
     * @param requestParams 请求参数
     */
    addOrEditTag(tagForm, requestParams) {
      addOrEditTag(tagForm)
          .then(({data}) => {
            if (data.status) {
              this.$notify.success({
                type: 'success',
                title: "成功",
                message: data.message
              });
              // 刷新数据
              this.listTags(requestParams);
            } else {
              this.$notify.error({
                type: 'error',
                title: "失败",
                message: data.message
              });
            }

          });
    },
  }
}
</script>

<style scoped>

</style>