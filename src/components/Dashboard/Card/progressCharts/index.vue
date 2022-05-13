<!--
 * @Author: luoheng
 * @Date: 2022-02-27 23:01:47
 * @LastEditTime: 2022-02-28 00:42:46
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
        // type: "category",
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      // 系列
      series: [
        {
          type: "bar",
          data: [89],
          color: "blue",
          // 状图宽度
          barWidth: 10,
          // 设置圆角
          itemStyle: {
            normal: {
              barBorderRadius: [0, 20, 20, 0],
            },
          },
          // 背景颜色、
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          // 文本
          label: {
            show: true,
            formatting:"|",
            position:'right'
          },
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