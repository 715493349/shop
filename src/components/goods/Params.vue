<template>
  <div>
    <!--面包屑导航区区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片视图区-->
    <el-card>
      <!--    警告区域-->
      <el-alert
          title="注意，只允许为第三级分类设置相关参数！"
          type="warning"
          :closable="false"
          show-icon>
      </el-alert>
      <!--选择商品分类区域-->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类:</span>
          <!--选择商品分类的级联选择框-->
          <el-cascader
              expand-trigger="hover"
              v-model="selectedCatekeys"
              :options="catelist"
              :props="cateProps"
              @change="handleChange">
          </el-cascader>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      // 定义一个数据保存请求成功的数据
      // 商品分类列表
      catelist:[],
      // 级联选择框的配置对象
      cateProps:{
        // 指定选中的值
        value:'cat_id',
        // 指定看到的值
        lable:'cat_name',
        // 父子节点的嵌套属性
        children:'children'
      },
      // 级联选择框双向绑定到的数组
      selectedCatekeys:[]
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取所有的商品分类列表
    async getCateList() {
      const {data: res} = await this.$http.get('categories')
      if(res.meta.status !== 200){
        return this.$message.error('获取商品分类失败！')
      }
      // 商品列表没有失败，把数据赋值到data中（找到data）,然后this直接赋值
      this.catelist = res.data
      console.log(this.catelist)
    },
    // 级联选择框中变化，会触发这个函数
    handleChange(){
      console.log(this.selectedCatekeys)
    }
  }
}
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
