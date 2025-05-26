<template>
  <div class="app-container home">
    <el-row style="height: 19%;margin-bottom: 1%;background: rgb(17 128 225 / 0%);">
      <CountItem :countList="countList"></CountItem>

      <!-- <el-col :span="6" style="background-color: rgba(12, 13, 111, 0.5);"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col> -->
    </el-row>
    <el-row style="height: 39%;margin-bottom: 1%;background: rgb(210 21 255 / 30%);">
      <el-col :span="24" style="background-color: rgba(12, 13, 111, 0.5);"></el-col>
    </el-row>
    <el-row style="height: 39%;margin-bottom: 1%;">
      <el-col :span="8" style="background-color: rgb(12 111 52 / 50%);"></el-col>
      <el-col :span="16" style="background-color: rgb(17 128 225 / 50%);">
        <SettlementRank></SettlementRank>
      </el-col>
    </el-row>

    <!-- 欢迎访问！ -->
  </div>
</template>

<script>
import SettlementRank from './homePage/components/settlementRank.vue';
import CountItem from "./homePage/components/countItem.vue";

export default {
  name: "Index",
  components: {
    SettlementRank,
    CountItem,
  },
  data() {
    return {
      countList: [
        { label: "聚合负荷", value: 45.4, unit: "MW", img: "/img/juhe.png", bg: "" },
        { label: "可调负荷", value: 30.2, unit: "MW", img: "/img/ketiao.png", bg: "" },
        { label: "接入聚合商", value: 1, unit: "家", img: "/img/jieru.png", bg: "" },
        { label: "接入用户", value: 170, unit: "户", img: "/img/yonghu.png", bg: "" },
      ],
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
  // background: url('../assets/images/homePage.png') no-repeat;
  height: calc(100vh - 100px);
  background-size: 100% 100%;
  padding: 10px;

  .el-row {
    width: 100%;
  }

  .el-col {
    height: 100%;
  }
}
</style>
