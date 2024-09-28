<template>
	<view class="page">
		<view class="top-box">
			<view class="top-box1">
				<image class="img1" src="@/static/images/material-item23.png" mode="widthFix"></image>
				<view class="top-box1-text">
					祭祀VIP
				</view>
				<image class="img2" src="@/static/images/material-item25.png" mode="widthFix"></image>
			</view>
			<view class="top-box2">
				<image class="img1" src="@/static/images/material-item24.png" mode="widthFix"></image>
				<view class="top-box2-text">
					<view class="top-box2-child1">
						特权
					</view>
					<view class="top-box2-child2">
						会员享有会员专属价格。
					</view>
					<view class="top-box2-child3">
						会员享有专属祭祖提醒（提前一个月提醒）
					</view>
					<view class="scheduleBox">
						<view class="leftSchedule">
							<view class="circle"></view>
							<view class="text">
								使用规则
							</view>
						</view>
						<view class="rightContent">
							<u-icon name="arrow-right" size="40" color="#AFAFAF" />
						</view>
					</view>
					<view class="scheduleBox1">
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
				</view>
				
			</view>
		</view>
		<view class="footer-box">
			<u-checkbox 
				v-model="item.checked" 
				v-for="(item, index) in items" :key="index" 
				:name="item.name"
			>
				<text style="color:#fff;font-size: 26rpx;">我已阅读并同意</text>
				<text style="color:#E1D3B6;font-size: 26rpx;" @click.stop="goUserAgreement">《付费会员服务协议》</text>
				<text style="color:#E1D3B6;font-size: 26rpx;" @click.stop="goPrivacy">《自动续费说明》</text>
			</u-checkbox>
			<view class="buy-box" @click="toBuy">
				<text class="buy-text">
					立即购买
				</text>
				<text class="buy-text1">
					￥<text class="buy-text3">58</text>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
					name: 'agreePrivacy',
					checked: false
				}]
			};
		},
		methods: {
			toBuy() {
				if (!this.items[0].checked) {
					this.$u.toast('请先同意《付费会员服务协议》和《自动续费说明》');
					return;
				}
			}
		}
	}
</script>

<style lang="scss">
.page {
	position: relative;
	padding: 20rpx 20rpx 0 20rpx;
	.top-box {
		width: 100%;
		box-sizing: border-box;
		.top-box1 {
			position: relative;
			width: 98%;
			height: 300rpx;
			background-color: #E99136;
			border-radius: 50rpx;
			margin-right: 10rpx;
			.img1 {
				position: absolute;
				bottom: -45rpx;
				left: 0;
				width: 100rpx;
			}
			.top-box1-text {
				position: absolute;
				top: 30rpx;
				left: 30rpx;
				font-size: 38rpx;
				font-weight: bold;
			}
			.img2 {
				position: absolute;
				bottom: 30rpx;
				right: 50rpx;
				width: 110rpx;
			}
		}
		.top-box2 {
			position: relative;
			width: 98%;
			height: 600rpx;
			background-color: #E1D3B6;
			border-radius: 50rpx;
			margin-top: 15rpx;
			margin-left: 10rpx;
			.img1 {
				position: absolute;
				top: -45rpx;
				right: 0;
				width: 100rpx;
			}
			.top-box2-text {
				position: absolute;
				top: 30rpx;
				left: 30rpx;
				width: 100%;
				.top-box2-child1 {
					font-size: 38rpx;
					font-weight: bold;
				}
				.top-box2-child2 {
					color: #7B776F;
					margin-left: 30rpx;
					margin-top: 30rpx;
					font-weight: bold;
				}
				.top-box2-child3 {
					color: #7B776F;
					margin-left: 30rpx;
					font-weight: bold;
					margin-top: 30rpx;
				}
				.scheduleBox {
					display: flex;
					justify-content: space-between;
					width: 100%;
					padding-right: 80rpx;
					margin-top: 120rpx;
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
							color: #525252;
						}
					}
				}
				.scheduleBox1 {
					display: flex;
					justify-content: space-between;
					width: 100%;
					padding-right: 80rpx;
					margin-top: 40rpx;
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
							color: #525252;
						}
					}
				}
			}
		}
	}
	.footer-box {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 200rpx;
		width: 100%;
		background-color: #000;
		padding: 20rpx;
		.buy-box {
			display: flex;
			justify-content: center;
			flex-direction: row;
			align-items: center;
			width: 100%;
			height: 100rpx;
			background-color: #E1D3B6;
			color: #6E4A15;
			text-align: center;
			border-radius: 50rpx;
			margin: 10rpx auto auto auto;
			line-height: 100rpx;
			font-size: 28rpx;
			font-weight: bold;
			.buy-text {
				font-size: 40rpx
			}
			.buy-text1 {
				margin-left: 30rpx;
				.buy-text3 {
					font-size: 55rpx
				}
			}
		}
	}
}
::v-deep .u-checkbox__label {
	margin-right: 0 !important;
}
::v-deep .u-checkbox__icon-wrap--square {
	border-radius: 50% !important;
}
</style>
