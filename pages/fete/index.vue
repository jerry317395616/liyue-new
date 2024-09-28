<template>
	<view class="page">
		<view class="all-shop-list" v-for="(item, index) in allShopList" :key="index">
			<view class="header-box">
				<view class="image1">
					<image src="@/static/images/material-item2.png" mode="heightFix"></image>
				</view>
				<view class="image2">
					<image src="@/static/images/material-item3.png" mode="heightFix"></image>
					<view class="content-box" @click="selectAddr">
						<!-- <view class="field-row">
							<text class="field-label">阳上人:</text>
							<text class="field-value" v-if="address.deceased_person_name">{{address.deceased_person_name}}</text>
							<text class="field-value1" v-else>(如果多人姓名请用“*”号隔开)</text>
						</view> -->
						<!-- <view class="field-row">
							<text class="field-label">地址:</text>
							<text class="field-value" v-if="address.address">{{address.address}}</text>
							<text class="field-value1" v-else>(请精确到市区)</text>
						</view> -->
						<view class="form-item">
							<view class="form-label">阳上人：</view>
							<u-input v-model="item.deceased_person_name" placeholder="如果多人姓名请用“*”号隔开" />
						</view>
						<view class="form-item">
							<view class="form-label">地址：</view>
							<u-input v-model="item.address" placeholder="请精确到市区" />
						</view>
					</view>
					
					<view class="footer-box" @click="selectAddr">
						<!-- <view class="field-row">
							<text class="field-label">已逝亲人姓名:</text>
							<text class="field-value" v-if="address.name_of_deceased_relative">{{address.name_of_deceased_relative}}</text>
							<text class="field-value1" v-else>(如爷爷张宝宝)</text>
						</view>
						<view class="field-row">
							<text class="field-label">安葬地址:</text>
							<text class="field-value" v-if="address.burial_address">{{address.burial_address}}</text>
							<text class="field-value1" v-else>(请尽量填写精确地址)</text>
						</view> -->
						<view class="form-item">
							<view class="form-label">已逝亲人：</view>
							<u-input v-model="address.address.name_of_deceased_relative" placeholder="如爷爷张宝宝" />
						</view>
						<view class="form-item">
							<view class="form-label">安葬地址：</view>
							<u-input v-model="address.burial_address" placeholder="请尽量填写精确地址" />
						</view>
					</view>
				</view>
			</view>
			
			<view class="shop-box">
				<view class="tabs">
					<view v-for="(tab, index1) in tabs" :key="index1" class="tab-wrapper">
						<view 
							:class="['tab-item', { active: selectedTab === index }]"
							@click="selectTab(index)">
							{{ tab }}
						</view>
						<!-- 在最后一个tab之后不显示分隔符 -->
						<text v-if="index < tabs.length - 1" class="divider">|</text>
					</view>
				</view>
				<scroll-view
				  class="scroll-container"
				  scroll-x="true"
				  scroll-with-animation
				  show-scrollbar="false"
				>
				  <view class="grid-container">
				    <view class="grid-item" v-for="(item2, index2) in shopList" :key="index2">
				      <image class="img" :src="item2.shopImg" mode="aspectFill"></image>
				      <view class="grid-name">
				        <view class="grid-name-text">{{ item2.item_name }}</view>
				        <view class="grid-name-text">
				          <u-number-box
				            v-model="item2.num"
				            :min="0"
				            :max="9999"
				            size="20"
				            bg-color="#fff"
				            input-width="50"
				          ></u-number-box>
				        </view>
				      </view>
				      <view class="grid-name1">
				        <view class="grid-name-text1">单价{{ item2.item_name }}</view>
				        <view class="grid-name-text2">会员价{{ item2.item_name }}</view>
				      </view>
				    </view>
				  </view>
				</scroll-view>
			
				<!-- <view class="grid-container">
					<view class="grid-item" v-for="(item,index) in shopList" :key="index">
						<image class="img" :src="item.shopImg" mode="aspectFill"></image>
						<view class="grid-name">
							<view class="grid-name-text">{{item.item_name}}</view>
							<view class="grid-name-text">
								<u-number-box
									v-model="item.num"
									:min="0"
									:max="9999"
									size="20"
									bg-color="#fff"
									input-width="50"
								></u-number-box>
							</view>
						</view>
						<view class="grid-name1">
							<view class="grid-name-text1">单价{{item.item_name}}</view>
							<view class="grid-name-text2">会员价{{item.item_name}}</view>
						</view>
					</view>
				</view> -->
			</view>
			<view class="line-box" v-if="allShopList.length >= 2 && index != allShopList.length-1">
				<u-line color="#242423"></u-line>
			</view>
		</view>
		
		<view class="order-create">
			<view class="order-button-item" @click="toTownGod">
				继续添加表文
			</view>
			<view class="order-button-item" @click="toCreateOrder">
				生成表文转入订单
			</view>
		</view>
		
		<u-popup v-model="addressShow" mode="bottom" closeable border-radius="15">
			<view class="popup-box">
				<view class="popup-title">
					请选择地址
				</view>
				<view class="item-box">
					<template v-if="addrList.length > 0">
						<view class="item" v-for="(res, index) in addrList" :key="index">
							<view class="flex">
								<view class="top" @click="selectCurrentAddress(res)">
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
								<view class="bottom" @click="editAdddress(res)">
									<u-icon name="edit-pen" :size="40" color="#999999"></u-icon>
								</view>
							</view>
						</view>
					</template>
					<template v-else>
						<u-empty mode="address"></u-empty>
					</template>
				</view>
			</view>
			<view class="addSite" @click="toAddSite">
				<u-icon name="plus" color="#bec2c0" class="icon" :size="30"></u-icon>新增地址
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { getItem, getUserInfo } from "@/request/api/liYueApi.js";
	import config from "@/config/config.js"
	export default {
		data() {
			return {
				tabs: ['常用品', '其他'], // 替换为你的Tab名称
				selectedTab: 0, // 初始选中的Tab
				address: {},
				shopList: [],
				addressShow: false,
				addrList: [],
				allShopList: [{
					deceased_person_name: '',
					address: '',
					name_of_deceased_relative: '',
					burial_address: '',
					shopList: []
				}]
			};
		},
		onLoad() {
			this.getShopList()
			this.deceased_person_name()
		},
		onShow() {
			// this.$nextTick(() => {
			// 	uni.$on('feteAddress', (params) => {
			// 		console.log('收到数据',params)
			// 		if (params && params.deceased_person_name) {
			// 			this.address = params
			// 			this.deceased_person_name()
			// 		}
			// 	});
			// })
		},
		methods: {
			getShopList() {
				const params = {
					filters: JSON.stringify([["category", "=", "商品-常用品"]]),
					fields: JSON.stringify(["*"])
				}
				getItem(params).then(res => {
					console.log(res, '商品')
					this.shopList = res.data
					this.shopList.forEach(item => {
						item.shopImg = config.img + item.image
						item.num = 0
					})
				})
			},
			getShopList1() {
				const params = {
					filters: JSON.stringify([["category", "=", "商品-其他"]]),
					fields: JSON.stringify(["*"])
				}
				getItem(params).then(res => {
					console.log(res, '商品')
					this.shopList = res.data
					this.shopList.forEach(item => {
						item.shopImg = config.img + item.image
						item.num = 0
					})
				})
			},
			deceased_person_name() {
				const user = uni.getStorageSync('user')
				const params = {
					doctype: 'Ly User',
					name: user.name,
					filters: [["Ly User","user_name","=",user.name]]
				}
				getUserInfo(params).then(res => {
					console.log(res, 'userinfo')
					this.addrList = res.docs[0].address
				})
			},
			toTownGod() {
				// this.go({
				// 	url: '/shop/town-god-text/index',
				// 	params: ''
				// })
				this.allShopList.push({
					deceased_person_name: '',
					address: '',
					name_of_deceased_relative: '',
					burial_address: '',
					shopList: this.shopList
				})
			},
			selectTab(index) {
				console.log(index, 'index')
				this.selectedTab = index;
				if (index == 0) {
					this.getShopList()
				} else if (index == 1) {
					this.getShopList1()
				}
			},
			selectAddr() {
				this.addressShow = !this.addressShow
			},
			toAddSite(){
				this.selectAddr()
				this.go({
					url: '/person/address/index'
				})
			},
			toCreateOrder() {
				// this.go({
				// 	url: '/order/order-detail/order-detail',
				// 	params: ''
				// })
				this.go({
					url: '/shop/town-god-text/index',
					params: ''
				})
			},
			editAdddress(item) {
				this.go({
					url: '/person/address/index',
					params: item
				})
			},
			selectCurrentAddress(item) {
				console.log(item, 'item')
				this.address = item
				this.addressShow = !this.addressShow
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	background-color: #F3F1E3;
	padding: 20rpx;
	.all-shop-list {
		.header-box {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			border: 1rpx solid #DFDFDF;
			border-radius: 15rpx;
			background-color: #fff;
			padding: 10rpx;
		
			.image1 {
				height: 234.45px;
			}
		
			.image2 {
				position: relative;
				height: 234.45px;
		
				.content-box {
					position: absolute;
					left: 10rpx;
					top: 30rpx;
					width: 73%;
					// display: flex;
					// flex-direction: column;
					// gap: 5rpx; // 增加字段之间的间距
					
					.form-item {
						display: flex;
						justify-content: start;
						align-items: center;
						flex-wrap: nowrap;
						height: 60rpx;
						.form-label {
							width: 120rpx;
							min-width: 120rpx;
						}
					}
					// .field-row {
					// 	display: flex;  // 使用flex布局
					// 	align-items: flex-start;
					// 	.field-label {
					// 		font-weight: bold;
					// 		text-align: left;  // 文字左对齐
					// 		margin-right: 20rpx;  // 增加label和value之间的间距
					// 	}
		
					// 	.field-value {
					// 		flex: 1;  // 占据剩余空间
					// 		// word-wrap: break-word;  // 自动换行
					// 		overflow: hidden;
					// 		text-overflow: ellipsis;
					// 		display: -webkit-box;
					// 		word-wrap:break-word; // 数字以及字母处理
					// 		word-break: break-all; // 纯数字或纯字母不会自动换行
					// 		-webkit-box-orient: vertical;
					// 		-webkit-line-clamp: 2;   //  显示2行
					// 	}
						
					// 	.field-value1 {
					// 		flex: 1;  // 占据剩余空间
					// 		word-wrap: break-word;  // 自动换行
					// 		color: #AAAAAA;
					// 		font-size: 24rpx;
					// 	}
					// }
				}
				.footer-box {
					position: absolute;
					bottom: 30rpx;
					right: 0;
					width: 73%;
					// display: flex;
					// flex-direction: column;
					// gap: 5rpx; // 增加字段之间的间距
					.form-item {
						display: flex;
						justify-content: start;
						align-items: center;
						flex-wrap: nowrap;
						height: 60rpx;
						.form-label {
							width: 150rpx;
							min-width: 150rpx;
						}
					}
					// .field-row {
					// 	display: flex;  // 使用flex布局
					// 	align-items: flex-start;
					// 	.field-label {
					// 		font-weight: bold;
					// 		text-align: left;  // 文字左对齐
					// 		margin-right: 20rpx;  // 增加label和value之间的间距
					// 	}
					
					// 	.field-value {
					// 		flex: 1;  // 占据剩余空间
					// 		// word-wrap: break-word;  // 自动换行
					// 		overflow: hidden;
					// 		text-overflow: ellipsis;
					// 		display: -webkit-box;
					// 		word-wrap:break-word; // 数字以及字母处理
					// 		word-break: break-all; // 纯数字或纯字母不会自动换行
					// 		-webkit-box-orient: vertical;
					// 		-webkit-line-clamp: 2;   //  显示2行
					// 	}
						
					// 	.field-value1 {
					// 		flex: 1;  // 占据剩余空间
					// 		word-wrap: break-word;  // 自动换行
					// 		color: #AAAAAA;
					// 		font-size: 24rpx;
					// 	}
					// }
				}
			}
		}
		
		.shop-box {
			overflow: hidden;
			.tabs {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 30rpx 0 30rpx 0;
				.tab-wrapper {
					display: flex;
					align-items: center;
					.tab-item {
						font-size: 30rpx;
						// padding: 10rpx 20rpx;
						color: #090909;
						position: relative;
						cursor: pointer;
					}
					
					.divider {
						margin: 0 10rpx;
						color: #444443;
					}
					
					.tab-item.active {
						font-weight: bold;
					}
				}
			}
			.scroll-container {
			  width: 100%; /* 确保 scroll-view 宽度占满整个屏幕 */
			  overflow-x: scroll;
			  white-space: nowrap; /* 强制让子元素不换行，支持横向滚动 */
			}
			
			.grid-container {
			  display: grid;
			  grid-template-columns: repeat(auto-fill, 340rpx); /* 自动填充列 */
			  grid-template-rows: repeat(2, auto); /* 两行布局 */
			  grid-auto-flow: column; /* 横向排列 */
			  gap: 20rpx; /* 项目之间的间距 */
			  width: max-content; /* 容器宽度根据内容自适应，避免超出时无法滑动 */
			  
			  .grid-item {
			    border-radius: 15rpx;
			    overflow: hidden;
			    border: 1rpx solid #9b9ca2;
			    background-color: #fff;
			
			    .img {
			      width: 340rpx;
			      height: 200rpx;
			    }
			
			    .grid-name {
			      display: flex;
			      justify-content: space-between;
			      align-items: center;
			      padding: 20rpx;
			
			      .grid-name-text {
			        font-weight: bold;
			      }
			    }
			
			    .grid-name1 {
			      display: flex;
			      justify-content: space-between;
			      align-items: center;
			      padding: 0 20rpx 20rpx 20rpx;
			
			      .grid-name-text1 {
			        font-size: 20rpx;
			      }
			
			      .grid-name-text2 {
			        color: #e64545;
			        font-size: 20rpx;
			      }
			    }
			  }
			}
			// .grid-container {
			// 	display: grid;
			// 	grid-template-columns: repeat(2, 340rpx); /* 每行三个固定宽度的列 */
			// 	gap: 20rpx; /* 元素之间的间距 */
			// 	width: 100%; /* 容器宽度为 100% */
			// 	justify-content: space-between;
			// 	.grid-item {
			// 		border-radius: 15rpx;
			// 		overflow: hidden;
			// 		border: 1rpx solid #9B9CA2;
			// 		background-color: #fff;
			// 		.img {
			// 			width: 340rpx;
			// 			height: 200rpx;
			// 			// height: 100%;
			// 		}
			// 		.grid-name {
			// 			display: flex;
			// 			justify-content: space-between;
			// 			align-items: center;
			// 			padding: 20rpx 20rpx 20rpx 20rpx;
			// 			.grid-name-text {
			// 				font-weight: bold;
			// 			}
			// 		}
			// 		.grid-name1 {
			// 			display: flex;
			// 			justify-content: space-between;
			// 			align-items: center;
			// 			padding: 0 20rpx 20rpx 20rpx;
			// 			.grid-name-text1 {
			// 				font-size: 20rpx;
			// 			}
			// 			.grid-name-text2 {
			// 				color: #E64545;
			// 				font-size: 20rpx;
			// 			}
			// 		}
			// 	}
			// }
		}
		.line-box {
			margin: 20rpx 0;
		}
	}
	
	.order-create {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
		.order-button-item {
			width: 45%;
			padding: 20rpx 0;
			border: 1rpx solid #DDDDDC;
			background-color: #fff;
			border-radius: 15rpx;
			text-align: center;
			font-weight: bold;
		}
	}
	
	.popup-box {
		background: #F0F0F6;
		.popup-title {
			text-align: center;
			font-size: 28rpx;
			font-weight: bold;
			padding: 30rpx 0;
			background-color: #fff;
			margin: auto;
		}
		.item-box {
			height: 600rpx;
			overflow-y: scroll;
			.item {
				padding: 20rpx;
				background-color: #fff;
				.flex {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.top {
						font-size: 34rpx;
						width: 100%;
						.top-flex {
							display: flex;
							flex-direction: column;
							.site {
								font-size: 28rpx;
								color: #999999;
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
		}
	}
	.addSite {
		display: flex;
		justify-content: center;
		width: 600rpx;
		background-color: #232524;
		border-radius: 60rpx;
		font-size: 30rpx;
		color: #bec2c0;
		padding: 15rpx 40rpx;
		margin: 60rpx auto 20rpx;
	}
}

</style>
