<!--
 * @Author: luoheng
 * @Date: 2022-01-14 23:13:40
 * @LastEditTime: 2022-05-13 10:40:05
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
-->
<template>
  <div>
    <Dashboard></Dashboard>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  components: {
    Dashboard: () => import("./Dashboard/index.vue"),
  },
};
</script>

<style scoped>
</style>
   