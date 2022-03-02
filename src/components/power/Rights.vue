<!--
 * @Author: luoheng
 * @Date: 2022-01-14 23:13:40
 * @LastEditTime: 2022-03-02 00:22:01
 * @LastEditors: luoheng
 * @Description: 
 * God help those who help themselves
-->
<template>
  <div>
    <!--面包屑导航区区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <!-- :data="rightsList"监听数据源   border加上边框线  stripe隔行变色-->
      <el-table :data="rightsList" border stripe>
        <!--提供一个索引联-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <!--自定义插槽作用域来定义输出输出格式 scope接收所有的数据-->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0' ">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 权限列表
      rightsList: []
    }
  },
  // 在created生命周期函数时发送求请
  created() {
    // 获取所有的权限
    this.getRightsList()
  },
  methods: {
    // 生命周期函数请求的数据名要在methods定义
    // 获取权限列表
    async getRightsList() {
      const {data: res} = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败!')
      }
      this.rightsList = res.data
      // console.log(this.rightsList);
    }
  }
}
</script>

<style scoped>

</style>
