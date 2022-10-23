<template>
  <CategoryTagTable
      :title-name="titleName"
      :search-name="searchName"
      :listTableData="listCategories"
      :table-data="tableData"
      :table-column="tableColumn"
      :delete-by-id="deleteCategoryById"
      :count="count"
      :loading="loading"
      :add-or-edit-title="addOrEditTitle"
      @addOrEditItem="addOrEditCategory"
  />
</template>

<script>
import CategoryTagTable from "@/components/ArticleManagement/CategoryTagTable";
import {addOrEditCategory, deleteCategory, listCategories} from "@/api/ArticleManagement/categoryArticle.js";

/**
 * 分类管理
 */
export default {
  name: "CategoryArticle",
  components: {
    CategoryTagTable
  },
  data() {
    return {
      titleName: "分类管理",
      searchName: "分类名",
      // 加载
      loading: true,
      // 表数据
      tableData: [],
      // 表列
      tableColumn: [
        {
          prop: 'categoryName',
          label: '分类名'
        }, {
          prop: 'articleCount',
          label: '文章量'
        }
      ],
      // 总数
      count: 0,
      addOrEditTitle: {
        add: "添加分类",
        edit: "编辑分类"
      }
    }
  },
  methods: {
    /**
     * 按 ID 删除分类
     * @param categoryIdList 分类id列表
     * @param requestParams 请求参数
     */
    deleteCategoryById(categoryIdList, requestParams) {
      deleteCategory(categoryIdList)
          .then(({data}) => {
            if (data.status) {
              this.$notify.success({
                type: 'success',
                title: "成功",
                message: data.message
              });
              // 刷新数据
              this.listCategories(requestParams);
            } else {
              this.$notify.error({
                type: 'error',
                title: "失败",
                message: data.message
              });
            }
          });
    },
    /**
     * 获取分类列表
     * @param requestParams
     */
    listCategories(requestParams) {
      // 开始加载
      this.loading = true;
      listCategories(requestParams)
          .then(({data}) => {
            this.tableData = data.data.recordList;
            this.count = data.data.count;
            this.loading = false;
          });
    },

    /**
     * 添加或编辑分类表单
     * @param categoryForm 分类表单
     * @param requestParams 请求参数
     */
    addOrEditCategory(categoryForm, requestParams) {
      console.log(categoryForm, requestParams)
      addOrEditCategory(categoryForm)
          .then(({data}) => {
            if (data.status) {
              this.$notify.success({
                type: 'success',
                title: "成功",
                message: data.message
              });
              // 刷新数据
              this.listCategories(requestParams);
            } else {
              this.$notify.error({
                type: 'error',
                title: "失败",
                message: data.message
              });
            }

          });
    }
  }

}
</script>
