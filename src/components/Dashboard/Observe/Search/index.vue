<!--
 * @Author: luoheng
 * @Date: 2022-02-28 13:27:37
 * @LastEditTime: 2022-02-28 15:46:57
 * @LastEditors: luoheng
 * @Description: 底部数据可视化
 * God help those who help themselves
-->
 <template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <div class="search-header">
          <span>线上热门搜索</span>
          <el-dropdown>
            <span>
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <LineChart></LineChart>
          </el-col>
          <el-col :span="12">
            <LineChart></LineChart>
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="排名" width="60" type="index" align="center">
          </el-table-column>
          <el-table-column label="搜索关键字" width="180" align="center">
          </el-table-column>
          <el-table-column label="用户数" sortable align="center">
          </el-table-column>
          <el-table-column label="周涨幅" sortable align="center">
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination layout="prev, pager, next" :total="1000" class="pagination">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

 <script>
import LineChart from "./lineCharts";
export default {
  name: "",
  components: { LineChart },
  data() {
    return {
      tableData: [{}],
    };
  },
};
</script>
 
 <style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
.header {
  padding: 10px 0;
  border-bottom: 1px solid #d1d0d0;
}
.has-gutter {
  font-size: 10px;
}
.pagination{
  float: right;
}
</style>