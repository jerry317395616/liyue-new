import Vue from 'vue';
import config from '@/config/config.js';
import { wechatLogin, getUserInfo1 } from "@/request/api/liYueApi.js";

let liyue = {
	splicingParmas: function(url, params) {
		let str = url.endsWith("?") ? url.substring(0, url.length - 1) : url
		Object.keys(params).forEach((key, index) => {
			str += (index === 0 ? "?" : "&") + key + "=" + params[key]
		})
		return str
	},
	goHome: function(params) {
		let path = '/pages/index/index';
		if (params) {
			path = this.splicingParmas(path, params)
		}
		uni.reLaunch({
			url: path
		});
	},
	modal: function(title, content, callback){
		uni.showModal({
			title: title,
			content: content,
			success: (res) => {
				if (res.confirm) {
					callback()
				}
			}
		});
	},
	loading: function(title){
		uni.showLoading({
			title: title
		})
	},
	tip: function(title){
		uni.showToast({
			title: title,
			icon: "none",
			duration: 1500
		})
	},
	webview: function(params) {
		console.log(params);
		uni.navigateTo({
			url: this.splicingParmas("/pages/web-view/web-view", params)
		})
	},
	login: function(type) {
	  uni.showModal({
	    title: '登录/注册',
	    content: '是否同意登录/注册',
	    success: (res) => {
	      if (res.confirm) {
	        this.loading("登录中...");
	        uni.login({
	          provider: "weixin",
	          success: (response) => {
				  console.log(response, 'response')
	            // 存储微信授权码
	            uni.setStorageSync('wechat_access_code', response.code);
	            // 调用自己的登录接口
	            wechatLogin({
	              code: response.code
	            }).then(res => {
	              console.log(res, 'res');
				  if (res.message.openid && res.message.session_key) {
					  uni.setStorageSync("openId", res.message.openid);
					  uni.setStorageSync("wechat_access_code", res.message.session_key);
				  }
	              // 判断登录是否成功
	              if (res && res.message && res.message.token != "") {
	                uni.setStorageSync("openId", res.message.openid);
	                uni.setStorageSync("token", res.message.token);
	                uni.setStorageSync("user_id", res.message.user_id);
	                uni.setStorageSync("wechat_access_code", res.message.session_key);
	
	                // 登录成功后，执行后续逻辑
	                this.deceased_person_name(type);
	              } else {
	                // 登录不成功，跳转到授权页面
	                uni.navigateTo({
	                  url: "/sub-pages-other/authorize/index"
	                });
	              }
	            }).catch(err => {
	              // 登录接口报错，显示提示信息
	              uni.showToast({
	                title: "请进入微信小程序",
	                icon: "none"
	              });
	            }).finally(() => {
	              // 无论成功或失败，关闭加载动画
	              uni.hideLoading();
	            });
	          },
	          fail: (err) => {
	            // 微信登录失败，关闭加载动画并提示错误
	            uni.hideLoading();
	            uni.showToast({
	              title: err,
	              icon: "none"
	            });
	          }
	        });
	      } else if (res.cancel) {
	        console.log('用户点击取消');
	      }
	    }
	  });
	},

	deceased_person_name: function(type, callback) {
		const user_id = uni.getStorageSync('user_id')
		const params = {
			doctype: 'Ly User',
			filters: JSON.stringify([["Ly User","name","=",user_id]]),
			fields: JSON.stringify(["*"])
		}
		getUserInfo1(params).then(res => {
			console.log(res, 'userinfo')
			const result = res.message.values.map(valueArray => {
			  const obj = {};
			  res.message.keys.forEach((key, index) => {
			    obj[key] = valueArray[index];
			  });
			  return obj;
			});
			uni.setStorageSync('user', result[0])
			if(type === "system"){
				if(callback){
					callback()
				}
			}
			setTimeout(() => {
				uni.hideLoading();
			}, 1000)
		})
	},
	generateRandomString: function() {
		const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		for (let i = 0; i < 10; i++) {
			const randomIndex = Math.floor(Math.random() * chars.length);
			result += chars[randomIndex];
		}
		return result;
	},
}

Vue.prototype.$liyue = liyue;

setTimeout(() => {
    console.log("项目全局挂载：", Vue.prototype.liyue)
}, 500)