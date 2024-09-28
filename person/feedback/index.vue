<template>
	<view class="page">
		<view class="feedback-box">
			<view class="feedback-text">
				<u-form-item required label="意见或建议"></u-form-item>
			</view>
			<view class="">
				<u-input v-model="feedback" type="textarea" clearable height="300" maxlength="200" auto-height :custom-style="customStyle" />
			</view>
		</view>
		<view class="photo">
			<u-form-item label="上传照片(最多四张)"></u-form-item>
			<liyue-upload :uploadParams="uploadParams" @success="uploadSucess"></liyue-upload>
		</view>
		<view class="email">
			请留下您的手机号或邮箱，方便我们联系您。
		</view>
		<view class="phone-box">
			<u-form-item label="电话/邮箱"></u-form-item>
			<u-input v-model="phone" clearable maxlength="20" placeholder="请输入电话/邮箱" />
		</view>
		<view class="order-footer-bottom" @click="save">
			<view class="order-button">
				提&nbsp;&nbsp;&nbsp;&nbsp;交
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo,
		saveDocs,
		postDocType,
		putDocType
	} from "@/request/api/liYueApi.js";
	export default {
		data() {
			return {
				customStyle: {
					backgroundcolor: '#fff'
				},
				feedback: '',
				phone: '',
				uploadParams: {
				  limit: 4, // 设置默认图片上传限制
				  is_private: 0,
				  doctype: 'Ly Feedback',
				  docname: '',
				  folder: 'Home',
				  fieldname: 'feedback_img',
				  optimize: true,
				},
				docs: {},
				imgList: [],
				currentNameId: '',
				idx: undefined
			};
		},
		onLoad() {
			this.uploadParams.docname = 'new-ly-feedback-' + this.$liyue.generateRandomString()
			this.getUserInfoFn()
		},
		methods: {
			uploadSucess(e) {
				console.log(e, '图片')
				this.imgList = e
				if (this.imgList.length <= 1) {
					this.uploadParams.folder = 'Home'
					this.postDocType1()
				}
			},
			postDocType1() {
				const obj = {
					docstatus: 0,
					doctype: 'Ly Feedback',
					name: this.uploadParams.docname,
					__islocal: 1,
					__unsaved: 1,
					owner: this.docs.owner,
					feedback_img: this.imgList && this.imgList[0] && this.imgList[0].file_url || null
				}
				const params = {
					doc: JSON.stringify(obj),
					action: 'Save'
				}
				saveDocs(params).then(res => {
					console.log(res, '第一次保存图片')
					this.uploadParams.docname = res.docs[0].name
					this.uploadParams.folder = 'Home/Attachments'
					this.idx = res.docs[0].idx
					console.log(this.uploadParams.docname, 'this.uploadParams.docname')
				})
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
					this.docs = res.docs[0]
					delete this.docs.address
					console.log(this.docs, 'this.docs')
				})
			},
			save() {
				const obj = {
					name: this.uploadParams.docname,
					owner: this.docs.owner,
					modified_by: this.docs.modified_by,
					feedback_text: this.feedback,
					feedback_img: this.imgList && this.imgList[0] && this.imgList[0].file_url || null,
					feedback_email: this.phone,
					doctype: this.uploadParams.doctype,
					docstatus: 0,
					__unsaved: 1,
					__islocal: 1
					// idx: this.idx
				}
				const params = {
					doc: JSON.stringify(obj),
					action: 'Save'
				}
				saveDocs(params).then(res => {
					console.log(res, '保存地址')
					if (res.docs[0].name) {
						this.$u.toast('感谢您的反馈，我们会尽快解决');
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1500)
					} else {
				
					}
				})
				// if (this.uploadParams.docname.startsWith("new")) {
				// 	postDocType('Ly Feedback',params).then(res => {
				// 		console.log(res, '保存地址')
				// 		if (res.data.name) {
				// 			this.$u.toast('反馈成功');
				// 			setTimeout(() => {
				// 				uni.navigateBack({
				// 					delta: 1
				// 				});
				// 			}, 1500)
				// 		} else {
					
				// 		}
				// 	})
				// } else {
				// 	putDocType('Ly Feedback', this.uploadParams.docname, params)
				// 	    .then(res => {
				// 	        console.log(res, '修改地址');
				// 	        // 确保 res 和 res.data 存在
				// 	        if (res && res.data && res.data.name) {
				// 	            this.$u.toast('反馈成功');
				// 	            setTimeout(() => {
				// 	                uni.navigateBack({
				// 	                    delta: 1
				// 	                });
				// 	            }, 1500);
				// 	        } else {
				// 	            this.$u.toast('反馈失败，请稍后重试');
				// 	        }
				// 	    })
				// 	    .catch(err => {
				// 	        // 捕获并处理错误
				// 	        console.error('请求失败:', err);
				// 	        if (err && err.response && err.response.data && err.response.data.message) {
				// 	            this.$u.toast(`更新失败：${err.response.data.message}`);
				// 	        } else {
				// 	            this.$u.toast('更新过程中发生错误，请稍后重试');
				// 	        }
				// 	    });
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	padding-bottom: 200rpx;
	.feedback-box {
		padding: 20rpx;
		background-color: #fff;
		.feedback-text {
			color: #777B7A;
			margin-top: 20rpx;
		}
	}
	.photo {
		padding: 20rpx;
		background-color: #fff;
		margin-top: 20rpx;
	}
	.email {
		color: #A1A2A4;
		padding: 20rpx;
	}
	.phone-box {
		padding: 20rpx;
		background-color: #fff;
	}
	.order-footer-bottom {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 24rpx;
		margin-top: 30rpx;
		.order-button {
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
	}
}
</style>
