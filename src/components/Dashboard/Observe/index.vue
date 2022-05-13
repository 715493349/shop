<!--
 * @Author: luoheng
 * @Date: 2022-02-28 13:27:37
 * @LastEditTime: 2022-02-28 14:02:41
 * @LastEditors: luoheng
 * @Description: 底部数据可视化
 * God help those who help themselves
-->
 <template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <Search></Search>
      </el-col>
      <el-col :span="12">
        <Category></Category>
      </el-col>
    </el-row>
  </div>
</template>

 <script>
import Search from "./Search";
import Category from "./Category";
export default {
  name: "",
  components: {
    Search,
    Category,
  },
};
</script>
 
 <style scoped>
</style>