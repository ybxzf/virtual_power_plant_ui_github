<script>
import Live1 from "@/assets/images/live1.jpg";
import Live2 from "@/assets/images/live2.jpg";
import Live3 from "@/assets/images/live3.png";
import LabelTitle from "@/views/sc/circuitLoadConfig/components/LabelTitle.vue";
export default {
  name: "LivePicture",
  components: { LabelTitle },
  data() {
    return {
      liveList: [
        {
          name: "电气一次系统接线图",
          url: Live1,
        },
        {
          name: "用户配电房现场照片",
          url: Live2,
        },
        {
          name: "负荷管理装置预安装环境照片",
          url: Live3,
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-upload" size="mini"
          v-hasPermi="['sc:corporation:add']">上传</el-button>
      </el-col>
    </el-row>
    <div class="live-picture">
      <div v-for="(item, index) in liveList" :key="index" class="live-picture__item">
        <LabelTitle :title="item.name"></LabelTitle>
        <el-image class="live-picture_img" :src="item.url" fit="contain"></el-image>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.live-picture {
  display: flex;
  flex-wrap: wrap;
  max-height: 65vh;
  overflow-y: auto;
  overflow-x: hidden;
  .live-picture__item {
    width: 100%;
    .live-picture_img {
      width: 100%;
      height: 200px;
      margin: 0 10px;
    }
  }
}
</style>
