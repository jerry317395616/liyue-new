<template>
  <view class="upload-container">
    <view class="image-list">
      <!-- 已上传图片的展示 -->
      <view v-for="(image, index) in images" :key="index" class="image-item">
        <image :src="imgBase + image.file_url" mode="aspectFill" @click="previewImage(index)" />
        <u-icon
          name="close"
          size="40"
          color="#000"
          class="delete-icon-self"
          @click.stop="removeImage(index)"
        />
      </view>
      <!-- 上传按钮 -->
      <view v-if="images.length < uploadParams.limit" class="upload-button" @click="chooseImage">
        <view style="width: 30rpx;height: 30rpx;margin-bottom: 10rpx;">+</view>
        <view>选择图片</view>
      </view>
    </view>
  </view>
</template>

<script>
import config from "@/config/config.js";
export default {
  name: 'liyueUpload',
  props: {
    uploadParams: {
      type: Object,
      default: () => ({
        limit: 4, // 设置默认图片上传限制
        is_private: 0,
        doctype: '',
        fieldname: '',
		docname: '',
        optimize: true,
      })
    }
  },
  data() {
    return {
	  imgBase: config.img + '/',
      images: [] // 存储已上传的图片
    };
  },
  methods: {
    // 选择图片
    chooseImage() {
      uni.chooseImage({
        count: this.uploadParams.limit - this.images.length, // 限制选择的图片数量
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          tempFilePaths.forEach((filePath) => {
            this.uploadImage(filePath);
          });
        }
      });
    },
    
    uploadImage(filePath) {
      let token = uni.getStorageSync("token");
      let user_id = uni.getStorageSync("user_id");
	  console.log(this.uploadParams, 'this.uploadParams')
      uni.uploadFile({
        url: config.baseUrl + 'method/upload_file', // 上传接口
        filePath: filePath, // 文件路径
        name: 'file', // 表单字段名
        formData: {
          ...this.uploadParams
        },
        header: {
          "Authorization": config.authorization,
          "token": token ? token : "",
          "user_id": user_id ? user_id : "",
          "Client-Type": "WECHAT",
          'Content-Type': 'multipart/form-data', // 通常文件上传时的 Content-Type
        },
        success: (uploadFileRes) => {
          const fileRes = JSON.parse(uploadFileRes.data);
          console.log('上传成功', uploadFileRes);
          console.log(JSON.parse(uploadFileRes.data), 'uploadFileRes.data.message.file_url');
          // 可以将返回的 URL 加入到 images 数组中，显示预览
          this.images.push({
			file_url: fileRes.message.file_url,
			name: fileRes.message.name
		  });
		  this.$emit('success', this.images)
        },
        fail: (err) => {
          console.log('上传失败', err);
          uni.showToast({
            title: '上传失败',
            icon: 'none',
          });
        }
      });
    },
    previewImage(index) {
      uni.previewImage({
        urls: this.images,
        current: this.images[index]
      });
    },
    removeImage(index) {
      this.images.splice(index, 1);
	  this.$emit('success', this.images)
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-container {
  padding: 20rpx;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  position: relative;
  width: 150rpx;
  height: 150rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  // overflow: hidden;
}

.delete-icon-self {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
}

.upload-button {
  width: 150rpx;
  height: 150rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f0f0f0;
  border-radius: 10rpx;
  color: #999;
}
</style>
