<!--
 * @Author: luoheng
 * @Date: 2022-02-27 23:01:47
 * @LastEditTime: 2022-02-28 00:09:09
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
          type: "line",
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          // 拐点样式·
          itemStyle: {
            opacity: 0,
          },
          // 线条样样式
          lineStyle: {
            color: "purple",
          },
          // 填充颜色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              global: false,
            },
          },
          smooth: true
        },
        
      ],
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