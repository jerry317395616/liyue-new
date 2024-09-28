<template>
	<view class="page">
		<u-form :model="form" ref="uForm" :label-width="180">
			<view class="expressage-text">
				寄：
			</view>
			<view class="form-item-box">
				<u-form-item label="阳上人" prop="deceased_person_name" required>
					<u-input v-model.trim="form.deceased_person_name" placeholder="如果多人姓名请用“*”号隔开" />
				</u-form-item>
				<u-form-item label="地址" prop="address" required>
					<u-input type="textarea" v-model="form.address" placeholder="请精确到市区" autoHeight />
				</u-form-item>
			</view>
			<view class="expressage-text">
				收：
			</view>
			<view class="form-item-box">
				<u-form-item label="已逝亲人" prop="name_of_deceased_relative" required>
					<u-input v-model.trim="form.name_of_deceased_relative" placeholder="如爷爷张宝宝" />
				</u-form-item>
				<u-form-item label="安葬地址" prop="burial_address" required>
					<u-input type="textarea" v-model="form.burial_address" placeholder="请尽量填写精确地址" autoHeight />
				</u-form-item>
			</view>
		</u-form>
		<view class="addSite" @click="save">
			确&nbsp;&nbsp;&nbsp;&nbsp;定
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo,
		saveDocs
	} from "@/request/api/liYueApi.js";
	export default {
		data() {
			return {
				pickerType: '',
				show: false,
				form: {
					deceased_person_name: '',
					address: '',
					name_of_deceased_relative: '',
					burial_address: ''
				},
				rules: {
					deceased_person_name: [{
						required: true,
						message: '请输入阳上人',
						trigger: ['change', 'blur'],
					}],
					address: [{
						required: true,
						message: '请输入地址',
						trigger: ['change', 'blur'],
					}],
					name_of_deceased_relative: [{
						required: true,
						message: '请输入已逝亲人',
						trigger: ['change', 'blur'],
					}],
					burial_address: [{
						required: true,
						message: '请输入安葬地址',
						trigger: ['change', 'blur'],
					}],
				},
				addrList: {},
				paramsData: {}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		onLoad(params) {
			console.log(JSON.parse(JSON.stringify(params)), 'params===>')
			if (params.deceased_person_name) {
				this.form = params
				this.paramsData = params
			}
			this.getUserInfoFn()
		},
		methods: {
			showRegionPicker(type) {
				this.pickerType = type
				this.show = true;
			},
			getUserInfoFn() {
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
					this.addrList = res.docs[0]
					console.log(this.addrList, 'this.addrList')
				})
			},
			save() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if (this.form.deceased_person_name.length > 40 || this.form.deceased_person_name.length <
							2) {
							this.$u.toast('阳上人输入格式有误，请输入2~40位汉字或字母');
							return;
						}
						if (this.form.name_of_deceased_relative.length > 40 || this.form.name_of_deceased_relative
							.length < 2) {
							this.$u.toast('已逝亲人输入格式有误，请输入2~40位汉字或字母');
							return;
						}
						console.log(this.form, 'this.form')
						if (this.paramsData && this.paramsData.idx) {
							this.addrList.address.forEach(item => {
								if (this.paramsData.idx == item.idx) {
									item.deceased_person_name = this.form.deceased_person_name
									item.address = this.form.address
									item.name_of_deceased_relative = this.form.name_of_deceased_relative
									item.burial_address = this.form.burial_address
								}
							})
						} else {
							this.addrList.address.push({
								...this.addrList.address[this.addrList.address.length - 1]
							})
							console.log(this.addrList.address, 'this.addrList.address')
							this.addrList.address[this.addrList.address.length - 1].deceased_person_name = this.form
								.deceased_person_name
							this.addrList.address[this.addrList.address.length - 1].address = this.form.address
							this.addrList.address[this.addrList.address.length - 1].name_of_deceased_relative = this
								.form.name_of_deceased_relative
							this.addrList.address[this.addrList.address.length - 1].burial_address = this.form
								.burial_address
							this.addrList.address[this.addrList.address.length - 1].__unedited = false
							this.addrList.address[this.addrList.address.length - 1].__unsaved = 1
							this.addrList.address[this.addrList.address.length - 1].__islocal = 1
							this.addrList.address[this.addrList.address.length - 1].creation = null
							this.addrList.address[this.addrList.address.length - 1].modified = null
							this.addrList.address[this.addrList.address.length - 1].name = 'new-ly-address-' + this.$liyue.generateRandomString()
							this.addrList.address[this.addrList.address.length - 1].idx = this.addrList.address[this
								.addrList.address.length - 1].idx + 1
						}
						console.log(this.addrList.address, 'this.addrList.address111')
						const params = {
							doc: JSON.stringify(this.addrList),
							action: 'Save'
						}
						saveDocs(params).then(res => {
							console.log(res, '保存地址')
							if (res.docinfo.name) {
								this.$u.toast('保存成功');
								uni.$emit('feteAddress', this.form)
								uni.navigateBack({
									delta: 1
								});
								// uni.switchTab({
								// 	url: "/pages/fete/index"
								// })
							} else {

							}
						})
					} else {
						console.log('验证失败');
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page {
		padding-bottom: 160rpx;

		.form-item-box {
			background-color: #fff;
			padding: 20rpx 20rpx 20rpx 40rpx;

			// border-radius: 16rpx;
			.default-address-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}

		// .form-item-box:nth-child(n+1) {
		// 	margin-top: 20rpx;
		// }

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
		}

		.expressage-text {
			margin: 20rpx 0 20rpx 20rpx;
			font-size: 32rpx;
			font-weight: bold;
		}
	}
</style>