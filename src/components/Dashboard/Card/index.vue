<!--
 * @Author: luoheng
 * @Date: 2022-02-27 21:34:49
 * @LastEditTime: 2022-02-28 00:24:45
 * @LastEditors: luoheng
 * @Description: 
 * God help those who help themselves
-->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="¥ 125896">
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;56.58%<svg
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
              ></span>
              <span
                >日同比&nbsp;&nbsp;26.45%<svg
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
            </template>
            <template slot="footer"> 日销售额¥ 102589 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="98567">
            <template slot="charts">
              <LineChart></LineChart>
            </template>
            <template slot="footer"> 日访问量 102589 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="98567">
            <template slot="charts">
              <BarChart></BarChart>
            </template>
            <template slot="footer"> 转化率 79% </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活跃效果" count="89%">
            <template slot="charts">
              <progressChart></progressChart>
            </template>
            <template slot="footer">
              <span
                >周同比&nbsp;&nbsp;56.58%<svg
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
              ></span>
              <span
                >日同比&nbsp;&nbsp;26.45%<svg
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
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineChart from "./lineChart";
import BarChart from "./barCharts";
import progressChart from './progressCharts'
export default {
  components: { Detail, LineChart,BarChart,progressChart},
};
</script>

<style  scoped>
</style>