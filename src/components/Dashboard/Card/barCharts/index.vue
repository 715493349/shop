<!--
 * @Author: luoheng
 * @Date: 2022-02-27 23:01:47
 * @LastEditTime: 2022-02-28 00:21:06
 * @LastEditors: luoheng
 * @Description: 折线图
 * God help those who help themselves
-->

<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  // 组件挂载完毕后获取dom节点，初始化
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数组
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      // 系列
      series: [
        {
          type: "bar",
          data: [10, 47, 33, 62, 48, 79, 29, 50, 44, 87, 97, 25, 14],
          color: "#039263",
        },
      ],
      // 提示
      tooltip: {},
      // 布局
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>