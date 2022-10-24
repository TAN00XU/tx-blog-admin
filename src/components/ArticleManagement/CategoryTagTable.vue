<template>
  <el-card class="main-card">
    <div class="title">{{ titleName }}</div>
    <!-- 表格操作 -->
    <div class="operation-container">
      <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="openModel(null)"
      >
        新增
      </el-button>
      <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          :disabled="this.deleteBatchesByIdList.length === 0"
          @click="isDelete = true"
      >
        批量删除
      </el-button>
      <div style="margin-left:auto">
        <el-input
            v-model="requestParams.keywords"
            prefix-icon="el-icon-search"
            size="small"
            :placeholder='`请输入${searchName}`'
            style="width:200px"
            @keyup.enter.native="search"
        />
        <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            style="margin-left:1rem"
            @click="search"
        >
          搜索
        </el-button>
      </div>
    </div>
    <!-- 表格展示 -->
    <el-table
        border
        stripe
        :data="tableData"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- 选择列 -->
      <el-table-column type="selection" width="55"/>
      <!-- 名 -->
      <el-table-column :prop="tableColumn[0].prop" :label="tableColumn[0].label" align="center"/>
      <!-- 文章量 -->
      <el-table-column :prop="tableColumn[1].prop" :label="tableColumn[1].label" align="center" sortable/>
      <!-- 创建时间 -->
      <el-table-column prop="createTime" label="创建时间" align="center" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right:5px"/>
          {{ scope.row.createTime | dateTime }}
          <!--          {{ (scope.row[tableColumn[2].prop]) | date }}-->
        </template>
      </el-table-column>
      <!-- 列操作 -->
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="openModel(scope.row)">
            编辑
          </el-button>
          <el-popconfirm
              title="确定删除吗？"
              icon="el-icon-info"
              icon-color="red"
              style="margin-left:1rem"
              @confirm="deleteItemById(scope.row.id)"
          >
            <el-button size="mini" type="danger" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
        class="pagination-container"
        background
        :page-sizes="[5,10, 20]"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="requestParams.current"
        :page-size="requestParams.size"
        :total="count"
        layout="total, sizes, prev, pager, next, jumper"
    />
    <!-- 批量删除对话框 -->
    <el-dialog :visible.sync="isDelete" width="30%">
      <div class="dialog-title-container" slot="title">
        <i class="el-icon-warning" style="color:#ff9900"/>提示
      </div>
      <div style="font-size:1rem">是否删除选中项？</div>
      <div slot="footer">
        <el-button @click="isDelete=false">取 消</el-button>
        <el-button type="primary" @click="deleteItemById(null)">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 添加编辑对话框 -->
    <el-dialog :visible.sync="addOrEdit" width="30%">
      <div class="dialog-title-container" slot="title" ref="addOrEditTitle"/>
      <el-form label-width="80px" size="medium" :model="itemForm">
        <el-form-item :label="searchName">
          <el-input v-model="itemForm.name" style="width:auto"/>
        </el-form-item>

      </el-form>
      <div slot="footer">
        <el-button @click="addOrEdit = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditForm">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </el-card>

</template>

<script>

/**
 * 分类和标签表格
 */
export default {
  name: "CategoryTagTable",
  props: {
    // 标题名
    titleName: {
      type: String,
      default: "标题"
    },
    // 搜索框的名字
    searchName: {
      type: String,
      required: true
    },
    // 获取表数据
    listTableData: {
      type: Function,
      required: true
    },
    // 表数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 表列
    tableColumn: {
      // type: Object,
      // default: () => ({})
      type: Array,
      default: () => []
    },
    // 按 ID 删除项目
    deleteById: {
      type: Function,
      required: true
    },
    // 总条数
    count: {
      type: Number,
      default: 0
    },
    // 加载
    loading: {
      type: Boolean,
      default: true
    },
    // 添加和编辑的标题
    addOrEditTitle: {
      type: Object,
      default: () => ({})
    }

  },
  created() {
    //初始化数据
    this.listTableData(this.requestParams)
  },
  data() {
    return {
      // 是否删除选中项
      isDelete: false,
      // 通过id列表批量删除
      deleteBatchesByIdList: [],
      // 添加或编辑的提交表单
      itemForm: {
        id: null,
        name: ""
      },
      // 添加或编辑
      addOrEdit: false,
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
     * 处理选择更改
     * @param val
     */
    handleSelectionChange(val) {
      this.deleteBatchesByIdList = [];
      val.forEach(item => {
        this.deleteBatchesByIdList.push(item.id)
      });
    },
    /**
     * 按 ID 删除项目
     * @param id
     */
    deleteItemById(id) {
      let idList = [];
      if (id == null) {
        idList = this.deleteBatchesByIdList;
      } else {
        idList = [id];
      }
      this.deleteById(idList, this.requestParams)
      // 关闭删除对话框
      this.isDelete = false;
    },

    /**
     * 打开 添加或编辑 模块
     * @param item
     */
    openModel(item) {
      if (item != null) {
        let _item = JSON.parse(JSON.stringify(item))
        this.itemForm.id = _item.id;
        this.itemForm.name = _item[this.tableColumn[0].prop];
        this.$refs.addOrEditTitle.innerHTML = this.addOrEditTitle.edit;
      } else {
        this.itemForm.id = null;
        this.itemForm.name = "";
        this.$refs.addOrEditTitle.innerHTML = this.addOrEditTitle.add;
      }
      this.addOrEdit = true;
    },
    /**
     * 添加或编辑表单
     * @returns {boolean}
     */
    addOrEditForm() {
      if (this.itemForm.name.trim() === "") {
        this.$message.error(this.searchName + "不能为空");
        return false;
      }
      this.$emit("addOrEditItem", this.itemForm, this.requestParams)
      // 关闭表单
      this.addOrEdit = false;
    },
    // 改变每页条数
    sizeChange(size) {
      this.requestParams.size = size;
      this.listTableData(this.requestParams)
    },
    // 改变当前页
    currentChange(current) {
      this.requestParams.current = current;
      this.listTableData(this.requestParams)
    },
    // 搜索
    search() {
      this.requestParams.current = 1;
      this.listTableData(this.requestParams)
    },
  }
}
</script>

<style scoped>

</style>