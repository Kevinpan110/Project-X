<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(image, index) in imageList"
        :key="image.spuImgId"
        @mouseenter="changeCurrentIndex(index)"
      >
        <img :src="image.imgUrl" :class="{ active: index == currentIndex }" />
      </div>
    </div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev" ></div>
    <div class="swiper-button-next" ></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: ["imageList"],
  methods: {
    changeCurrentIndex(index) {
      this.currentIndex = index;
      this.$bus.$emit("sendIndex", index);
    },
  },
  watch: {
    imageList() {
      this.$nextTick(() => {
        var mySwiper = new Swiper(".swiper-container", {
          slidesPerView: 5,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 72px;
  width: 402px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 72px;
    height: 72px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 66px;
      height: 66px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 72px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
