<template>
  <div class="rate">
    <span v-for="n in maxRating" :key="n" class="rate-item" @click="setRating(n)">
      <image :src="n <= rating ? fullIcon : emptyIcon" class="rate-icon"></image>
    </span>
  </div>
</template>

<script>
export default {
  name: 'liyue-rate',
  props: {
    maxRating: {
      type: Number,
      default: 5
    },
    initialRating: {
      type: Number,
      default: 0
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
	  fullIcon: require('@/static/images/material-item27.png'),
	  emptyIcon: require('@/static/images/material-item28.png'),
      rating: this.initialRating // 初始化评分值
    };
  },
  methods: {
    setRating(value) {
      if (!this.readonly) {
        this.rating = value;
        this.$emit('update-rating', value);
      }
    }
  },
  watch: {
    initialRating(newValue) {
      this.rating = newValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.rate {
  display: flex;
  align-items: center;

  .rate-item {
    margin-right: 5px;

    .rate-icon {
      width: 14px;
      height: 18px;
    }
    &.readonly {
      pointer-events: none;
    }
  }
}
</style>
