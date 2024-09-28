<template>
	<view class="page">
		<view class="border-box">
			因订单较多，祭祀当天完成，如遇风雪雷天恶劣自然天气，无法燃烧贡品等特殊情况，需耐心等待，关注结单通知。
		</view>
		<view class="my-order-title">
			<view class="order-title">
				订单详情
			</view>
			<view class="order-text1">
				订单号：3545674654757575
			</view>
			<view class="order-text2">
				下单时间：2024-08-04 18:03:27
			</view>
		</view>
		<view class="shop-list-box">
			<view class="shop-list-title">
				商品清单
			</view>
			<u-line color="#d9d9d9" />
			<view class="shop-content-box">
				<view class="shop-item">
					<view class="shop-left">
						<u-image class="img" width="100rpx" height="100rpx" mode="aspectFit" :src="img"></u-image>
						<view class="shop-name-box">
							<view class="shop-name">
								元宝
							</view>
							<view class="shop-price">
								¥6988.00
							</view>
						</view>
					</view>
					<view class="">
						数量： 1
					</view>
				</view>
				<view class="shop-item">
					<view class="shop-left">
						<u-image class="img" width="100rpx" height="100rpx" mode="aspectFit" :src="img"></u-image>
						<view class="shop-name-box">
							<view class="shop-name">
								元宝2
							</view>
							<view class="shop-price">
								¥6988.00
							</view>
						</view>
					</view>
					<view class="">
						数量： 1
					</view>
				</view>
				<u-line color="#d9d9d9" />
				<view class="order-count-list">
					<view class="shop-count">
						<view class="">
							代烧及环保处理
						</view>
						<view class="shop-price-total">
							￥88.00
						</view>
					</view>
					<view class="shop-count">
						<view class="">
							已享优惠VIP
						</view>
						<view class="shop-price-total">
							￥-88.00
						</view>
					</view>
					<view class="shop-count">
						<view class="">
							会员卡办理VIP
						</view>
						<view class="shop-price-total">
							￥88.00
						</view>
					</view>
				</view>
				<u-line color="#d9d9d9" />
				<view class="total-price">
					<view class="total-price-text">
						总计：
					</view>
					<view class="total-price-no">
						¥8176.00
					</view>
				</view>
			</view>
		</view>
		
		<view class="shop-address-box">
			<view class="shop-address-title">
				地址信息
			</view>
			<u-line color="#d9d9d9" />
			<view class="shop-content-box">
				<view class="address-name">
					<view class="address-name1">
						阳上人
					</view>
					<view class="address-name2">
						xxx
					</view>
				</view>
				<view class="address-name">
					<view class="address-name1">
						地址
					</view>
					<view class="address-name2">
						陕西省西安市雁塔区中华世纪城陕西省西安市雁塔区中华世纪城
					</view>
				</view>
				<view class="address-name">
					<view class="address-name1">
						已逝亲人姓名
					</view>
					<view class="address-name2">
						xxx
					</view>
				</view>
				<view class="address-name">
					<view class="address-name1">
						安葬地址
					</view>
					<view class="address-name2">
						陕西省西安市########################################
					</view>
				</view>
			</view>
		</view>
		
		<view class="shop-address-box">
			<view class="shop-address-title">
				支付方式
			</view>
			<u-line color="#d9d9d9" />
			<view class="shop-content-box">
				<view class="address-name">
					<view class="address-name1">
						<u-icon name="rmb-circle" size="60" />
					</view>
					<view class="address-name2">
						微信支付
					</view>
				</view>
			</view>
		</view>
		
		<!-- <view class="shop-address-box">
			<view class="shop-address-title">
				发票信息
			</view>
			<u-line color="#d9d9d9" />
			<view class="shop-content-box">
				<view class="address-name">
					<view class="address-name1">
						发票类型
					</view>
					<view class="address-name3">
						<view class="">
							不需要发票
						</view>
						<view class="invoice-desc">
							如需补开发票，请联系在线客服
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="order-footer">
			<view class="order-button" @click="cancelOrder">
				取消订单
			</view>
			<view class="order-button1">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: require('@/static/images/material-item11.png'),
			};
		},
		methods: {
			cancelOrder() {
				uni.showModal({
					title: '取消订单',
					content: '您确定要取消此订单吗？',
					success: res => {
						if (res.confirm) {
							// const params = {
							// 	ids: item.id
							// }
							// addressDel(params).then(res => {
							// 	if (res.data) {
							// 		this.$u.toast('删除成功');
							// 		this.getData();
							// 	}
							// })
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	padding-bottom: 200rpx;
	.border-box {
		margin: 20rpx 0;
		padding: 20rpx;
		font-size: 32rpx;
		background-color: #fff;
		font-weight: bold;
	}
	.my-order-title {
		width: 100%;
		color: #272727;
		font-size: 38rpx;
		background-color: #fff;
		padding: 0 20rpx 20rpx 20rpx;
		.order-title {
			padding: 60rpx 0;
			font-weight: bold;
		}
		.order-text1 {
			font-size: 28rpx;
			color: #A5A5A5;
		}
		.order-text2 {
			font-size: 28rpx;
			color: #A5A5A5;
			margin-top: 20rpx;
		}
	}
	.shop-list-box {
		margin-top: 20rpx;
		padding: 20rpx 0;
		background-color: #fff;
		.shop-list-title {
			font-size: 30rpx;
			font-weight: bold;
			padding: 0 20rpx 20rpx 20rpx;
		}
		.shop-content-box {
			padding: 0 20rpx;
			.shop-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				.shop-left {
					display: flex;
					justify-content: start;
					align-items: center;
					.shop-name-box {
						margin-left: 20rpx;
						.shop-name {
							font-weight: bold;
						}
						.shop-price {
							margin-top: 10rpx;
						}
					}
				}
			}
			.shop-item:nth-child(n+2) {
				border-top: 1rpx dashed #d9d9d9;
			}
			.order-count-list {
				padding: 20rpx 0 20rpx 0;
				.shop-count {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-weight: bold;
					.shop-price-total {
						
					}
				}
				.shop-count:nth-child(n+2) {
					margin-top: 10rpx;
				}
			}
			.total-price {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				margin: 30rpx 0 10rpx 0;
				.total-price-text {
					
				}
				.total-price-no {
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
	}
	.shop-address-box {
		margin-top: 20rpx;
		padding: 20rpx 0;
		background-color: #fff;
		.shop-address-title {
			font-size: 30rpx;
			font-weight: bold;
			padding: 0 20rpx 20rpx 20rpx;
		}
		.shop-content-box {
			padding: 30rpx 20rpx;
			.address-name {
				display: flex;
				justify-content: start;
				align-items: center;
				.address-name1 {
					color: #909090;
					width: 120rpx;
					min-width: 120rpx;
				}
				.address-name2 {
					margin-left: 20rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					word-wrap:break-word;
					word-break: break-all;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 6;
				}
				.address-name3 {
					.invoice-desc {
						color: #909090;
						margin-top: 10rpx;
					}
				}
			}
			.address-name:nth-child(n+2) {
				margin-top: 20rpx;
			}
		}
	}
	.order-footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 180rpx;
		width: 100%;
		background-color: #ededee;
		.order-button {
			padding: 15rpx 40rpx;
			background-color: #fff;
			color: #6A6C6D;
			border-radius: 30rpx;
		}
		.order-button1 {
			padding: 15rpx 40rpx;
			background-color: #232524;
			color: #bec2c0;
			border-radius: 30rpx;
		}
	}
}
</style>

