<!--
 * @Author: luoheng
 * @Date: 2022-02-15 15:26:27
 * @LastEditTime: 2022-04-17 18:40:11
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
-->
<template>
  <div>
    <Card />
    <Sale />
    <Observe />
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {
    Card: () => import("./Card"),
    Sale: () => import("./Sale"),
    Observe: () => import("./Observe"),
  },
};
</script>

<style scoped>
</style>
