<template>
  <div>
    <!--1.面包屑导航区区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :space="300"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- Tab标签页区域 -->
      <!-- 表单 -->
      <!-- model表单数据源  rules表单验证规则  ref表单引用 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <!-- Tab标签    注意：<el-tab-pane>只能是<el-tabs>的子标签，不能把<el-form>放在他们二者之间-->
        <!-- before-leave  切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。 -->
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <!--商品分类级联选择器   :options指定数据源 -->
              <el-cascader
                expandTrigger="hover"
                :options="catelist"
                :props="cateProps"
                v-model="addForm.goods_cat"
                @change="handleChange"
                width="50%"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单item项 -->
            <el-form-item
              :label="item.attr_name"
              v-for="item in manyTableData"
              :key="item.attr_id"
            >
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="cd"
                  v-for="(cd, i) in item.attr_vals"
                  :key="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyTableData"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- action:必选参数，上传到的后台API地址 
                 on-preview 点击文件列表中已上传的文件时的钩子 预览图片
                 on-remove 文件列表移除文件时的钩子
                 list_type 文件列表的类型
                 上传图片之前都要手动添加一个请求头headers  -->
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture-card"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="addForm.goods_introduce"> </quill-editor>
            <!-- 添加商品分类按钮 -->
            <el-button type="primary" class="btn1" @click="add" plain
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="30%">
      <img :src="previewPath" alt="" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      activeIndex: 0,
      //   添加表单数据项
      addForm: {
        goods_name: "",
        goods_price: "1",
        goods_weight: "1",
        goods_number: "1",
        // 商品所属分类数组
        goods_cat: [],
        // 图片的数组
        pics: [],
        // 商品详情描述
        goods_introduce: "",
        attrs: [],
      },
      // 表单验证规则
      addFormRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        goods_cat: [
          { required: true, message: "请输入商品分类", trigger: "blur" },
        ],
      },
      //   商品分类列表
      catelist: [],
      cateProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      // 动态参数列表数据
      manyTableData: [],
      // 静态属性列表数据
      onlyTableData: [],
      // 上传图片URL地址
      uploadURL: "http://127.0.0.1:8888/api/private/v1/upload",
      // 图片上传组建的的headers请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
      previewPath: "",
      previewVisible: false,
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类列表失败！");
      }
      this.catelist = res.data;
      // console.log(this.catelist);
    },
    // 级联选择器选中项变化触发函数
    handleChange() {
      // console.log(this.addForm.goods_cat);
      // 只允许级联选择器只选择三级商品分类
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
      }
    },
    // oldActiveName  刚活跃的标签页   activeName   即将活跃的标签页
    beforeTabLeave(activeName, oldActiveName) {
      // console.log('进入标签页名字：' + activeName);
      // console.log('离开标签页名字：' + oldActiveName);
      // // return false;
      if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error("请选择商品分类！");
        return false;
      }
    },
    async tabClicked() {
      // console.log(this.activeIndex);
      // 证明访问的是动态参数面板
      if (this.activeIndex === "1") {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: "many" },
          }
        );
        if (res.meta.status !== 200) {
          return this.$message.error("获取动态参数列表失败！");
        }
        // console.log(res.data);
        res.data.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(" ");
        });
        this.manyTableData = res.data;
      } else if (this.activeIndex == "2") {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: "only" },
          }
        );
        if (res.meta.status !== 200) {
          return this.$message.error("获取静态数据失败！");
        }
        // console.log(res.data);
        this.onlyTableData = res.data;
      }
    },
    // 处理图片预览效果
    handlePreview(file) {
      // console.log(file);
      this.previewPath = file.response.data.url;
      this.previewVisible = true;
    },
    // 处理移除图片操作
    handleRemove(file) {
      // console.log(file);
      // 1.获取将要移除的临时路径
      const filePath = file.response.data.tmp_path;
      // // 2.从pics数组中找到图片对应索引值
      const i = this.addForm.pics.findIndex((x) => x.pic === filePath);
      // // 3.调用数组splice方法，把图片信息对象从pics数组移除
      this.addForm.pics.splice(i, 1);
      // console.log(this.addForm);
    },
    // 监听图片上传成功的事件
    handleSuccess(response) {
      // console.log(response);
      // 1.拼接得到图片对象
      const picInfo = { pic: response.data.tmp_path };
      // 2.将图片信息对象push到pics数组中
      this.addForm.pics.push(picInfo);
      // console.log(this.addForm);
    },
    // 添加商品
    add() {
      // console.log(this.addForm);
      // 表单预验证，回调函数一个形参
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项！");
        }
        // this.$message.success('添加商品成功！')
        // 执行添加的业务逻辑,深拷贝一份goods_cat
        const form = _.cloneDeep(this.addForm);
        form.goods_cat = form.goods_cat.join(",");
        // 把attr里的数组对象变成atrr_id和attr_value形式
        // 处理动态参数
        this.manyTableData.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(" "),
          };
          this.addForm.attrs.push(newInfo);
        });
        // 处理静态参数
        this.onlyTableData.forEach((item) => {
          const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals };
          // 将newInfo  push  到 this.addForm.attrs中
          this.addForm.attrs.push(newInfo);
        });
        form.attrs = this.addForm.attrs;
        // console.log(form);

        // 添加商品发送请求 商品名称是唯一的
        const { data: res } = await this.$http.post("goods", form);
        if (res.meta.status !== 201) {
          return this.$message.error("添加商品失败！");
        }
        this.$message.success("添加商品成功！");
        // 编程式导航路由跳转到商品列表
        this.$router.push("/goods");
      });
    },
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2];
      }
      return null;
    },
  },
};
</script>

<style lang="less" scoped>
.el-cascader {
  width: 20%;
}
.el-input {
  width: 60%;
}
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
// .el-form-item {
//   // margin: 0 !important;
// }
.previewImg {
  width: 100%;
}
.btn1 {
  margin-top: 15px;
}
</style>