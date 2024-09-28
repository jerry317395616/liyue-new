<template>
	<view class="page">
		<image class="img1" src="@/static/images/material-item25.png" mode="widthFix"></image>
		<view class="content">
			<u-form :model="user" ref="registerForm" :error-type="['border-bottom']">
				<u-row>
					<u-col span="12">
						<view style="padding-top: 30rpx;">
							<u-form-item prop="phone">
								<u-input v-model="user.phone" type="number" placeholder-style="color:#999"
									placeholder="请输入手机号" />
							</u-form-item>
						</view>
					</u-col>
				</u-row>
				<u-row>
					<u-col span="12">
						<u-form-item prop="code">
							<view style="float: left; width:70%;">
								<u-input v-model="user.code" class="input-font" type="number"
									placeholder-style="color:#999" placeholder="请输入手机验证码" />
							</view>
							<view style="float: left; width:30%;margin-top: 5rpx;">
								<u-toast ref="uToast"></u-toast>
								<u-verification-code :seconds="seconds" change-text="xs" ref="uCode"
									@start="codeStart" @end="codeEnd"
									@change="codeChange"></u-verification-code>
								<!-- <u-button @click="getCode" :hair-line="false" :type="codeBtnType" 
									size="medium" shape="circle" plain>{{tips}}</u-button> -->
									<view class="button-self" @click="getCode">
										{{tips}}
									</view>
							</view>
						</u-form-item>
					</u-col>
				</u-row>
			</u-form>
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
			<view class="bindButton" @click="doLogin">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import { wechatRegister,wechatLogin } from "@/request/api/liYueApi.js";
	export default {
		data() {
			return {
				user: {
					phone: null,
					code: null
				},
				seconds: 60,
				tips: '',
				codeBtnType: "primary",
				codeBtnStyle: {
					width: '100%',
					height: '60rpx',
					float: 'left',
					fontSize: '26rpx',
					fontWeight: 'Medium',
					color: '#8A8A8A',
					backGroundColor: '#fff'
				},
				items: [{
					name: 'agreePrivacy',
					checked: false
				}]
			};
		},
		onReady() {
			this.$refs.registerForm.setRules(this.rules);
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			codeStart() {
				this.codeBtnType = "info"
				this.codeBtnStyle = {
					width: "180rpx",
					height: "60rpx",
					color: "#999"
				}
			},
			codeEnd() {
				this.codeBtnType = "error"
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					if (this.$u.test.mobile(this.user.phone)) {
						uni.showLoading({
							title: '正在获取验证码'
						})
						let param = {
							phone: this.user.phone
						}
						sendCode(param).then(res => {
							uni.hideLoading();
							this.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						})
					} else {
						this.$u.toast('手机号码输入有误');
					}
				}
			},
			doLogin() {
				console.log('注册')
				if (!this.items[0].checked) {
					this.$u.toast('请先同意《礼月用户协议》、《隐私协议》、《支付协议》');
					return;
				}
				this.$refs.registerForm.validate(valid => {
					if (!this.$u.test.mobile(this.user.phone)) {
						this.$u.toast('手机号码输入有误');
						return;
					}
					if (!this.user.code) {
						this.$u.toast('请输入验证码');
						return;
					}
					if (valid) {
						const params = {
							phone: this.user.phone,
							code: this.user.code,
							wx_openid: uni.getStorageSync('openId'),
							fields: JSON.stringify(["*"])
						}
						wechatRegister(params).then(res => {
							console.log(res, 'res')
							uni.setStorageSync('user', res.data)
							this.$u.toast('注册成功，登录中');
							this.login()
						})
					}
				});
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
	background-color: #fff;
	height: 100vh;
	width: 100vw;
	.img1 {
		width: 200rpx;
		padding-top: 135rpx;
		margin: auto;
	}
	.content {
		padding: 80rpx 40rpx 30rpx 40rpx;
		background-color: #F5F5F5;
		.button-self {
			width: 100%;
			height: 60rpx;
			float: left;
			font-size: 28rpx;
			color: #8E8E8E;
		}
		.bindButton {
			width: 90%;
			height: 80rpx;
			background-color: #DE9F96;
			border-radius: 40rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
			margin: 0 auto;
		}
		.footer-box {
			// position: fixed;
			// bottom: 60rpx;
			// left: 50%;
			// transform: translateX(-50%);
			width: 100%;
			padding: 40rpx 0 20rpx 0;
		}
	}
}
::v-deep .u-size-medium {
	padding: 0 20rpx !important;
}
::v-deep .u-btn--primary--plain {
	color: #868686 !important;
	border-color: #fff !important;
	background-color: #fff !important;
}
::v-deep .u-checkbox__label {
	margin-right: 0 !important;
}
::v-deep .u-checkbox__icon-wrap--square {
	border-radius: 50% !important;
	margin-top: -48rpx !important;
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
