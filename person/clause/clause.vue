<template>
	<view class="page">
		<view class="" v-html="clause">
			
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo1
	} from "@/request/api/liYueApi.js";
	export default {
		data() {
			return {
				clause: ''
			};
		},
		onLoad() {
			this.getClauseFn()
		},
		methods: {
			getClauseFn() {
				const user = uni.getStorageSync('user')
				const params = {
					doctype: 'Ly Clause',
					fields: JSON.stringify(["*"]),
					filters: JSON.stringify([]),
					view: "List"
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
					console.log(result, 'result')
					this.clause = result[0].ly_clause
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.page {
	padding: 20rpx;
	background-color: #fff;
}
</style>
