<!--
 * @Author: luoheng
 * @Date: 2022-02-28 14:06:23
 * @LastEditTime: 2022-02-28 15:25:59
 * @LastEditors: luoheng
 * @Description: 折线图
 * God help those who help themselves
-->
<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg
        t="1645970123571"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2017"
        width="23"
        height="23"
      >
        <path
          d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
          p-id="2018"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">1235</span>
      <span class="main-content"
        >17.1
        <svg
          t="1645972609366"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7354"
          width="16"
          height="16"
        >
          <path
            d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
            fill="#d81e06"
            p-id="7355"
          ></path></svg
        ><svg
          t="1645972973563"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9866"
          width="16"
          height="16"
        >
          <path
            d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
            fill="#1afa29"
            p-id="9867"
          ></path></svg
      ></span>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
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
            color: "blue",
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
                  color: "blue",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              global: false,
            },
          },
          smooth: true,
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
.header {
  display: flex;
  align-items: center;
}
.search-header {
  margin-right: 20px;
}
.main {
  margin: 10px 0;
}
.main-title {
  margin-right: 30px;
}
.main-content {
  margin-right: 10px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>