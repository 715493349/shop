<template>
  <div>
    <!--1.面包屑导航区区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    
    <!-- 2.18.卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
            <!-- 20. -->
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 10.tabel表格区域 -->
      <!-- 11.利用data指定数据源 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <!-- 12.prop指定商品属性，文档用goods_name指定 -->
        <el-table-column
          label="商品名称"
          prop="goods_name"
          header-align="center"
        ></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="商品重量"
          prop="goods_weight"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="add_time"
          width="150px"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeById(scope.row.goods_id)"
            >
              </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 13.分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 210, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        //   query查询参数  pagenum当前页码   pagesize每页显示条数
        query: "",
        pagenum: 1,
        pagesize: 8,
      },
      //   6.商品列表数据
      goodslist: [],
      //   7.总数据条数
      total: 0,
    };
  },
  created() {
    //   3.创建一个数据请求
    this.getGoodsList();
  },
  methods: {
    //   4.根据分页获取对应的商品列表
    async getGoodsList() {
      // 5.请求的数据需要提供参数
      const { data: res } = await this.$http.get("goods", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品列表失败！");
      }
      this.$message.success("获取商品列表成功！");
      console.log(res.data);
      // 8.把获取的数据赋值给goodslist,goodslist在data定义，且接收请到的数据
      this.goodslist = res.data.goods;
      // 9.把请求的数据放到data定义的total中接收
      this.total = res.data.total;
    },
    // 14.
    handleSizeChange(newSize) {
      // 15.拿到newSize就保存到queryInfo.argparse中
      this.queryInfo.argparse = newSize;
      // 重新获取列表数据
      this.getGoodsList();
    },
    // 16.页码
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      // 17.重新获取列表数据
      this.getGoodsList();
    },
    // 19.删除按钮事件
    async removeById(id) {
      const confirmResult = await this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(err => err)
      if(confirmResult !== 'confirm'){
          return this.$message.info('已取消删除！')
      }
      const {data:res} = await this.$http.delete(`goods/${id}`)
      if(res.meta.status !== 200){
          return this.$message.error('删除失败！')
      }
      this.$message.success('删除成功！')
    //   刷新列表
      this.getGoodsList()
    },
    // 21.调用这个函数，通过路由导航跳转指定页面
    goAddpage(){
        this.$router.push('/goods/add')
    }
  },
};
</script>

<style lang="less" scoped>
</style>