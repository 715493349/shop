<!--商品分类列表-->
<template>
  <div>
    <!--面包屑导航区区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCatedialog">添加分类</el-button>
        </el-col>
      </el-row>

      <!--表格-->
      <!--data属性是数据源-->
      <tree-table class="treeTable"
                  :data="catelist"
                  :columns="columns"
                  :selection-type="false"
                  :expand-type="false"
                  show-index
                  index-text="#"
                  border
                  :show-row-hover="false">
        <!--是否有效-->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen"></i>
          <i class="el-icon-error" v-else style="color: #ef3535"></i>
        </template>

        <!--排序-->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>

        <!--操作-->
        <template slot="opt">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <!--分页区域-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="querInfo.pagenum"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="querInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>

    <!--添加分类的对话框-->
    <el-dialog
        title="添加分类"
        :visible.sync="addCateDialogVisible"
        width="50%" @close="addCateDialogClose">
      <!--添加分类的表单-->
      <el-form :model="addCateFrom"
               :rules="addCateFromRules"
               ref="addCateFromRef"
               label-width="100px">
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateFrom.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <!--options：指定数据源   clearable:清空选项框内容-->
          <el-cascader
              v-model="selectedKeys"
              :options="parentCateList"
              :props="cascaderProps"
              @change="parentCateChange" clearable>

          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addCateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 指定查询条件
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类的数据列表，默认为空
      catelist: [],
      // 总数据条数
      total: 0,
      // 为table指定列的定义 里面的都是列的对象
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 表示将当前列定义为模板
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'isok'
        },
        {
          label: '排序',
          // 表示将当前列定义为模板
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'order'
        },
        {
          label: '操作',
          // 表示将当前列定义为模板
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'opt'
        }
      ],
      // 控制添加分类的对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateFrom: {
        // 将要添加分类的名称
        cat_name: '',
        // 父级分类的id
        cat_pid: 0,
        // 分类的等级，默认要添加的是1级分类
        cat_leve: 0
      },
      // 添加分类的验证表单的规则
      addCateFromRules: {
        cat_name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'}
        ]
      },
      // 父级分类列表
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 选中的父级分类的id数组
      selectedKeys: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const {data: res} = await this.$http.get('categories', {params: this.querInfo})
      // 判断请求是否成功
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品失败!')
      }
      console.log(res.data);
      // 把数值列表，赋值给catelist
      this.catelist = res.data.result
      this.total = res.data.total
    },
    // 监听pagesize改变
    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听pagenum改变
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage
      this.getCateList()
    },
    // 点击按钮，展示添加分类的对话框
    showAddCatedialog() {
      // 先获取父级分类的数据列表
      this.getParentCateList()
      // 再展示对话框
      this.addCateDialogVisible = true
    },
    // 获取父级分类的数据列表
    async getParentCateList() {
      const {data: res} = await this.$http.get('categories',
          {
            params: {type: 2}
          })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类数据失败!')
      }
      // console.log(res.data);
      this.parentCateList = res.data
    },
    // 选择项发生变化触发这个函数
    parentCateChange() {
      console.log(this.selectedKeys);
      // 若selectedKeys数组中length大于0，证明选中的父级分类，反之说明没有选中任何父类分级
      if (this.selectedKeys.length > 0) {
        // 父级分类的id
        this.addCateFrom.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 为当前分类的等级赋值
        this.addCateFrom.cat_leve = this.selectedKeys.length
        // return
      } else {
        this.addCateFrom.cat_pid = 0
        this.addCateFrom.cat_leve = 0
      }
    },
    // 点击按钮，添加新的分类
    addCate() {
      // console.log(this.addCateFrom);
      this.$refs.addCateFromRef.validate(async value => {
        if (!value) return
        const {data:res} = await this.$http.post('categories',this.addCateFrom)
        if (res.meta.status !== 201){
          return this.$message.error('添加分类失败!')
        }
        this.$message.success('添加分类成功!')
        // 刷新数据列表
        await this.getCateList()
        // 隐藏添加的对话框
        this.addCateDialogVisible = false
      })
    },
    // 监听对话框的关闭事件,重置表单数据
    addCateDialogClose() {
      this.$refs.addCateFromRef.resetFields()
      this.selectedKeys = []
      this.addCateFrom.cat_leve = 0
      this.addCateFrom.cat_pid = 0
    }
  }
}
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
</style>
