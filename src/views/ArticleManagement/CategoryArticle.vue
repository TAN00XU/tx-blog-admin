<template>
  <CategoryTagTable
      :title-name="titleName"
      :search-name="searchName"
      :init-table="listCategories"
      :table-data="tableData"
      :table-column="tableColumn"
      :delete-by-id="deleteById"
      :count="count"
      :loading="loading"
      :add-or-edit-title="addOrEditTitle"
      @addOrEditItem="addOrEditCategory"
  />
</template>

<script>
import CategoryTagTable from "@/components/ArticleManagement/CategoryTagTable";
import {addOrEditCategory, deleteCategory, listCategories} from "@/api/articleManagement";

/**
 * 文章分类
 */
export default {
  name: "CategoryArticle",
  components: {
    CategoryTagTable
  },
  created() {
    this.listCategories();
  },
  data() {
    return {
      titleName: "分类管理",
      searchName: "分类名",
      loading: false,
      tableData: [
        {
          id: 0,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      tableColumn: [
        {
          prop: 'name',
          label: '分类名'
        }, {
          prop: 'address',
          label: '文章量'
        }, {
          prop: 'date',
          label: '创建时间'
        }
      ],
      count: 0,
      addOrEditTitle: {
        add: "添加分类",
        edit: "添加分类"
      },
      //请求参数
      requestParams: {
        // 当前页
        current: 1,
        // 条数
        size: 10,
        // 关键字
        keywords: null
      }
    }
  },
  methods: {
    /**
     * 按 ID 删除分类
     * @param CategoryIdList
     */
    deleteById(CategoryIdList) {
      deleteCategory(CategoryIdList)
          .then(({data}) => {
            if (data.status) {
              this.$notify.success({
                type: 'success',
                title: "成功",
                message: data.message
              });
              // 重新加载列表
              this.listCategories();
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
     */
    listCategories() {
      listCategories(this.requestParams)
          .then(({data}) => {
            this.tableData = data.data.recordList;
            this.count = data.data.count;
            this.loading = false;
          });
    },

    /**
     * 添加或编辑分类表单
     * @param categoryForm
     */
    addOrEditCategory(categoryForm) {
      console.log(categoryForm)

      addOrEditCategory(categoryForm)
          .then(({data}) => {
            if (data.status) {
              this.$notify.success({
                type: 'success',
                title: "成功",
                message: data.message
              });
              this.listCategories();
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
