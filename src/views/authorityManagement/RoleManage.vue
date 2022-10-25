<template>
  <el-card class="main-card">
    <div class="title">{{ this.$route.name }}</div>
    <!-- 表格操作 -->
    <div class="operation-container">
      <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="openMenuModel(null)"
      >
        新增
      </el-button>
      <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          :disabled="this.roleIdList.length === 0"
          @click="isDelete = true"
      >
        批量删除
      </el-button>
      <!-- 搜索 -->
      <div style="margin-left:auto">
        <el-input
            v-model="keywords"
            prefix-icon="el-icon-search"
            size="small"
            placeholder="请输入角色名"
            style="width:200px"
            @keyup.enter.native="searchRoles"
        />
        <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            style="margin-left:1rem"
            @click="searchRoles"
        >
          搜索
        </el-button>
      </div>
    </div>
    <!-- 表格展示 -->
    <el-table
        border
        :data="roleList"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
      <!-- 表格列 -->
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="roleName" label="角色名" align="center"/>
      <el-table-column prop="roleLabel" label="权限标签" align="center">
        <template slot-scope="scope">
          <el-tag hit>
            {{ scope.row.roleLabel }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isDisable" label="禁用" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.isDisable"
              active-color="#13ce66"
              inactive-color="#AFA8BA"
              :active-value="1"
              :inactive-value="0"
              @change="changeDisable(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间"
          width="200"
          align="center"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right:5px"/>
          {{ scope.row.createTime | dateTime }}
        </template>
      </el-table-column>
      <!-- 列操作 -->
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="openMenuModel(scope.row)">
            <i class="el-icon-edit"/> 菜单权限
          </el-button>
          <el-button
              type="text"
              size="mini"
              @click="openResourceModel(scope.row)"
          >
            <i class="el-icon-folder-checked"/> 资源权限
          </el-button>
          <el-popconfirm
              title="确定删除吗？"
              style="margin-left:10px"
              @confirm="deleteRoles(scope.row.id)"
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
    <!-- 分页 -->
    <el-pagination
        class="pagination-container"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="current"
        :page-size="size"
        :total="count"
        :page-sizes="[10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
    />
    <!-- 菜单权限对话框 -->
    <el-dialog :visible.sync="roleMenu" width="30%">
      <div class="dialog-title-container" slot="title" ref="roleTitle"/>
      <el-form label-width="80px" size="medium" :model="roleForm">
        <el-form-item label="角色名">
          <el-input v-model="roleForm.roleName" style="width:250px"/>
        </el-form-item>
        <el-form-item label="权限标签">
          <el-input v-model="roleForm.roleLabel" style="width:250px"/>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
              accordion
              :data="menuList"
              :default-checked-keys="roleForm.menuIdList"
              show-checkbox
              node-key="id"
              ref="menuTree"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="roleMenu = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateRoleMenu">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 资源权限对话框 -->
    <el-dialog :visible.sync="roleResource" width="30%" top="9vh">
      <div class="dialog-title-container" slot="title">修改角色和资源权限</div>
      <el-form label-width="80px" size="medium" :model="roleForm">
        <el-form-item label="角色名">
          <el-input v-model="roleForm.roleName" style="width:250px"/>
        </el-form-item>
        <el-form-item label="权限标签">
          <el-input v-model="roleForm.roleLabel" style="width:250px"/>
        </el-form-item>
        <el-form-item label="资源权限">
          <el-tree
              :data="resourceList"
              :default-checked-keys="roleForm.resourceIdList"
              show-checkbox
              node-key="id"
              ref="resourceTree"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="roleResource = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateRoleResource">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 批量删除对话框 -->
    <el-dialog :visible.sync="isDelete" width="30%">
      <div class="dialog-title-container" slot="title">
        <i class="el-icon-warning" style="color:#ff9900"/>提示
      </div>
      <div style="font-size:1rem">是否删除选中项？</div>
      <div slot="footer">
        <el-button @click="isDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteRoles(null)">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>

import {
  deleteRoles,
  listRole,
  listRoleMenu,
  listRoleResource,
  saveOrUpdateRoleMenu
} from "@/api/authorityManagement/roleManage";

/**
 * 角色管理
 */
export default {
  name: "RoleAuthority",
  created() {
    this.listRoles();
  },
  data: function () {
    return {
      loading: true,
      isDelete: false,
      roleList: [],
      roleIdList: [],
      keywords: null,
      current: 1,
      size: 10,
      count: 0,
      roleMenu: false,
      roleResource: false,
      // 资源列表
      resourceList: [],
      // 菜单列表
      menuList: [],
      roleForm: {
        // 角色名
        roleName: "",
        // 角色标签
        roleLabel: "",
        // 资源id列表
        resourceIdList: [],
        // 菜单id列表
        menuIdList: []
      }
    };
  },
  methods: {
    // 搜索
    searchRoles() {
      this.current = 1;
      this.listRoles();
    },
    // 条数
    sizeChange(size) {
      this.size = size;
      this.listRoles();
    },
    // 页数
    currentChange(current) {
      this.current = current;
      this.listRoles();
    },
    /**
     * 处理选择更改
     * @param val
     */
    handleSelectionChange(val) {
      this.roleIdList = [];
      val.forEach(item => {
        this.roleIdList.push(item.id)
      });
    },
    /**
     * 获取角色列表
     */
    listRoles() {
      listRole({
            params: {
              current: this.current,
              size: this.size,
              keywords: this.keywords
            }
          }
      )
          .then(
              ({data}) => {
                this.roleList = data.data.recordList;
                this.count = data.data.count;
                this.loading = false;
              });
      listRoleResource().then(({data}) => {
        this.resourceList = data.data;
      });
      listRoleMenu().then(({data}) => {
        this.menuList = data.data;
      });
    },
    /**
     * 打开菜单模块
     * @param role 角色信息
     */
    openMenuModel(role) {
      // 第一次加载会报错
      this.$nextTick(function () {
        this.$refs.menuTree.setCheckedKeys([]);
      });
      this.$refs.roleTitle.innerHTML = role ? "修改角色和菜单" : "新增角色";
      if (role != null) {
        this.roleForm = JSON.parse(JSON.stringify(role));
      } else {
        this.roleForm = {
          roleName: "",
          roleLabel: "",
          resourceIdList: [],
          menuIdList: []
        };
      }
      this.roleMenu = true;
    },
    // 打开资源模块
    openResourceModel(role) {
      // 第一次加载会报错
      this.$nextTick(function () {
        this.$refs.resourceTree.setCheckedKeys([]);
      });
      this.roleForm = JSON.parse(JSON.stringify(role));
      this.roleResource = true;
    },

    // 保存或更新角色菜单
    saveOrUpdateRoleMenu() {
      if (this.roleForm.roleName.trim() === "") {
        this.$message.error("角色名不能为空");
        return false;
      }
      if (this.roleForm.roleLabel.trim() === "") {
        this.$message.error("权限标签不能为空");
        return false;
      }
      this.roleForm.resourceIdList = null;
      this.roleForm.menuIdList = this.$refs.menuTree
          .getCheckedKeys()
          // 半选的父菜单
          .concat(this.$refs.menuTree.getHalfCheckedKeys());
      saveOrUpdateRoleMenu(this.roleForm)
          .then(({data}) => {
                if (data.status) {
                  this.$notify.success({
                    title: "成功",
                    message: data.message
                  });
                  // 刷新角色
                  this.listRoles();
                } else {
                  this.$notify.error({
                    title: "失败",
                    message: data.message
                  });
                }
                this.roleMenu = false;
              }
          );
    },
    // 保存或更新角色资源
    saveOrUpdateRoleResource() {
      this.roleForm.menuIdList = null;
      this.roleForm.resourceIdList = this.$refs.resourceTree.getCheckedKeys();
      saveOrUpdateRoleMenu(this.roleForm)
          .then(({data}) => {
            if (data.flag) {
              this.$notify.success({
                title: "status",
                message: data.message
              });
              // 刷新角色
              this.listRoles();
            } else {
              this.$notify.error({
                title: "失败",
                message: data.message
              });
            }
            this.roleResource = false;
          });
    },

    /**
     * 根据id删除角色
     * @param id
     */
    deleteRoles(id) {
      console.log("值", id)
      let param = {};
      if (id == null) {
        param = this.roleIdList;
      } else {
        param = [id];
      }
      console.log(param)
      deleteRoles(param)
          .then(({data}) => {
            if (data.status) {
              this.$notify.success({
                title: "成功",
                message: data.message
              });
              this.listRoles();
            } else {
              this.$notify.error({
                title: "失败",
                message: data.message
              });
            }
            this.isDelete = false;
          });
    },
  }
};
</script>
