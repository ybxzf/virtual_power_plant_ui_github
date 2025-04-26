<template>
  <div class="app-container home">
    <el-button type="primary">确认</el-button>
    <el-button>取消</el-button>
    <div>
      <custome-tabs :active="1" :tabList="tabs" @change="changeTab"></custome-tabs>
      <el-select placeholder="请选择省">
        <el-option v-for="item in 5" :key="item" :label="item" :value="item"> </el-option>
      </el-select>--
      <el-select placeholder="请选择市">
        <el-option v-for="item in 5" :key="item" :label="item" :value="item"> </el-option>
      </el-select>--
      <el-select placeholder="请选择区">
        <el-option v-for="item in 5" :key="item" :label="item" :value="item"> </el-option>
      </el-select>
    </div>
    欢迎访问！
  </div>
</template>

<script>

export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "1.0.0",
      tabs: [
        { label: '基础档案', value: '基础档案', },
        { label: '档案结构', value: '档案结构', },
        { label: '总监组配置阿萨德撒大声地', value: '总监组配置' },
        { label: '接入量配置', value: '接入量配置' },
      ]
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
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans",
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
