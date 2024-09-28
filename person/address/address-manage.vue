<template>
	<view class="page">
		<view class="item" v-for="(res, index) in addrList" :key="index">
			<view class="flex" @click="editAdddress(res)">
				<view class="top">
					<view class="top-flex">
						<view class="site">
							阳上人：{{res.deceased_person_name}}
						</view>
						<view class="site">
							地址：{{res.address}}
						</view>
						<view class="site">
							已逝亲人姓名：{{res.name_of_deceased_relative}}
						</view>
						<view class="site">
							安葬地址：{{res.burial_address}}
						</view>
					</view>
				</view>
				<view class="bottom">
					<u-icon name="edit-pen" :size="40" color="#999999"></u-icon>
				</view>
			</view>
		</view>
		<view class="addSite" @click="toAddSite">
			<view class="add">
				<u-icon name="plus" color="#bec2c0" class="icon" :size="30"></u-icon>新增地址
			</view>
		</view>
		<u-empty v-if="addrList.length <= 0" mode="address"></u-empty>
	</view>
</template>

<script>
	import {
		getItem,
		getUserInfo
	} from "@/request/api/liYueApi.js";
	import config from "@/config/config.js"
	export default {
		data() {
			return {
				addrList: []
			};
		},
		onLoad() {
			this.deceased_person_name()
		},
		onShow() {
			this.$nextTick(() => {
				uni.$on('feteAddress', (params) => {
					console.log('收到数据',params)
					if (params && params.deceased_person_name) {
						this.address = params
						this.deceased_person_name()
					}
				});
			})
		},
		methods: {
			deceased_person_name() {
				const user = uni.getStorageSync('user')
				const params = {
					doctype: 'Ly User',
					name: user.name,
					filters: [
						["Ly User", "user_name", "=", user.name]
					]
				}
				getUserInfo(params).then(res => {
					console.log(res, 'userinfo')
					this.addrList = res.docs[0].address
				})
			},
			toAddSite() {
				this.go({
					url: '/person/address/index'
				})
			},
			editAdddress(item) {
				console.log(item, 'item')
				this.go({
					url: '/person/address/index',
					params: item
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 30rpx;

		.item {
			padding: 20rpx;
			background-color: #fff;
			border-radius: 15rpx;

			.flex {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.top {
					font-size: 34rpx;

					.top-flex {
						display: flex;
						flex-direction: column;

						.site {
							font-size: 28rpx;
							// color: #999999;
						}

						.site:nth-child(n+2) {
							margin-top: 20rpx;
						}
					}

				}

				.bottom {
					min-width: 80rpx;
					margin-top: 20rpx;
					font-size: 28rpx;
					color: #999999;
					text-align: center;
				}
			}
		}

		.item:nth-child(n+1) {
			margin-top: 20rpx;
		}

		.addSite {
			display: flex;
			justify-content: space-around;
			width: 600rpx;
			background-color: #232524;
			border-radius: 60rpx;
			font-size: 30rpx;
			color: #bec2c0;
			padding: 15rpx 40rpx;
			margin: 60rpx auto 20rpx;
			position: absolute;
			bottom: 60rpx;
			left: 80rpx;
			.add {
				display: flex;
				align-items: center;
				color: #ffffff;

				.icon {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>