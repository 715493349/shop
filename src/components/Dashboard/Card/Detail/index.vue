<!--
 * @Author: luoheng
 * @Date: 2022-02-27 21:41:22
 * @LastEditTime: 2022-02-28 00:10:39
 * @LastEditors: luoheng
 * @Description: 
 * God help those who help themselves
--><template>
  <div>
    <!-- 头 -->
    <div class="card-header">
      <span>{{ title }}</span>
      <svg
        t="1645970123571"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2017"
        width="16"
        height="16"
      >
        <path
          d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
          p-id="2018"
        ></path>
      </svg>
    </div>
    <!-- 内容 -->
    <div class="card-content">{{ count }}</div>
    <!-- 图表 -->
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <!-- 底部 -->
    <div class="card-footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  // 子组件接收父组件
  props: ["title", "count"],
};
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  color: #d9d9d9;
}
.card-content {
  font-size: 30px;
  padding: 8px 0;
}
.card-charts {
  display: flex;
  justify-content: space-around; 
  height: 50px;
}
.card-footer {
  border-top: 1px solid #a8a8a8;
  padding-top: 10px;
}
</style>