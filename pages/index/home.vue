<template>
	<view class="page" @click="isLoginFn">
		<swiper class="swiper" circular :indicator-dots="swiper.indicatorDots" :autoplay="swiper.autoplay" :interval="swiper.interval"
			:duration="swiper.duration" @change="onSwiperChange">
			<swiper-item class="swiper-item" v-for="(item, index) in bannerList" :key="index">
				<video
					v-if="item.url"
					ref="videos"
					:id="item.url"
					:src="item.url"
					autoplay
					loop
					muted
					:controls="false"
					:show-fullscreen-btn="false"
					:show-play-btn="false"
					:show-center-play-btn="false"
					:show-loading="false"
					:enable-progress-gesture="false"
					:vslide-gesture-in-fullscreen="false"
					class="bg-video"
					object-fit="cover" 
					play-btn-position="center"
					></video>
			</swiper-item>
		</swiper>
		<view class="liyue-logo-bg">
			<image src="@/static/images/material-item6.png" mode="aspectFit"></image>
		</view>
		<view class="view-box1">
			<image src="@/static/images/material-item22.png" mode="widthFix"></image>
			<view class="img-box1">
				<view class="" @click="goVIdeo">
					<image class="img1" src="@/static/images/material-item19.png" mode="widthFix"></image>
					<image class="img2" src="@/static/images/material-item15.png" mode="widthFix"></image>
				</view>
				<view class="" @click="goVIdeo">
					<image class="img1" src="@/static/images/material-item19.png" mode="widthFix"></image>
					<image class="img2" src="@/static/images/material-item15.png" mode="widthFix"></image>
				</view>
				<view class="" @click="goVIdeo">
					<image class="img1" src="@/static/images/material-item19.png" mode="widthFix"></image>
					<image class="img2" src="@/static/images/material-item15.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="img-box2">
				<image class="img1" src="@/static/images/material-item16.png" mode="widthFix"></image>
			</view>
			<view class="img-box3">
				<image class="img1" src="@/static/images/material-item17.png" mode="widthFix"></image>
			</view>
			<view class="img-box4">
				<image class="img1" src="@/static/images/material-item20.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { getItem } from "@/request/api/liYueApi.js";
	import config from "@/config/config.js"
	export default {
		data() {
			return {
				swiper: {
					indicatorDots: true,
					autoplay: true,
					interval: 10000,
					duration: 500
				},
				bannerList: [],
				currentIndex: 0
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {
			
		},
		onReady: function() {
			this.playVideo(this.currentIndex);
		},
		methods: {
			isLoginFn() {
				if (!uni.getStorageSync("token")) {
					this.$liyue.login('system',this.init())
				}
			},
			init() {
				this.getVideo()
			},
			getVideo() {
				const params = {
					filters: JSON.stringify([["category", "=", "首页视频"]]),
					fields: JSON.stringify(["*"])
				}
				getItem(params).then(res => {
					console.log(res, '首页背景视频')
					this.bannerList = res.data
					this.bannerList.forEach(item => {
						item.url = config.img + item.video
					})
				})
			},
			playVideo(index) {
				this.$nextTick(() => {
					this.bannerList.forEach((video, i) => {
						const videoContext = uni.createVideoContext(video.url, this);
						if (i === index) {
							videoContext.seek(0);
							videoContext.play();
						} else {
							videoContext.pause();
						}
					});
				});
			},
			onSwiperChange(e) {
				this.currentIndex = e.detail.current;
				this.playVideo(this.currentIndex);
			},
			goVIdeo() {
				const params = {
					url: config.img + '/files/tu.mp4'
				}
				this.go({
					url: '/sub-pages-other/liyue-video/index',
					params: params
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	height: 100vh;
	width: 100%;
	position: relative;
	.swiper {
		position: relative;
		height: 100%;
		width: 100%;
		.swiper-item {
			.bg-video {
				width: 100%;
				height: 100%;
			}
		}
	}
	.liyue-logo-bg {
		position: absolute;
		left: 50%;
		top: 20%;
		transform: translateX(-50%);
		width: 150rpx;
		height: 150rpx;
		z-index: 10;
	}
	.view-box1 {
		position: absolute;
		left: 50%;
		top: 48%;
		transform: translateX(-50%);
		width: 90%;
		// height: 200rpx;
		z-index: 10;
		// pointer-events: none; // 禁止 .view-box1 响应事件，确保轮播图滑动不受影响
		
		// border: 4rpx solid #F1EDE9;
	    // border-radius: 15rpx;
	    // padding: 6rpx;
	    // background-color: rgba(255, 255, 255, 0);
	    // box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		.img-box1 {
			position: absolute;
			left: 0;
			top: 15rpx;
			
			width: 100%;
			height: 200rpx;
			padding: 20rpx 40rpx;
			
			display: flex;
			justify-content: space-around;
			align-items: center;
			.img1 {
				width: 120rpx;
			}
			.img2 {
				width: 120rpx;
				margin-top: 20rpx;
			}
		}
		.img-box2 {
			position: absolute;
			left: 10rpx;
			top: 285rpx;
			
			width: 300rpx;
			height: 100rpx;
			// background: pink;
			// padding: 20rpx 30rpx;
			.img1 {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				width: 200rpx;
			}
		}
		.img-box3 {
			position: absolute;
			right: 10rpx;
			top: 285rpx;
			
			width: 300rpx;
			height: 100rpx;
			// background: pink;
			// padding: 20rpx 30rpx;
			.img1 {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				width: 150rpx;
			}
		}
		.img-box4 {
			position: absolute;
			left: 10rpx;
			bottom: 130rpx;
			
			width: 100%;
			height: 200rpx;
			padding: 20rpx 60rpx 20rpx 40rpx;
		}
	}
	
	//未选中的指示点样式，支持h5、app
	/deep/ .uni-swiper-dot{
		width: 6rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 50%;
	}
	//未选中的指示点样式，支持微信小程序
	/deep/ .wx-swiper-dot {
		width: 6rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 50%;
	}
	//选中的指示点样式，支持h5、app
	/deep/ .uni-swiper-dot-active{
		width: 30rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 0;
	}
	//选中的指示点样式，支持微信小程序
	 /deep/ .wx-swiper-dot-active {
		width: 30rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 0;
	}
	//指示点位置，支持h5、app
	/deep/ .uni-swiper-dots-horizontal{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%);
	}
	//指示点位置，支持微信小程序
	/deep/ .wx-swiper-dots-horizontal{
		position: absolute;
		left: 50%;
		top: 45%;
		transform: translateX(-50%);
	}
}
</style>
