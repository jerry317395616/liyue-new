<template>
  <view class="splash-screen" v-if="showSplash">
    <image class="full-screen-image" src="@/static/images/material-item29.jpg" mode="aspectFill" />
    <view class="countdown">{{ countdown }} 秒后自动关闭</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showSplash: true,
      countdown: 5
    };
  },
  onLoad() {
    uni.hideTabBar();
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(timer);
          this.showSplash = false;
          uni.showTabBar();
          uni.switchTab({
            url: '/pages/index/home'
          });
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .full-screen-image {
    width: 100%;
    height: 100%;
  }
  
  .countdown {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
  }
}
</style>
