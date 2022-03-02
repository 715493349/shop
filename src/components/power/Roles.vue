<template>
  <div>
    <!--面包屑导航区区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <!--添加角色按钮区域-->
      <el-row>
        <el-col>
          <el-button type="primary" plain>添加角色</el-button>
        </el-col>
      </el-row>
      <!--角色列表区域-->
      <el-table :data="rolelist" border stripe>
        <!--设置一个type="expand"就是是一个展开列-->
        <el-table-column type="expand">
          <!--利用作用域插槽-->
          <template slot-scope="scope">
            <!--栅格系统布局组件,总的24列   若索引i1为0，就加一个上边框，不为零就不加-->
            <el-row
              :class="['dbbottom', i1 === 0 ? 'dbtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!--渲染一级权限-->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--渲染二级三级权限-->
              <el-col :span="19">
                <!--通过for循环嵌套渲染二级权限-->
                <el-row
                  :class="[i2 === 0 ? '' : 'dbtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <!--渲染二级权限-->
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      >{{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--渲染三级权限    closable是关闭标签-->
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                      >{{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!--索引列-->
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column label="角色列表" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column
          label="操作"
          prop="roleDesc"
          width="300px"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              plain
              @click="redact(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              plain
              @click="del(scope.row.id)"
              >删除</el-button
            >
            <!--scope.row当前的角色-->
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              plain
              @click="showSetRightDialog(scope.row)"
              >分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--分配权限的对话框-->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClose"
    >
      <!--树形控件-->
      <!--node-key="id"每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
          default-expand-all是否默认展开所有节点
          default-expanded-keys默认展开的节点的 key 的数组-->
      <el-tree
        :data="rightslist"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-expanded-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有角色列表数据
      rolelist: [],
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      // 所有权限数据为空
      rightslist: [],
      // 树形绑定对象
      treeProps: {
        label: "authName",
        children: "children",
      },
      // 默认险种的节点id值数组
      defKeys: [],
      // 当前即将分配权限的id
      roleId: "",
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    // 获取所有角色的列表
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败!");
      }
      // 没有失败将获取的列表数据保存到rolelist中
      this.rolelist = res.data;
      // console.log(this.rolelist);
    },
    // 按 ID 删除对应的权限
    async removeRightById(role, rightId) {
      //  弹窗提醒用户是否要删除 用户catch捕捉用户取消的行为
      const confirmResult = await this.$confirm(
        "此操作将永久删除该标签, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("取消了删除");
      }
      // 删除角色权限的数据请求  delete请求用反引号，表示字符串
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error("删除权限失败!");
      }
      // 若刷新成功率，就要刷新列表,但是会发生页面的反转
      // this.getRolesList()
      role.children = res.data;
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role) {
      // console.log(role);
      this.roleId = role.id;
      // 在setRightDialogVisible变成之前，获取到所有的权限数据
      const { data: res } = await this.$http.get("rights/tree");
      if (res.meta.status !== 200) {
        return this.message.error("获取权限失败!");
      }
      // 获取到的权限数据保存到data中
      this.rightslist = res.data;
      // console.log(this.rightslist);
      // 递归获取三级节点的id
      this.getLeafKeys(role, this.defKeys);

      this.setRightDialogVisible = true;
    },
    // 通过递归的形式，获取角色下所有的三级权限的id，并保存到dafKeys数组中
    // 设置一个节点（形参）判断是不是三级节点和一个数组保存
    getLeafKeys(node, arr) {
      // 如果node节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id);
      }
      // 调用递归：循环node中的所有数组
      node.children.forEach((item) => this.getLeafKeys(item, arr));
      // 然后调用函数在上面showSetRightDialog展示分配权限的对话框区域
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClose() {
      this.defKeys = [];
    },
    // 点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      // console.log(keys);
      const idStr = keys.join(",");
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      );
      if (res.meta.status !== 200) {
        return this.message.error("分配权限失败!");
      }
      this.$message.success("分配权限成功!");
      this.getRolesList();
      // 隐藏对话框
      this.setRightDialogVisible = false;
    },
    // 编辑按钮回调
    redact(id) {},
    // 删除角色回调事件
    async del(id) {
      // console.log(id);
      let confirmResult = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已经取消删除！");
      }
      // 发删除请求
      let { data: res } = await this.$http.delete("roles/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除角色失败！");
      }
      this.$message.success("删除用户成功！");
      this.getRolesList();
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin: 6px;
}

.dbtop {
  border-top: 1px solid #eee;
}

.dbbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
