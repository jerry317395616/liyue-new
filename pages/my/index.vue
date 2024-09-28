<template>
	<view class="page" @click="isLoginFn">
		<view class="top-box" @click="editData">
			<view class="leftContent">
				<view class="myImg">
					<image src="@/static/images/material-item18.png" class="img" mode="aspectFit"></image>
				</view>
				<view class="myNameBox">
					<view class="myName">{{user.name}}</view>
					<view class="myName1">{{user.member_level}}</view>
				</view>
			</view>
		</view>
		<view class="middle-box">
			<image class="img1" src="@/static/images/material-item21.png" mode="widthFix"></image>
			<view class="my-artic">
				我的裱文
			</view>
			<view class="my-photo" @click="toPhoto">
				祭祀相册
			</view>
		</view>
		<view class="footer-box">
			<view class="scheduleBox">
				<view class="leftSchedule">
					<view class="circle"></view>
					<view class="text">
						常见问题
					</view>
				</view>
				<view class="rightContent">
					<u-icon name="arrow-right" size="40" color="#AFAFAF" />
				</view>
			</view>
			<view class="scheduleBox">
				<view class="leftSchedule">
					<view class="circle"></view>
					<view class="text">
						会员权益
					</view>
				</view>
				<view class="rightContent">
					<u-icon name="arrow-right" size="40" color="#AFAFAF" />
				</view>
			</view>
			<view class="scheduleBox">
				<view class="leftSchedule">
					<view class="circle"></view>
					<view class="text">
						客服
					</view>
				</view>
				<view class="rightContent">
					<u-icon name="arrow-right" size="40" color="#AFAFAF" />
				</view>
			</view>
			<view class="footer-text">
				(七日内未收到视频，请联系我们。)
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {}
			};
		},
		onLoad() {
			this.user = uni.getStorageSync('user')
			console.log(this.user, 'user')
		},
		methods: {
			toPhoto() {
				this.go({
					url: '/person/photo-album/photo-album',
					params: ''
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 20rpx;
		.top-box {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 180rpx;
			border-radius: 20rpx;
			// padding: 25rpx 28rpx;
			.leftContent {
				display: flex;
				justify-content: start;
				.myImg {
					margin: auto 0;
					width: 130rpx;
					height: 130rpx;
					border-radius: 65rpx;
					.img {
						width: 130rpx;
						height: 130rpx;
						border-radius: 65rpx;
					}
				}
				.myNameBox {
					margin: auto 0 auto 20rpx;
					.myName {
						font-size: 36rpx;
						font-weight: bold;
						color: #3E3E3E;
					}
					.myName1 {
						margin-top: 20rpx;
						font-size: 36rpx;
						font-weight: bold;
						color: #3E3E3E;
					}
				}
			}
		}
		.middle-box {
			position: relative;
			width: 100%;
			margin-top: 20rpx;
			.img1 {
				width: 100%;
			}
			.my-artic {
				position: absolute;
				top: 50%;
				left: 17%;
				transform: translateY(-50%);
				font-size: 36rpx;
				font-weight: bold;
			}
			.my-photo {
				position: absolute;
				top: 50%;
				right: 17%;
				transform: translateY(-50%);
				font-size: 36rpx;
				font-weight: bold;
			}
		}
		.footer-box {
			width: 100%;
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 30rpx;
			margin-top: 20rpx;
			.scheduleBox {
				display: flex;
				justify-content: space-between;
				.leftSchedule {
					display: flex;
					justify-content: start;
					align-items: center;
					.circle {
						width: 20rpx;
						height: 20rpx;
						background-color: #525252;
						border-radius: 50%;
					}
					.text {
						margin: auto 0 auto 24rpx;
						font-size: 30rpx;
						font-weight: bold;
						color: #111111;
					}
				}
			}
			.scheduleBox:nth-child(n+2) {
				margin-top: 40rpx;
			}
			.footer-text {
				margin-top: 200rpx;
				text-align: center;
				color: #6F6F6F;
				font-size: 22rpx;
			}
		}
	}
</style>
