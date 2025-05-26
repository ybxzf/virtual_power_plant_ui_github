<template>
  <div class="count-item">
    <div class="item-ctn" v-for="(it, i) in countList" :key="i">
      <div class="item-base" :style="{ backgroundImage: `url(${it.img})` }">

      </div>
      <div class="item-Pseudo" v-if="i != countList.length - 1"></div>
    </div>

  </div>
</template>

<script>

export default {
  name: "CountItem",
  components: {
  },
  props: {
    countList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
.count-item {
  width: 100%;
  height: 100%;
  display: flex;

  .item-ctn {
    width: 25%;
    height: 100%;
    display: flex;

    .item-base {
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: 110% 120%;
      background-repeat: no-repeat;
      border-radius: 10px;
      // box-shadow:
      //   inset 2px 2px 5px rgba(255, 255, 255, 0.5),
      //   /* 内阴影（凹陷感） */
      //   3px 3px 8px rgba(0, 0, 0, 0.2);
      // /* 外阴影（凸起感） */
    }

    .item-Pseudo {
      width: 3%;
      height: 100%;
    }
  }
}
</style>
