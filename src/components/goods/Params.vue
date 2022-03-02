<template>
  <div>
    <!--1.面包屑导航区区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.卡片视图区域 -->
    <el-card>
      <!-- 3.警告区域 -->
      <el-alert
        title="注意：只允许第三级分类设置相关参数"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>

      <!-- 4.选择商品分类 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 7.商品分类的级联选择框   change绑定了选择项绑定事件-->
          <el-cascader
            expand-trigger="hover"
            v-model="selectedCateKeys"
            :options="catelist"
            :props="cateProps"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>

      <!-- 12.tab标签页 -->
      <el-tabs v-model="activeName" @tab-click="handTableClick">
          <!-- 13.添加动态参数面板 -->
        <el-tab-pane label="动态参数" name="many">
            <!-- 15.32.添加参数按钮     :disabled  CSS 伪类表示任何被禁用的元素-->
            <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加参数</el-button>
          <!-- 24.动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <!-- 26.展开行 -->
            <el-table-column type="expand">
              <!-- 通过作用域插槽接收数据 -->
              <template slot-scope="scope">
                <!-- 循环渲染Tag标签 -->
                <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable @close="handleClose(i,scope.row)">{{item}}</el-tag>
                <!-- 输入文本框 -->
                <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)">
                </el-input>
                <!-- 添加按钮 -->
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 25.索引列 -->
            <el-table-column type="index" label="#"></el-table-column>
            <!-- prop指定数据名称 -->
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作" >
              <!-- 利用作用域插槽接收数据 -->
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 14.添加静态属性面板 -->
        <el-tab-pane label="静态属性" name="only">
            <!-- 添加属性按钮 -->
            <!-- 33. -->
            <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加属性</el-button>
            <!-- 27.静态属性表格 -->
            <el-table :data="onlyTableData" border stripe>
            <!-- 29.展开行 -->
            <el-table-column type="expand">
              <!-- 通过作用域插槽接收数据 -->
              <template slot-scope="scope">
                <!-- 循环渲染Tag标签 -->
                <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable @close="handleClose(i,scope.row)">{{item}}</el-tag>
                <!-- 输入文本框 -->
                <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)">
                </el-input>
                <!-- 添加按钮 -->
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 28.索引列 -->
            <el-table-column type="index"></el-table-column>
            <!-- prop指定数据名称 -->
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作" >
              <!-- 利用作用域插槽接收数据 -->
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 30.添加参数对话框 --><!-- 动态与静态共用一个对话框，标题动态绑定 visible表示是否显示对话框-->
    <!-- 37.@close="addDialogClose" -->
    <el-dialog
    :title=" '添加' + titleText "
    :visible.sync="addDialogVisible"
    width="50%"
    @close="addDialogClose">
    <!-- 34.添加参数对话框   rules验证规则-->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
    <el-form-item :label="titleText" prop="attr_name">
    <el-input v-model="addForm.attr_name"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addParams">确 定</el-button>
    </span>
</el-dialog>

<!-- 修改参数对话框 -->
    <el-dialog
    :title=" '修改' + titleText "
    :visible.sync="editDialogVisible"
    width="50%"
    @close="editDialogClose">
    <!-- 34.添加参数对话框   rules验证规则-->
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
    <el-form-item :label="titleText" prop="attr_name">
    <el-input v-model="editForm.attr_name"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editParams">确 定</el-button>
    </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 6.接收商品分类列表数据
      catelist: [],
      // 8.级联选择框的配置对象
      cateProps: {
        // 指定选中的值
        value: "cat_id",
        // 指定看到的值
        label: "cat_name",
        // 指定复制节点的嵌套属性
        children: "children",
      },
      // 9.级联选择框双向绑定数组
      selectedCateKeys: [],
    //   被激活的页签名称
      activeName:'many',
      // 22.动态参数数据
      manyTableData:[],
      // 23.静态属性数据
      onlyTableData:[],
      // 31.控制对话框的显示与隐藏
      addDialogVisible:false,
      // 35.添加参数的表单数据对象
      addForm:{
        attr_name:''
      },
      // 36.添加表单验证规则
      addFormRules:{
        attr_name:[{required:true,message:'请输入参数名称',trigger:'blur'}]
      },
      // 控制 修改 对话框的显示隐藏
      editDialogVisible:false,
      // 修改的表单的数据对象
      editForm:{},
      // 修改的表单验证规则对象
      editFormRules:{attr_name:[{required:true,message:'请输入参数名称',trigger:'blur'}]},
      // 控制按钮与文本框的切换显示
      // inputVisible:false,
      // // 文本框输入内容
      // inputValue:'',
    }
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 5.获取所有的商品分类列表
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类列表失败！");
      }

      this.catelist = res.data;
    //   console.log(this.catelist);
    },
    // 10.级联选择框中项变化，会触发这个函数
    handleChange() {
      // console.log(this.selectedCateKeys);
      // 11.证明选中的不是三级分类
      // 19.
      this.getParamsData()
    },
    // Tab页签点击事件处理函数
    handTableClick(){
        console.log(this.activeName);
        // 20.
        this.getParamsData()
    },
    // 18.获取参数的列表数据
    async getParamsData(){
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
        // 若先选择三级分类后，按钮可用，若在选择二级分类后，按钮内容无改变，下面重置静态与动态按钮的渲染内容
        this.manyTableData = [];
        this.onlyTableData = [];
        return;
      }
      // 证明选中是三级分类
      // console.log(this.selectedCateKeys);
      // 根据所选分类ID和当前所处的面板，获取对应参数
      const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:this.activeName}})
      if(res.meta.status !== 200){
        return this.$message.error('获取参数列表失败！')
      }
      // console.log(res.data);
      // 赋值前做一次for循环   split() 方法用于把一个字符串分割成字符串数组。
        res.data.forEach(item => {
        item.attr_vals =item.attr_vals ? item.attr_vals.split(' ') : []
        // 因表格的数据共用一个数据，导致两个表格都会同时传递同一个值，解决如下
        // 添加一个业务，控制文本框的显示与隐藏
        item.inputVisible = false;
        item.inputValue = '';
      })
      // console.log(res.data);
      // 21.无论获取的动态还是静态都会调用getParamsData()这个函数，获取的数据只有一份，都存在res.data上，区别动态和静态渲染的数据，先判断
      // 当前标签等于many是动态参数，否则是静态属性
      if(this.activeName === 'many'){
        // 重新定义一个
        this.manyTableData = res.data
      }else{
        this.onlyTableData = res.data
      }
    },
    // 38.添加对话框的关闭事件
    addDialogClose(){
      this.$refs.addFormRef.resetFields()
    },
    // 39.点击按钮添加参数的处理函数
    addParams(){
      // 40.添加前先表单预验证
      this.$refs.addFormRef.validate(async valid => {
        if(!valid) return
        // 41表单的请求体
        const {data:res} = await this.$http.post(`categories/${this.cateId}/attributes`,{
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        })
        if(res.meta.status !== 201){
          return this.$message.error('添加参数失败！')
        }
        this.$message.success('添加参数成功！')
        // 42关闭添加对话框
        this.addDialogVisible = false
        // 43刷新数据列表
        this.getCateList()
      })
    },
    // 点击编辑按钮，展示对话框
    async showEditDialog(attr_id){
      const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes/${attr_id}`,{params:{attr_sel:this.activeName}})
      if(res.meta.status !== 200){
        return this.$message.error('获取参数信息失败！')
      }
      // 请求成功把请求的数据放到editFormRef表单中
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 重置修改的表单
    editDialogClose(){
      this.$refs.editFormRef.resetFields()
    },
    // 点击按钮，修改参数
    editParams(){
      // 先拿到表单的引用,预校验，然后在发送请求数据
      this.$refs.editFormRef.validate(async valid =>{
        if(!valid) return
        const {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`,{ attr_name: this.editForm.attr_name, attr_sel:this.activeName})
        if(res.meta.status !== 200){
          return this.$message.error('修改参数失败！')
        }
        this.$message.success('修改参数成功！')
        // 刷新数据列表
        this.getCateList()
        // 关闭添加对话框
        this.editDialogVisible = false
     })
    },
    // 根据id删除对应的参数项
    async removeParams(attr_id){
      // 先弹框提示，此操作不需要解构，因为返回的是文本
       const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        // 若用户取消删除操作
        if(confirmResult !== 'confirm'){
          return this.$message.info('已取消删除！')
        }
        // 删除的业务
        const {data:res} = await this.$http.delete(`categories/${this.cateId}/attributes/${attr_id}`)
        if(res.meta.status !== 200){
          return this.$message.error('删除参数失败！')
          }
          this.$message.success('删除参数成功！')
          this.getParamsData
          },
          // 文本框失去焦点或摁下enter触发
          async handleInputConfirm(row){
            if(row.inputValue.trim().length === 0){
              row.inputValue = ''
              row.inputVisible = false;
              return;
            }
            row.attr_vals.push(row.inputValue.trim())
            // 重置
            row.inputValue = ''
            // 隐藏文本输入框
            row.inputVisible = false
            // 保存添加的数据
            this.saveAtterVals(row)
          },
          // 将对attr_vals操作，保存数据库
          async saveAtterVals(row){
            const {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`,
            {
              attr_name:row.attr_name,
              attr_sel:row.attr_sel,
              attr_vals:row.attr_vals.join(' ')
              })
              if(res.meta.status !== 200){
                return this.$message.error('修改参数项失败！')
              }
              this.$message.success('修改参数项成功！')
          },
          // 点击按钮展示文本输入框
          showInput(row){
            row.inputVisible = true;
            // 文本框自动获得焦点      $nextTick作用：当页面元素被重新渲染后，才会回调函数中的代码
             this.$nextTick(_ => {
             this.$refs.saveTagInput.$refs.input.focus();
        });
     },
     //  删除参数可选项
     handleClose(i,row){
       row.attr_vals.splice(i,1)
       this.saveAtterVals(row)
     }
  },
  computed:{
    //   16.按钮禁用返回turn,否则返回false
    isBtnDisabled(){
      if(this.selectedCateKeys.length !== 3){
          return true;
      }
      return false;
    },
    // 17.当前选中的三级分类ID
    cateId(){
        if(this.selectedCateKeys.length === 3){
            return this.selectedCateKeys[2]
        }
        return null;
    },
    // 31.动态计算对话框标题文本
    titleText(){
      if(this.activeName === 'many'){
        return '动态参数'
      }else{
        return '静态属性'
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
.el-cascader {
  width: 20%;
}
.el-tag{
  margin: 10px;
}
.input-new-tag{
  width: 100px;
}
</style>

// 分析：两个按钮的禁用和启用与级联选择器对应的数组长度有关，只要length等于3启用不等于3禁用，
//      定义一个计算属性，计算属性根据返回的长度返回一个布尔值，控制按钮启用和禁用