<template>
	<view class="page">
		<view class="my-order-title">
			我的订单
		</view>
		<view class="my-order-box" v-for="(item, index) in orderList" :key="index">
			<view class="order-header">
				<view class="header-order-no">
					<u-icon name="order" size="30" />
					<text class="nember-text">{{item.orderNo}}</text>
				</view>
				<view class="">
					{{item.orderStatus}}
				</view>
			</view>
			<u-line color="#d9d9d9" />
			<view class="order-middle">
				<view class="shop-img">
					<u-image class="img" width="100rpx" height="100rpx" mode="aspectFit" :src="img"></u-image>
					<u-image class="img" width="100rpx" height="100rpx" mode="aspectFit" :src="img"></u-image>
				</view>
			</view>
			<u-line color="#d9d9d9" />
			<view class="order-footer">
				<view class="order-footer-top">
					<view class="order-footer-text">
						{{item.orderDate}}
					</view>
					<view class="order-footer-text">
						共 {{item.count}} 件商品
					</view>
					<view class="order-footer-text1">
						合计：
					</view>
					<view class="order-footer-text2">
						￥{{item.price}}
					</view>
				</view>
				<view class="order-footer-bottom" v-if="item.orderStatus == '等待付款'">
					<view class="order-button">
						立即支付
					</view>
					<view class="order-button1" @click="toOrderDetail(item)">
						查看详情
					</view>
				</view>
			</view>
		</view>
		<u-empty v-if="orderList.length <= 0" mode="order" margin-top="100"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: require('@/static/images/material-item11.png'),
				orderList: [{
					orderNo: '0466575746464',
					orderStatus: '等待付款',
					orderDate: '2024-08-06',
					count: 2,
					price: 888.00
				},
				{
					orderNo: '0466575746464',
					orderStatus: '已支付',
					orderDate: '2024-08-06',
					count: 2,
					price: 888.00
				}]
			};
		},
		methods: {
			toOrderDetail(item) {
				const params = {
					id: ''
				}
				this.go({
					url: '/order/order-detail/order-detail',
					params: params
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	padding-bottom: 200rpx;
	.my-order-title {
		width: 100%;
		height: 160rpx;
		color: #272727;
		font-size: 38rpx;
		font-weight: bold;
		background-color: #fff;
		line-height: 160rpx;
		padding: 0 20rpx;
	}
	.my-order-box {
		margin-top: 20rpx;
		background-color: #fff;
		.order-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 20rpx;
			.header-order-no {
				.nember-text {
					color: #7A7A7A;
					margin-left: 8rpx;
				}
			}
		}
		.order-middle {
			padding: 30rpx 20rpx;
			.shop-img {
				display: flex;
				justify-content: start;
				align-items: center;
				.img:nth-child(n+2) {
					margin-left: 20rpx;
				}
			}
		}
		.order-footer {
			padding: 30rpx 20rpx;
			.order-footer-top {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 22rpx;
				.order-footer-text {
					color: #666666;
					margin-right: 20rpx;
				}
				.order-footer-text1 {
					color: #666666;
				}
				.order-footer-text2 {
					font-size: 26rpx;
					font-weight: bold;
				}
			}
			.order-footer-bottom {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 24rpx;
				margin-top: 30rpx;
				.order-button {
					padding: 15rpx 40rpx;
					background-color: #232524;
					color: #bec2c0;
					border-radius: 30rpx;
				}
				.order-button1 {
					padding: 15rpx 40rpx;
					background-color: #F1F1F1;
					color: #303133;
					border-radius: 30rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
}
</style>
