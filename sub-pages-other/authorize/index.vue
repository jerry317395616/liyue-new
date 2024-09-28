<template>
	<view class="page">
		<view class="top-box">
			<image class="img1" src="@/static/images/material-item25.png" mode="widthFix"></image>
			<view class="login-box">
				<image class="img1" src="@/static/images/material-item26.png" mode="widthFix"></image>
				<view class="phone-btn" @click="phoneLogin">
					手机号安全登录
				</view>
				<view class="fast-btn" @click="fastLogin">
					<button class="custom-btn" open-type="getPhoneNumber" @getphonenumber="fastLogin">一键登录</button>
				</view>
			</view>
		</view>
		<view class="footer-box">
			<u-checkbox 
				v-model="item.checked" 
				v-for="(item, index) in items" :key="index" 
				:name="item.name"
			>
				<text style="color:#B6B6B6;font-size: 23rpx;">我已阅读并同意</text>
				<text style="color:#4A58B6;font-size: 23rpx;" @click.stop="goUserAgreement">《礼月用户协议》、</text>
				<text style="color:#4A58B6;font-size: 23rpx;" @click.stop="goPrivacy">《隐私协议》、</text>
				<text style="color:#4A58B6;font-size: 23rpx;" @click.stop="goPrivacy">《支付协议》</text>
			</u-checkbox>
		</view>
	</view>
</template>

<script>
	import { wechatRegister,wechatLogin } from "@/request/api/liYueApi.js";
	import config from "@/config/config.js"
	export default {
		data() {
			return {
				items: [{
					name: 'agreePrivacy',
					checked: false
				}]
			}
		},
		onReady() {
			
		},
		methods: {
			phoneLogin() {
				if (!this.items[0].checked) {
					this.$u.toast('请先同意《礼月用户协议》、《隐私协议》、《支付协议》');
					return;
				}
				this.go({
					url: '/sub-pages-other/authorize/phone-login',
					params: ''
				})
			},
			fastLogin(e) {
				if (!this.items[0].checked) {
					this.$u.toast('请先同意《礼月用户协议》、《隐私协议》、《支付协议》');
					return;
				}
				let accessCode = uni.getStorageSync('wechat_access_code')
				console.log(e, accessCode, '222')
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					uni.checkSession({
						success: (info) => {
							this.doReg(e.detail.encryptedData, e.detail.iv, accessCode)
						},
						fail: (info) => {
							this.$liyue.login("system", this.$liyue.goHome)
						}
					})
				}
			},
			doReg(encryptedData, iv, code) {
				console.log('来注册了', encryptedData, iv, code)
				wechatRegister({
					encryptedData: encryptedData,
					iv: iv,
					code: code
				}).then(response => {
					console.log("进入微信注册")
					uni.setStorageSync('user', res.data)
					this.$u.toast('注册成功，登录中');
					this.login()
				})
			},
			login() {
				uni.login({
					provider: "weixin",
					success: (response) => {
						uni.setStorageSync('wechat_access_code', response.code);
						wechatLogin({
							// 此处调用自己的登录接口
							code: response.code
						}).then(res => {
							console.log(res,'res')
							if (res && res.message && res.message.token != "") {
								uni.setStorageSync("token", res.message.token);
								uni.setStorageSync("user_id", res.message.user_id);
								uni.setStorageSync("wechat_access_code", res.message.session_key);
								this.$liyue.goHome()
							} else {
								uni.navigateTo({
									url: "/sub-pages-other/authorize/index"
								})
							}
						}).catch(err => {
							uni.showToast({
								title: "请进入微信小程序",
								icon: "none"
							})
						})
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title: err,
							icon: "none"
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.page {
	position: relative;
	background-color: #fff;
	height: 100vh;
	width: 100vw;
	padding: 60rpx 20rpx 20rpx 20rpx;
	.top-box {
		width: 100%;
		height: 1000rpx;
		background-color: #F1F0F0;
		border-radius: 30rpx;
		.img1 {
			width: 200rpx;
			padding-top: 135rpx;
			margin: auto;
		}
		.login-box {
			position: relative;
			width: 90%;
			// padding-top: 160rpx;
			margin: 160rpx auto auto auto;
			.img1 {
				width: 100%;
			}
			.phone-btn {
				position: absolute;
				left: 50%;
				top: 163rpx;
				transform: translateX(-50%);
				color: #fff;
				font-size: 30rpx;
			}
			.fast-btn {
				position: absolute;
				left: 50%;
				top: 250rpx;
				transform: translateX(-50%);
				color: #fff;
				font-size: 30rpx;
			}
		}
	}
	.footer-box {
		position: fixed;
		bottom: 60rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		padding: 0 20rpx;
	}
}
::v-deep .u-checkbox__label {
	margin-right: 0 !important;
}
::v-deep .u-checkbox__icon-wrap--square {
	border-radius: 50% !important;
}
::v-deep .custom-btn {
	background-color: #DE9F96;
	border-radius: none;
	box-sizing: border-box;
	color: #fff;
	border: none;
	font-size: 30rpx;
}
::v-deep .custom-btn::after {
	border: none;
	border-radius: none;
}
</style>