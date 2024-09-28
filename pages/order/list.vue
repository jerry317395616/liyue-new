<template>
	<view class="page">
		<u-tabs
			:list="list"
			:is-scroll="false"
			:current="current"
			@change="tabsChange"
			active-color="#000"
			inactive-color="#7F7F7F"
			bg-color="#F1F1F1"
		></u-tabs>
		<view class="my-order-box" v-for="(item, index) in orderList" :key="index">
			<view class="order-header">
				<view class="header-order-no">
					<text class="nember-text">订单编号{{item.orderNo}}</text>
				</view>
				<view class="">
					{{item.orderStatus}}
				</view>
			</view>
			<view class="order-middle">
				<view class="shop-img">
					<u-image class="img" width="150rpx" height="150rpx" mode="aspectFit" :src="img"></u-image>
					<u-image class="img" width="150rpx" height="150rpx" mode="aspectFit" :src="img"></u-image>
				</view>
				<view class="shop-order-count-box">
					<view class="shop-order-count-price">
						￥300
					</view>
					<view class="shop-order-count-unit">
						共3件
					</view>
				</view>
			</view>
			<view class="order-footer">
				<view class="order-footer-top">
					<view class="order-footer-text">
						{{item.orderDate}}
					</view>
				</view>
				<view class="order-footer-bottom" v-if="item.orderStatus == '等待付款'">
					<view class="order-button">
						祭祖视频
					</view>
					<view class="order-button1">
						再次祭祖
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
				}],
				list: [{
					name: '全部'
				}, {
					name: '待付款'
				}, {
					name: '进行中'
				}, {
					name: '已完成'
				}],
				current: 0
			};
		},
		methods: {
			tabsChange(index) {
				this.current = index;
			}
			// toOrderDetail(item) {
			// 	const params = {
			// 		id: ''
			// 	}
			// 	this.go({
			// 		url: '/order/order-detail/order-detail',
			// 		params: params
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
.page {
	padding: 20rpx;
	.my-order-box {
		margin-top: 20rpx;
		background-color: #fff;
		border-radius: 15rpx;
		.order-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 20rpx;
			.header-order-no {
				.nember-text {
					margin-left: 8rpx;
					font-weight: bold;
				}
			}
		}
		.order-middle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			.shop-img {
				display: flex;
				justify-content: start;
				align-items: center;
				.img:nth-child(n+2) {
					margin-left: 20rpx;
				}
			}
			.shop-order-count-box {
				.shop-order-count-price {
					font-weight: bold;
				}
				.shop-order-count-unit {
					margin-top: 5rpx;
					color: #9C9C9C;
				}
			}
		}
		.order-footer {
			padding: 30rpx 20rpx;
			.order-footer-top {
				font-size: 22rpx;
				.order-footer-text {
					color: #666666;
					margin-right: 20rpx;
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
					background-color: #fff;
					color: #000;
					border-radius: 30rpx;
					border: 1rpx solid #C8C6C6;
				}
				.order-button1 {
					padding: 15rpx 40rpx;
					background-color: #fff;
					color: #EAA051;
					border-radius: 30rpx;
					margin-left: 20rpx;
					border: 1rpx solid #F3C99C;
				}
			}
		}
	}
}
</style>
