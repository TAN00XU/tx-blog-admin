<template>
  <el-card class="main-card">
    <!-- 标题 -->
    <div class="title">{{ this.$route.name }}</div>
    <div class="operation-container">
      <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="openModel(null)"
      >
        新增模块
      </el-button>
      <!-- 数据筛选 -->
      <div style="margin-left:auto">
        <el-input
            v-model="keywords"
            prefix-icon="el-icon-search"
            size="small"
            placeholder="请输入资源名"
            style="width:200px"
            @keyup.enter.native="listResources"
        />
        <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            style="margin-left:1rem"
            @click="listResources"
        >
          搜索
        </el-button>
      </div>
    </div>
    <!-- api资源权限列表 -->
    <el-table
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
        :data="resourceList"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        border
    >
      <el-table-column prop="resourceName" label="资源名" width="220"/>

      <el-table-column prop="url" label="资源路径" width="260"/>

      <el-table-column prop="requetMethod" label="请求方式" align="center">
        <template slot-scope="scope" v-if="scope.row.requestMethod">
          <el-tag hit size="small" :type="tagType(scope.row.requestMethod)">
            {{ scope.row.requestMethod }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="isAnonymous" label="匿名访问" align="center">
        <template slot-scope="scope">
          <el-switch
              v-if="scope.row.url"
              v-model="scope.row.isAnonymous"
              active-color="#13ce66"
              inactive-color="#AFA8BA"
              :active-value="1"
              :inactive-value="0"
              @change="changeAnonymouse(scope.row)"
          />
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" width="240" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right:5px"/>
          {{ scope.row.createTime | dateTime }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button
              type="text"
              size="mini"
              @click="openAddResourceModel(scope.row)"
              v-if="scope.row.children"
              style="color: #13ce66"
          >
            <i class="el-icon-plus"/> 新增
          </el-button>

          <el-button
              type="text"
              size="mini"
              @click="openEditResourceModel(scope.row)"
          >
            <i class="el-icon-edit"/> 修改
          </el-button>

          <el-popconfirm
              title="确定删除吗？"
              style="margin-left:10px"
              @confirm="deleteResource(scope.row.id)"
          >
            <el-button
                size="mini"
                type="text"
                slot="reference"
                style="color: #D23E61"
            >
              <i class="el-icon-delete"/> 删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增模块对话框 -->
    <el-dialog :visible.sync="addModule" width="30%">
      <div class="dialog-title-container" slot="title" ref="moduleTitle"/>
      <el-form label-width="80px" size="medium" :model="resourceForm">
        <el-form-item label="模块名">
          <el-input v-model="resourceForm.resourceName" style="width:220px"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addModule = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditResource">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 新增api对话框 -->
    <el-dialog :visible.sync="addResource" width="30%">
      <div class="dialog-title-container" slot="title" ref="resourceTitle"/>
      <el-form label-width="80px" size="medium" :model="resourceForm">
        <el-form-item label="资源名">
          <el-input v-model="resourceForm.resourceName" style="width:220px"/>
        </el-form-item>
        <el-form-item label="资源路径">
          <el-input v-model="resourceForm.url" style="width:220px"/>
        </el-form-item>
        <el-form-item label="请求方式">
          <el-radio-group v-model="resourceForm.requestMethod">
            <el-radio :label="'GET'">GET</el-radio>
            <el-radio :label="'POST'">POST</el-radio>
            <el-radio :label="'PUT'">PUT</el-radio>
            <el-radio :label="'DELETE'">DELETE</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addResource = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditResource">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>/**
 * api资源管理
 */
import {deleteResourceById, listResource, saveOrUpdateResource} from "@/api/authorityManagement/api";

/**
 * 接口管理
 */
export default {
  name: 'ApiResource',
  created() {
    this.listResources();
  },
  data() {
    return {
      loading: true,
      // 关键字
      keywords: "",
      // 资源列表
      resourceList: [],
      // 新增模块对话框
      addModule: false,
      // 新增api对话框
      addResource: false,
      // 添加与修改资源表单
      resourceForm: {}
    };
  },
  methods: {
    // 获取资源列表
    listResources() {
      // 开始加载
      this.loading = true;
      listResource(this.keywords)
          .then(({data}) => {
            this.resourceList = data.data;
            // 结束加载
            this.loading = false;
          });
    },
    /**
     * 改变匿名访问
     * @param resource
     */
    changeAnonymouse(resource) {
      saveOrUpdateResource(resource)
          .then(({data}) => {
            if (data.status) {
              this.$notify.success({
                title: "成功",
                message: data.message
              });
              this.listResources();
            } else {
              this.$notify.error({
                title: "失败",
                message: data.message
              });
              //接口调用失败，状态不变
              setTimeout(function () {
                resource.isAnonymous = resource.isAnonymous === 0 ? 1 : 0;
              }, 500)

            }
          });
    },
    openModel(resource) {
      if (resource != null) {
        this.resourceForm = JSON.parse(JSON.stringify(resource));
        this.$refs.moduleTitle.innerHTML = "修改模块";
      } else {
        this.resourceForm = {};
        this.$refs.moduleTitle.innerHTML = "添加模块";
      }
      this.addModule = true;
    },
    // 打开编辑和修改资源对话框
    openEditResourceModel(resource) {
      if (resource.url == null) {
        this.openModel(resource);
        return false;
      }
      this.resourceForm = JSON.parse(JSON.stringify(resource));
      this.$refs.resourceTitle.innerHTML = "修改资源";
      this.addResource = true;
    },
    // 打开添加资源对话框
    openAddResourceModel(resource) {
      this.resourceForm = {};
      this.resourceForm.parentId = resource.id;
      this.$refs.resourceTitle.innerHTML = "添加资源";
      this.addResource = true;
    },
    // 删除资源
    deleteResource(id) {
      deleteResourceById(id)
          .then(({data}) => {
            if (data.status) {
              this.$notify.success({
                title: "成功",
                message: data.message
              });
              this.listResources();
            } else {
              this.$notify.error({
                title: "失败",
                message: data.message
              });
            }
          });
    },
    // 添加或编辑资源
    addOrEditResource() {
      if (this.resourceForm.resourceName.trim() === "") {
        this.$message.error("资源名不能为空");
        return false;
      }
      saveOrUpdateResource(this.resourceForm)
          .then(({data}) => {
            if (data.status) {
              this.$notify.success({
                title: "成功",
                message: data.message
              });
              // 刷新
              this.listResources();
            } else {
              this.$notify.error({
                title: "失败",
                message: data.message
              });
            }
            this.addModule = false;
            this.addResource = false;
          });
    }
  },
  computed: {
    tagType() {
      return function (type) {
        switch (type) {
          case "GET":
            return "";
          case "POST":
            return "success";
          case "PUT":
            return "warning";
          case "DELETE":
            return "danger";
        }
      };
    }
  }
};
</script>
