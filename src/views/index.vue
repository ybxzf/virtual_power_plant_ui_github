<template>
  <div class="app-container home">
    <el-row style="height: 21%;background: rgb(17 128 225 / 0%);">
      <el-col :span="6" style="background-color: rgba(12, 13, 111, 0);"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <el-row style="height: 41%;background: rgb(210 21 255 / 0%);">
      <el-col :span="24" style="background-color: rgba(12, 13, 111, 0);"></el-col>
    </el-row>
    <el-row style="height: 40%;">
      <el-col :span="8" style="background-color: rgb(12 111 52 / 0%);"></el-col>
      <el-col :span="16">
        <SettlementRank></SettlementRank>
      </el-col>
    </el-row>

    <!-- 欢迎访问！ -->
  </div>
</template>

<script>
import SettlementRank from './homePage/components/settlementRank.vue'

export default {
  name: "Index",
  components: {
    SettlementRank,
  },
  data() {
    return {

    };
  },
  methods: {
    changeTab(val) {
      console.log(val)
    },
    goTarget(href) {
      window.open(href, "_blank");
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  background: url('../assets/images/homePage.png') no-repeat;
  height: calc(100vh - 84px);
  background-size: 100% 100%;

  .el-row {
    width: 100%;
  }

  .el-col {
    height: 100%;
  }
}
</style>
