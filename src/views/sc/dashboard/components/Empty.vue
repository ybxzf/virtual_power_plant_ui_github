<template>
  <el-empty description="暂无数据" :image-size="100">
    <template #image>
      <img src="../../../../assets/images/nodata.svg" alt="">
    </template>
  </el-empty>
</template>
<script>
export default {
  name: 'DataEmpty'
}
</script>
<style></style>
