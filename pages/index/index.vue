<template>
	<view></view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			if (!uni.getStorageSync('fullScreen')) {
				uni.setStorageSync('fullScreen', true)
				this.go({
					url: '/sub-pages-other/full-screen/full-screen'
				})
			} else {
				uni.showTabBar();
				uni.switchTab({
					url: '/pages/index/home'
				});
			}
		},
		mounted() {
		  uni.hideTabBar();
		  this.startCountdown();
		}
	}
</script>

<style lang="scss">

</style>